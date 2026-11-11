import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const { chromium } = require('playwright')
const { default: AxeBuilder } = require('@axe-core/playwright')
const before = process.argv.includes('--before')
const output = path.resolve(process.env.PJP_QA_OUTPUT || 'docs/ui-ux-20261111', before ? 'before' : 'after')
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const baseURL = process.env.PJP_QA_URL || 'http://127.0.0.1:5173'
const checks = []
const check = async (name, test) => {
  try { await test(); checks.push({ name, pass: true }); console.log(`PASS ${name}`) }
  catch (error) { checks.push({ name, pass: false, error: error.message }); console.log(`FAIL ${name}: ${error.message}`) }
}

try {
  for (const width of [320,390,768,1440]) {
    const context = await browser.newContext({ viewport: { width, height: width === 768 ? 1024 : 900 }, reducedMotion: 'reduce', permissions: ['clipboard-read','clipboard-write'] })
    const page = await context.newPage()
    await page.goto(baseURL, { waitUntil: 'networkidle' })
    await page.locator('#kontak button').click()
    const dialog = page.getByRole('dialog')
    await check(`form ${width}: initial focus inside dialog`, async () => {
      assert(await dialog.evaluate(element => element.contains(document.activeElement)))
    })
    await check(`form ${width}: labels programmatically associated`, async () => {
      for (const field of await dialog.locator('input, select, textarea').all()) assert(await field.evaluate(element => element.labels?.length > 0))
    })
    await check(`form ${width}: keyboard focus stays inside`, async () => {
      for (let i = 0; i < 12; i++) {
        await page.keyboard.press('Tab')
        assert(await dialog.evaluate(element => element.contains(document.activeElement)))
      }
    })
    await check(`form ${width}: no accessibility violations`, async () => {
      const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
      assert.deepEqual(result.violations.map(item => item.id), [])
    })
    await page.screenshot({ path: path.join(output, `form-${width}.png`) })
    await page.keyboard.press('Escape')
    await check(`form ${width}: Escape restores trigger focus`, async () => {
      assert.equal(await dialog.isVisible(), false)
      assert(await page.locator('#kontak button').evaluate(element => element === document.activeElement))
    })
    await context.close()
  }
  if (!before) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce', hasTouch: true, permissions: ['clipboard-read','clipboard-write'] })
    const page = await context.newPage()
    await page.goto(baseURL, { waitUntil: 'networkidle' })
    await check('skip link receives first focus and reaches main', async () => {
      await page.keyboard.press('Tab')
      assert(await page.locator('.minimal-skip').evaluate(element => element === document.activeElement))
      await page.keyboard.press('Enter')
      assert(await page.locator('main').evaluate(element => element === document.activeElement))
    })
    await check('mobile menu: tap, scroll lock, current state, focus trap and Escape', async () => {
      const toggle = page.locator('.minimal-mobile-toggle')
      await toggle.tap()
      assert.equal(await toggle.getAttribute('aria-expanded'), 'true')
      assert.equal(await page.locator('body').evaluate(element => element.style.overflow), 'hidden')
      assert.equal(await page.locator('main').evaluate(element => element.inert), true)
      assert.equal(await page.locator('.minimal-mobile-menu [aria-current="location"]').count(), 1)
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Tab')
        assert(await page.locator('header').evaluate(element => element.contains(document.activeElement)))
      }
      await page.keyboard.press('Escape')
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false')
      assert(await toggle.evaluate(element => element === document.activeElement))
    })
    await check('mobile section navigation closes menu and focuses destination', async () => {
      for (const id of ['layanan','tentang','kontak','beranda']) {
        await page.getByRole('button', { name: 'Buka menu' }).tap()
        await page.locator(`.minimal-mobile-menu a[href="#${id}"]`).tap()
        assert.equal(await page.locator('.minimal-mobile-menu').count(), 0)
        assert.equal(await page.locator('main').evaluate(element => element.inert), false)
        assert.equal(new URL(page.url()).hash, `#${id}`)
        assert(await page.locator(`#${id}`).evaluate(element => element === document.activeElement))
      }
    })
    await check('mobile menu closes on desktop resize and restores scrolling', async () => {
      await page.getByRole('button', { name: 'Buka menu' }).tap()
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.waitForFunction(() => !document.querySelector('.minimal-mobile-menu'))
      assert.equal(await page.locator('main').evaluate(element => element.inert), false)
      assert.notEqual(await page.locator('body').evaluate(element => element.style.overflow), 'hidden')
      await page.setViewportSize({ width: 390, height: 844 })
    })
    await check('all home consultation triggers open and cancel the form', async () => {
      for (const selector of ['.minimal-hero__buttons button','.minimal-text-button','#kontak button','.minimal-footer__links button']) {
        await page.locator(selector).click()
        await page.getByRole('button', { name: 'Batal', exact: true }).click()
        assert.equal(await page.getByRole('dialog').isVisible(), false)
      }
      await page.getByRole('button', { name: 'Buka menu' }).tap()
      await page.locator('.minimal-mobile-menu button').tap()
      await page.getByRole('button', { name: 'Tutup formulir' }).click()
    })
    await check('form: validation, clipboard success, retry and retained values', async () => {
      await page.locator('#kontak button').click()
      await page.getByRole('button', { name: 'Buat dan salin ringkasan' }).click()
      const details = page.getByLabel('Rencana pekerjaan')
      assert.equal(await details.getAttribute('aria-invalid'), 'true')
      assert(await details.evaluate(element => element === document.activeElement))
      await page.getByLabel('Nama atau penanggung jawab').fill('Audit PJP')
      await page.getByLabel('Jenis pekerjaan').selectOption('Paving block')
      await page.getByLabel('Lokasi pekerjaan').fill('Jakarta')
      await details.fill('Pemasangan paving untuk area parkir dan akses kendaraan.')
      await page.getByRole('button', { name: 'Buat dan salin ringkasan' }).click()
      await page.getByRole('button', { name: 'Salin lagi' }).waitFor()
      const summary = page.getByLabel('Ringkasan untuk konsultasi')
      assert((await summary.inputValue()).includes('Layanan: Paving block'))
      assert((await page.evaluate(() => navigator.clipboard.readText())).includes('Nama: Audit PJP'))
      await page.getByRole('button', { name: 'Salin lagi' }).click()
      await page.screenshot({ path: path.join(output, 'form-390-success.png') })
      const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
      assert.deepEqual(result.violations.map(item => item.id), [])
      await page.keyboard.press('Escape')
      await page.locator('#kontak button').click()
      assert.equal(await page.getByLabel('Nama atau penanggung jawab').inputValue(), 'Audit PJP')
      await page.keyboard.press('Escape')
    })
    await check('form: denied clipboard offers selectable manual copy', async () => {
      await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error('Permission denied') } })
      await page.locator('#kontak button').click()
      await page.getByRole('button', { name: 'Buat dan salin ringkasan' }).click()
      await page.getByText('Penyalinan otomatis belum berhasil', { exact: false }).waitFor()
      assert(await page.getByLabel('Ringkasan untuk konsultasi').evaluate(element => element.selectionEnd > 0))
      await page.mouse.click(2, 2)
      assert.equal(await page.getByRole('dialog').isVisible(), false)
    })
    await check('gallery link navigates to its own page', async () => {
      await page.locator('.minimal-gallery-teaser__link').click()
      await page.waitForURL('**/galeri-proyek')
      assert.equal(await page.title(), 'Galeri Proyek | Putra Jaya Pratama')
    })
    await check('gallery filter selection announces count', async () => {
      await page.getByRole('button', { name: 'Pengaspalan hotmix', exact: true }).click()
      assert.equal(await page.getByRole('button', { name: 'Pengaspalan hotmix', exact: true }).getAttribute('aria-pressed'), 'true')
      assert.equal(await page.locator('.project-filter-status').textContent(), '4 foto ditampilkan')
      await page.getByRole('button', { name: 'Semua foto', exact: true }).click()
    })
    await check('lightbox: every photo, arrows, keyboard, Escape and focus restore', async () => {
      const photos = page.locator('.project-photo__button')
      for (let i = 0; i < await photos.count(); i++) {
        await photos.nth(i).click()
        assert.equal(await page.locator('.project-lightbox__photo img').getAttribute('src'), await photos.nth(i).locator('img').getAttribute('src'))
        await page.getByRole('button', { name: 'Foto berikutnya' }).click()
        await page.getByRole('button', { name: 'Foto sebelumnya' }).click()
        await page.keyboard.press('ArrowRight')
        await page.keyboard.press('ArrowLeft')
        await page.keyboard.press('Escape')
        assert(await photos.nth(i).evaluate(element => element === document.activeElement))
      }
    })
    await check('lightbox: touch swipe advances, vertical gesture leaves photo unchanged', async () => {
      await page.locator('.project-photo__button').first().tap()
      const photo = page.locator('.project-lightbox__photo')
      const src = await photo.locator('img').getAttribute('src')
      const cdp = await context.newCDPSession(page)
      const box = await photo.boundingBox()
      const x = box.x + box.width * .8, y = box.y + box.height / 2
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - 120, y }] })
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
      assert.notEqual(await photo.locator('img').getAttribute('src'), src)
      const after = await photo.locator('img').getAttribute('src')
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - 70, y: y + 150 }] })
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
      assert.equal(await photo.locator('img').getAttribute('src'), after)
      await page.screenshot({ path: path.join(output, 'lightbox-390.png') })
      const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
      assert.deepEqual(result.violations.map(item => item.id), [])
      await page.getByRole('button', { name: 'Tutup foto' }).click()
    })
    await check('gallery consultation and footer consultation work', async () => {
      for (const selector of ['.project-bottom-cta button','.minimal-footer__links button']) {
        await page.locator(selector).click()
        await page.keyboard.press('Escape')
      }
    })
    await check('every internal navigation link has an existing destination', async () => {
      for (const route of ['/', '/galeri-proyek']) {
        await page.goto(baseURL + route, { waitUntil: 'networkidle' })
        const links = await page.locator('a[href]').evaluateAll(elements => elements.map(element => element.getAttribute('href')))
        for (const href of new Set(links)) {
          const url = new URL(href, baseURL + route)
          const target = await context.newPage()
          await target.goto(url.href, { waitUntil: 'domcontentloaded' })
          if (url.hash) assert.equal(await target.locator(`[id="${url.hash.slice(1)}"]`).count(), 1, href)
          assert.equal(await target.locator('h1').count(), 1)
          await target.close()
        }
      }
    })
    await check('short landscape: menu, form and lightbox stay scrollable', async () => {
      await page.setViewportSize({ width: 844, height: 390 })
      await page.goto(baseURL, { waitUntil: 'networkidle' })
      await page.getByRole('button', { name: 'Buka menu' }).click()
      const menu = page.locator('.minimal-mobile-menu')
      assert(await menu.evaluate(element => element.scrollHeight >= element.clientHeight))
      await page.locator('.minimal-mobile-menu button').click()
      const modal = page.getByRole('dialog')
      const box = await modal.boundingBox()
      assert(box.y >= 0 && box.y + box.height <= 391)
      await page.getByRole('button', { name: 'Batal', exact: true }).click()
      await page.goto(baseURL + '/galeri-proyek')
      await page.locator('.project-photo__button').first().click()
      await page.getByRole('button', { name: 'Foto berikutnya' }).click()
      await page.getByRole('button', { name: 'Tutup foto' }).click()
    })
    await check('200% text scaling keeps copy and controls within viewport', async () => {
      for (const route of ['/', '/galeri-proyek']) {
        await page.goto(baseURL + route, { waitUntil: 'networkidle' })
        await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
        assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
        assert(await page.locator('h1').evaluate(element => element.scrollWidth <= element.clientWidth))
      }
    })
    await check('normal motion: keyboard focus rings remain visible below fixed header', async () => {
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await page.setViewportSize({ width: 1440, height: 900 })
      for (const route of ['/', '/galeri-proyek']) {
        await page.goto(baseURL + route, { waitUntil: 'networkidle' })
        const count = await page.locator('a[href],button').evaluateAll(elements => elements.filter(element => element.getClientRects().length && !element.closest('dialog')).length)
        for (let i = 0; i < count; i++) {
          await page.keyboard.press('Tab')
          await page.waitForFunction(() => {
            const element = document.activeElement
            if (!element || element === document.body) return false
            const r = element.getBoundingClientRect()
            const header = document.querySelector('header').getBoundingClientRect()
            return r.top >= (element.closest('header') || element.matches('.minimal-skip') ? 0 : header.bottom) && r.bottom <= innerHeight + 1
          }, undefined, { timeout: 5000 })
          assert(await page.evaluate(() => {
            const style = getComputedStyle(document.activeElement)
            return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2
          }))
        }
      }
    })
    await check('reduced motion: hero and hover transforms stay at rest', async () => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(baseURL, { waitUntil: 'networkidle' })
      await page.locator('.minimal-button--primary').first().hover()
      assert.equal(await page.locator('.minimal-hero__content').evaluate(element => getComputedStyle(element).animationName), 'none')
      assert.equal(await page.locator('.minimal-button--primary').first().evaluate(element => getComputedStyle(element).transform), 'none')
    })
    await context.close()
  }
} finally {
  await fs.writeFile(path.join(output, 'interactions.json'), JSON.stringify(checks, null, 2))
  await browser.close()
}
console.log(`${checks.filter(check => check.pass).length}/${checks.length} checks passed`)
if (!before && checks.some(check => !check.pass)) process.exitCode = 1
