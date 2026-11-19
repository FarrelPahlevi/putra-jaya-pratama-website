import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const { chromium } = require('playwright')
const { default: AxeBuilder } = require('@axe-core/playwright')
const before = process.argv.includes('--before')
const baseURL = process.env.PJP_QA_URL || 'http://localhost:5173'
const output = path.resolve('docs/footer-compact-20261118', before ? 'before' : 'after')
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const report = { baseURL, engine: browser.version(), views: [], checks: [], errors: [] }
const instagramURL = 'https://www.instagram.com/jasa_aspalhotmix_official/'
const services = ['Pengaspalan hotmix', 'Paving block', 'Cut and fill', 'Cor beton', 'Saluran U-Ditch', 'Resapan air']
async function check(name, action) {
  try { await action(); report.checks.push({ name, pass: true }) }
  catch (error) { report.checks.push({ name, pass: false, error: error.message }); console.error(name, error.message) }
}

try {
  for (const width of [390, 768, 1024, 1440]) {
    for (const [name, route] of [['home', '/'], ['gallery', '/galeri-proyek']]) {
      const label = `${name} ${width}`
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
      const page = await context.newPage()
      page.on('pageerror', error => report.errors.push({ label, message: error.message }))
      page.on('console', message => { if (message.type() === 'error') report.errors.push({ label, message: message.text() }) })
      await page.goto(baseURL + route, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      const footer = page.locator('.pjp-site-footer')
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
      await page.waitForTimeout(100)
      const metrics = await footer.evaluate(el => {
        const rect = el.getBoundingClientRect()
        const grid = getComputedStyle(el.querySelector('.pjp-site-footer__information'))
        return { height: rect.height, columns: grid.gridTemplateColumns.split(' ').length,
          overflow: document.documentElement.scrollWidth > innerWidth,
          controls: [...el.querySelectorAll('a,button')].map(control => {
            const box = control.getBoundingClientRect()
            return { text: control.textContent.trim(), width: box.width, height: box.height, left: box.left, right: box.right }
          }) }
      })
      report.views.push({ name, width, ...metrics })
      await page.screenshot({ path: path.join(output, `${name}-${width}-context.png`) })
      // Keep fixed navigation above the entire footer in the long mobile capture.
      await page.setViewportSize({ width, height: Math.max(900, Math.ceil(metrics.height) + 120) })
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
      await footer.screenshot({ path: path.join(output, `${name}-${width}.png`) })
      await page.setViewportSize({ width, height: 900 })
      if (before) { await context.close(); continue }

      await check(`${label}: compact responsive layout and touch targets`, async () => {
        assert.equal(metrics.overflow, false)
        assert.equal(metrics.columns, width >= 1024 ? 4 : 2)
        assert(metrics.controls.every(control => control.height >= 44 && control.width >= 44))
        assert(metrics.controls.every(control => control.left >= 0 && control.right <= width))
        assert.equal(await footer.locator('.pjp-site-footer__information > *').count(), 4)
        assert.equal(await footer.locator('.pjp-site-footer__invitation,.pjp-site-footer__signature,[data-motion]').count(), 0)
      })
      await check(`${label}: footer accessibility including contrast`, async () => {
        const result = await new AxeBuilder({ page }).include('.pjp-site-footer').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
        assert.deepEqual(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [])
      })
      await check(`${label}: floating WhatsApp does not overlap footer while scrolling`, async () => {
        const collisions = []
        for (const control of await footer.locator('a,button').all()) {
          await control.evaluate(el => {
            const box = el.getBoundingClientRect()
            const floating = document.querySelector('.pjp-floating-contact').getBoundingClientRect()
            window.scrollTo({ top: scrollY + box.top + box.height / 2 - (floating.top + floating.height / 2), behavior: 'instant' })
          })
          await page.waitForTimeout(35)
          const collision = await control.evaluate(el => {
            const a = el.getBoundingClientRect(), b = document.querySelector('.pjp-floating-contact').getBoundingClientRect()
            return a.right > b.left && a.left < b.right && a.bottom > b.top && a.top < b.bottom
          })
          if (collision) collisions.push(await control.innerText())
        }
        assert.deepEqual(collisions, [])
      })
      await check(`${label}: external contact links open correct URLs in new tabs`, async () => {
        for (const [selector, url] of [['.pjp-site-footer__number', 'https://wa.me/6281313884080'], ['.pjp-site-footer__instagram', instagramURL]]) {
          await context.route(url, r => r.fulfill({ status: 200, contentType: 'text/html', body: '<title>Contact destination check</title>' }))
          const link = footer.locator(selector)
          assert.equal(await link.getAttribute('href'), url)
          assert.equal(await link.getAttribute('target'), '_blank')
          assert.equal(await link.getAttribute('rel'), 'noopener noreferrer')
          const popupPromise = page.waitForEvent('popup')
          await link.click()
          const popup = await popupPromise
          await popup.waitForLoadState()
          assert.equal(popup.url(), url)
          await popup.close()
        }
        assert.equal(await footer.locator('.pjp-site-footer__instagram').innerText(), '@jasa_aspalhotmix_official')
      })
      await check(`${label}: six services open preselected inquiry and return focus`, async () => {
        const dialog = page.locator('.inquiry-dialog')
        for (const service of services) {
          const trigger = footer.getByRole('button', { name: service, exact: true })
          await trigger.click()
          await dialog.waitFor({ state: 'visible' })
          assert.equal(await page.locator('#inquiry-service').inputValue(), service)
          await page.locator('.pjp-floating-contact').waitFor({ state: 'hidden' })
          await page.keyboard.press('Escape')
          await dialog.waitFor({ state: 'hidden' })
          assert(await trigger.evaluate(el => el === document.activeElement))
        }
        assert.equal(await footer.getByText('Isi kebutuhan proyek', { exact: true }).count(), 0)
      })
      await check(`${label}: sequential keyboard focus and inquiry activation`, async () => {
        const controls = footer.locator('a,button')
        await controls.first().focus()
        for (let i = 0; i < await controls.count(); i++) {
          assert(await controls.nth(i).evaluate(el => el === document.activeElement), `Tab order at ${i}`)
          const ring = await controls.nth(i).evaluate(el => ({ style: getComputedStyle(el).outlineStyle, width: getComputedStyle(el).outlineWidth }))
          assert.notEqual(ring.style, 'none')
          assert(parseFloat(ring.width) >= 2)
          await page.keyboard.press('Tab')
        }
        await footer.getByRole('button', { name: services[0], exact: true }).focus()
        await page.keyboard.press('Enter')
        const dialog = page.locator('.inquiry-dialog')
        await dialog.waitFor({ state: 'visible' })
        await page.keyboard.press('Escape')
        await dialog.waitFor({ state: 'hidden' })
      })
      await check(`${label}: back-to-top keeps route and moves focus`, async () => {
        await footer.getByRole('link', { name: 'Kembali ke atas halaman' }).click()
        assert.equal(await page.evaluate(() => scrollY), 0)
        assert.equal(new URL(page.url()).pathname, route)
        assert.equal(await page.evaluate(() => document.activeElement.id), name === 'home' ? 'beranda' : 'main')
      })
      await check(`${label}: logo and all navigation destinations`, async () => {
        const destinations = [
          ['Beranda', '/#beranda'], ['Layanan', '/#layanan'], ['Galeri Proyek', '/galeri-proyek'],
          ['Tentang Kami', '/#tentang'], ['Kontak', '/#kontak'],
        ]
        for (const [text, destination] of destinations) {
          await page.goto(baseURL + route, { waitUntil: 'networkidle' })
          await footer.getByRole('navigation').getByRole('link', { name: text, exact: true }).click()
          await page.waitForURL(url => url.pathname + url.hash === destination)
          await page.waitForLoadState('networkidle')
          if (destination.includes('#')) {
            const id = destination.split('#')[1]
            const box = await page.locator(`#${id}`).boundingBox()
            assert(box.y >= -1 && box.y < 160, `Destination ${id} below header`)
            if (name === 'home') assert.equal(await page.evaluate(() => document.activeElement.id), id)
          }
        }
        await page.goto(baseURL + route, { waitUntil: 'networkidle' })
        await footer.locator('.pjp-site-footer__logo').click()
        await page.waitForURL(url => url.pathname + url.hash === '/#beranda')
      })
      await context.close()
    }
  }
  if (!before) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
    await page.goto(baseURL, { waitUntil: 'networkidle' })
    const instagram = page.locator('.pjp-site-footer__instagram')
    await check('Motion: Instagram hover feedback and smooth back-to-top', async () => {
      await instagram.scrollIntoViewIfNeeded()
      const initial = await instagram.evaluate(el => getComputedStyle(el).color)
      await instagram.hover()
      await page.waitForTimeout(250)
      assert.notEqual(await instagram.evaluate(el => getComputedStyle(el).color), initial)
      assert.equal(await instagram.evaluate(el => getComputedStyle(el).textDecorationLine), 'underline')
      await page.screenshot({ path: path.join(output, 'instagram-hover.png') })
      await page.locator('.pjp-site-footer__top').click()
      await page.waitForFunction(() => scrollY === 0)
    })
    await check('Motion: reduced motion preserves static, visible footer', async () => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.locator('footer').scrollIntoViewIfNeeded()
      assert.equal(await instagram.evaluate(el => getComputedStyle(el).transitionDuration), '0s')
      assert.equal(await page.locator('footer').evaluate(el => el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length), 0)
    })
    await check('Fallback: footer without IntersectionObserver stays collision-safe', async () => {
      await page.addInitScript(() => { delete window.IntersectionObserver })
      await page.reload({ waitUntil: 'networkidle' })
      await page.locator('footer').scrollIntoViewIfNeeded()
      assert.equal(await page.locator('footer').getAttribute('data-in-view'), 'true')
      assert((await page.locator('.pjp-floating-contact__link').boundingBox()).width <= 52)
    })
    await page.close()
    await check('No browser console errors or uncaught exceptions', async () => assert.deepEqual(report.errors, []))
  }
} finally {
  await browser.close()
  await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2))
}
const failed = report.checks.filter(c => !c.pass)
console.log(JSON.stringify({ views: report.views.map(({ name, width, height, columns, overflow }) => ({ name, width, height, columns, overflow })), passed: report.checks.length - failed.length, failed }, null, 2))
if (failed.length) process.exitCode = 1
