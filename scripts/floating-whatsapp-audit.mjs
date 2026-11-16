import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const { chromium } = require('playwright')
const baseURL = process.env.PJP_QA_URL || 'http://127.0.0.1:4173'
const output = path.resolve(process.env.PJP_QA_OUTPUT || 'docs/floating-always-visible-20261113')
await fs.mkdir(output, { recursive: true })

const sizes = [[320,740],[360,800],[390,844],[430,932],[768,1024],[1024,768],[1280,800],[1440,900],[1920,1080]]
const results = []
const footerCollisions = []
const browser = await chromium.launch({ channel: 'chrome', headless: true })

const check = async (name, task) => {
  try { await task(); results.push({ name, pass: true }); console.log('PASS', name) }
  catch (error) { results.push({ name, pass: false, error: String(error) }); console.log('FAIL', name, String(error)) }
}

const inspect = page => page.locator('.pjp-floating-contact').evaluate(el => {
  const box = el.getBoundingClientRect()
  return {
    visible: getComputedStyle(el).visibility === 'visible' && el.dataset.visible === 'true',
    blocked: el.dataset.blocked === 'true',
    inert: el.inert,
    box: { left: box.left, right: box.right, top: box.top, bottom: box.bottom, width: box.width, height: box.height },
    overflow: document.documentElement.scrollWidth > innerWidth,
    footerCollisions: [...document.querySelectorAll('footer a, footer button')].filter(node => {
      const r = node.getBoundingClientRect()
      return r.width > 0 && r.height > 0 && !(r.right <= box.left || r.left >= box.right || r.bottom <= box.top || r.top >= box.bottom)
    }).map(node => node.textContent.trim().slice(0,70)),
  }
})

try {
  for (const [width, height] of sizes) {
    for (const [routeName, route] of [['home','/'],['gallery','/galeri-proyek']]) {
      const context = await browser.newContext({ viewport: { width, height }, hasTouch: width <= 430 })
      await context.route('https://wa.me/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Mock WhatsApp</title>' }))
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('response', response => { if (response.status() >= 400) errors.push(response.status() + ' ' + response.url()) })
      const label = routeName + ' ' + width
      await page.goto(baseURL + route, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      const root = page.locator('.pjp-floating-contact')
      const link = root.locator('a')
      await check(label + ': visible immediately and accessible', async () => {
        const state = await inspect(page)
        assert(state.visible, 'floating contact must be visible at first render')
        assert.equal(state.inert, false)
        assert.equal(state.overflow, false)
        assert(state.box.left >= 0 && state.box.right <= width + 1)
        assert(state.box.top >= 0 && state.box.bottom <= height + 1)
        assert(state.box.height >= 44)
        assert.equal(await link.getAttribute('href'), 'https://wa.me/6281313884080')
        assert.equal(await link.getAttribute('target'), '_blank')
        assert.match(await link.getAttribute('rel'), /noopener/)
        assert.match(await link.getAttribute('aria-label'), /WhatsApp/)
      })
      if (routeName === 'home' && [390,1440].includes(width)) {
        await page.screenshot({ path: path.join(output, 'home-'+width+'-initial.png'), fullPage: false })
      }
      await check(label + ': remains visible during scrolling and at footer', async () => {
        const maxY = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)
        for (const y of [0,200,380,800,1800,maxY]) {
          await page.evaluate(y => scrollTo({top:y,behavior:'instant'}), Math.min(y,maxY))
          await page.waitForTimeout(90)
          const state = await inspect(page)
          assert(state.visible, 'disappeared at y='+y)
          assert.equal(state.overflow, false)
          if (y === maxY && state.footerCollisions.length) footerCollisions.push({ label, collisions:state.footerCollisions })
        }
      })
      await check(label + ': dialog suppresses and restores floating contact', async () => {
        await page.getByRole('button', { name: /Isi kebutuhan proyek/i }).first().click()
        await page.locator('.inquiry-dialog[open]').waitFor({ state: 'visible' })
        await page.waitForTimeout(40)
        let state = await inspect(page)
        assert.equal(state.visible, false)
        assert.equal(state.blocked, true)
        assert.equal(state.inert, true)
        await page.getByRole('button', { name: 'Tutup formulir' }).click()
        await page.locator('.inquiry-dialog[open]').waitFor({ state: 'hidden' })
        await page.waitForTimeout(40)
        state = await inspect(page)
        assert.equal(state.visible, true)
        assert.equal(state.inert, false)
      })
      if (width <= 950) await check(label + ': mobile navigation suppresses and restores floating contact', async () => {
        await page.getByRole('button', { name: 'Buka menu' }).click()
        await page.waitForTimeout(40)
        let state = await inspect(page)
        assert.equal(state.visible, false)
        assert.equal(state.inert, true)
        await page.getByRole('button', { name: 'Tutup menu' }).click()
        await page.waitForTimeout(40)
        state = await inspect(page)
        assert.equal(state.visible, true)
      })
      if (routeName === 'gallery') await check(label + ': lightbox suppresses and restores floating contact', async () => {
        await page.locator('.project-photo__button').first().click()
        await page.locator('.project-lightbox[open]').waitFor({state:'visible'})
        await page.waitForTimeout(40)
        assert.equal((await inspect(page)).visible, false)
        await page.getByRole('button', { name: 'Tutup foto' }).click()
        await page.locator('.project-lightbox[open]').waitFor({state:'hidden'})
        await page.waitForTimeout(40)
        assert.equal((await inspect(page)).visible, true)
      })
      if ([390,1440].includes(width)) await check(label + ': opens correct WhatsApp tab via intercepted request', async () => {
        await page.evaluate(() => scrollTo({top:0,behavior:'instant'}))
        const [popup] = await Promise.all([context.waitForEvent('page'), link.click()])
        await popup.waitForLoadState('domcontentloaded')
        assert.equal(new URL(popup.url()).hostname, 'wa.me')
        assert.equal(new URL(popup.url()).pathname, '/6281313884080')
        assert.equal(await popup.title(), 'Mock WhatsApp')
        await popup.close()
      })
      await check(label + ': no browser errors', async () => assert.deepEqual(errors, []))
      await context.close()
    }
  }
  for(const route of ['/','/galeri-proyek']){
    const context = await browser.newContext({ viewport:{width:390,height:844}, javaScriptEnabled:false })
    const page=await context.newPage()
    await page.goto(baseURL+route,{waitUntil:'load'})
    await check('without JS '+route+': native WhatsApp link is visible',async()=>{
      const root=page.locator('.pjp-floating-contact')
      assert(await root.isVisible())
      assert.equal(await root.locator('a').getAttribute('href'),'https://wa.me/6281313884080')
    })
    await context.close()
  }
} finally {
  await browser.close()
}
await fs.writeFile(path.join(output,'report.json'), JSON.stringify({checks:results,footerCollisions},null,2))
console.log(JSON.stringify({passed:results.filter(r=>r.pass).length,total:results.length,footerCollisions},null,2))
if (footerCollisions.length) console.error('Footer links overlap the floating contact:', footerCollisions)
if(results.some(r=>!r.pass) || footerCollisions.length) process.exitCode=1
