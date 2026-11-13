import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const { chromium } = require('playwright')
const { default: AxeBuilder } = require('@axe-core/playwright')
const baseURL = process.env.PJP_QA_URL || 'http://127.0.0.1:4173'
const output = path.resolve(process.env.PJP_QA_OUTPUT || 'docs/visual-qa-20261113', 'edges')
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const report = { generatedAt: new Date().toISOString(), checks: [], geometry: [], zoom: [], limitations: ['Desktop Chrome emulation; physical mobile hardware is not covered. Layout zoom uses a 2x DPR and half-size CSS viewport; pinch zoom separately verifies visualViewport.scale=2.'] }
const check = async (name, action) => {
  try { await action(); report.checks.push({ name, pass: true }); console.log('PASS ' + name) }
  catch (error) { report.checks.push({ name, pass: false, error: error.message }); console.log('FAIL ' + name + ': ' + error.message.split('\n')[0]) }
}
const metrics = page => page.evaluate(() => ({
  overflow: document.documentElement.scrollWidth > innerWidth,
  hidden: [...document.querySelectorAll('main h1,main h2,main p')].filter(e => getComputedStyle(e).visibility === 'hidden' || getComputedStyle(e).opacity === '0').length,
  width: innerWidth, height: innerHeight, dpr: devicePixelRatio, visualScale: visualViewport.scale,
}))

try {
  for (const [width,height] of [[1280,800],[1440,900],[1920,1080]]) {
    await check(`deferred motion ${width}: stable story geometry and deep-link destination`, async () => {
      const context = await browser.newContext({ viewport: { width, height } })
      const page = await context.newPage()
      let release
      const pending = new Promise(resolve => { release = resolve })
      await page.route('**/assets/siteMotion-*.js', async route => { await pending; await route.continue() })
      await page.goto(baseURL + '/#proses', { waitUntil: 'domcontentloaded' })
      await page.evaluate(() => document.fonts.ready)
      // Let the browser's initial fragment scroll settle before comparing geometry.
      await page.waitForTimeout(1200)
      await page.evaluate(() => {
        document.documentElement.style.scrollBehavior = 'auto'
        document.querySelector('#proses').scrollIntoView({ behavior: 'instant' })
      })
      await page.waitForTimeout(100)
      const measure = () => page.evaluate(() => ({
        storyHeight: document.querySelector('#tentang').offsetHeight,
        processDocumentTop: document.querySelector('#proses').getBoundingClientRect().top + scrollY,
        anchorViewportTop: document.querySelector('#proses').getBoundingClientRect().top,
      }))
      const before = await measure()
      release()
      await page.waitForFunction(() => document.querySelector('.minimal-site')?.dataset.motionState === 'active')
      await page.waitForTimeout(1000)
      const after = await measure()
      report.geometry.push({ width,height,before,after })
      assert.equal(before.storyHeight, after.storyHeight)
      assert.equal(before.processDocumentTop, after.processDocumentTop)
      assert(Math.abs(before.anchorViewportTop - after.anchorViewportTop) < 2)
      await page.screenshot({ path: path.join(output, `deep-link-${width}.png`) })
      await context.close()
    })
  }

  for (const [width,height,name,dpr] of [[844,390,'landscape',1],[1280,500,'short-desktop',1],[720,450,'zoom-200-desktop',2],[512,384,'zoom-200-tablet',2]]) {
    for (const [pageName, route] of [['home','/'],['gallery','/galeri-proyek']]) {
      await check(`${name} ${pageName}: text, controls and dialogs remain usable`, async () => {
        const context = await browser.newContext({ viewport: { width,height }, deviceScaleFactor: dpr, reducedMotion: 'no-preference' })
        const page = await context.newPage()
        await page.goto(baseURL + route, { waitUntil: 'networkidle' })
        await page.evaluate(() => document.fonts.ready)
        assert.equal((await metrics(page)).overflow, false)
        assert.equal((await metrics(page)).hidden, 0)
        const sections = await page.locator('main > section').all()
        for (const section of sections) {
          await section.evaluate(e => e.scrollIntoView({ behavior: 'instant', block: 'start' }))
          await page.waitForTimeout(100)
          assert.equal((await metrics(page)).overflow, false)
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
        await page.screenshot({ path: path.join(output, `${name}-${pageName}.png`) })
        if (width <= 950) {
          await page.getByRole('button', { name: 'Buka menu' }).click()
          assert(await page.locator('.minimal-mobile-menu').isVisible())
          await page.keyboard.press('Escape')
        }
        const trigger = pageName === 'home' ? '#kontak button' : '.project-bottom-cta button'
        await page.locator(trigger).click()
        await page.getByLabel('Rencana pekerjaan (wajib)').fill('Pengaspalan area parkir dengan kondisi permukaan tidak rata.')
        await page.getByRole('button', { name: 'Buat dan salin ringkasan' }).click()
        await page.locator('#inquiry-summary').waitFor()
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
        assert.deepEqual(axe.violations.map(v => v.id), [])
        await page.screenshot({ path: path.join(output, `${name}-${pageName}-form.png`) })
        await page.keyboard.press('Escape')
        if (pageName === 'gallery') {
          await page.locator('.project-photo__button').first().click()
          await page.keyboard.press('ArrowRight')
          await page.screenshot({ path: path.join(output, `${name}-lightbox.png`) })
          await page.keyboard.press('Escape')
        }
        report.zoom.push({ name,pageName,...await metrics(page) })
        await context.close()
      })
    }
  }

  await check('visual zoom 200%: browser reports doubled visual scale and readable content', async () => {
    const context = await browser.newContext({ viewport: { width: 390,height:844 }, hasTouch: true, isMobile: true })
    const page = await context.newPage()
    await page.goto(baseURL, { waitUntil: 'networkidle' })
    const session = await context.newCDPSession(page)
    await session.send('Emulation.setPageScaleFactor', { pageScaleFactor: 2 })
    assert.equal((await metrics(page)).visualScale, 2)
    assert.equal((await metrics(page)).hidden, 0)
    await page.screenshot({ path: path.join(output, 'pinch-zoom-200.png') })
    await session.detach()
    await context.close()
  })

  await check('blocked external fonts: visible fallback text, navigation and form', async () => {
    const context = await browser.newContext({ viewport: { width:320,height:740 } })
    const page = await context.newPage()
    await page.route('https://fonts.googleapis.com/**', route => route.abort())
    await page.route('https://fonts.gstatic.com/**', route => route.abort())
    await page.goto(baseURL, { waitUntil: 'networkidle' })
    await page.waitForTimeout(900)
    assert.equal((await metrics(page)).overflow, false)
    assert.equal((await metrics(page)).hidden, 0)
    assert(await page.locator('h1').isVisible())
    await page.getByRole('button', { name: 'Buka menu' }).click()
    await page.keyboard.press('Escape')
    await page.locator('.minimal-hero__buttons button').click()
    assert(await page.locator('#inquiryTitle').isVisible())
    await page.screenshot({ path: path.join(output, 'font-failure-320.png') })
    await context.close()
  })
} finally {
  await browser.close()
  await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report,null,2))
}
console.log(`${report.checks.filter(c=>c.pass).length}/${report.checks.length} edge checks passed`)
if (report.checks.some(c=>!c.pass)) process.exitCode = 1
