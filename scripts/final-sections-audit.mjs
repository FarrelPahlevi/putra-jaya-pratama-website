import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { createRequire } from 'node:module'
const require = createRequire('C:/Projects/PJP-Website-tools/package.json')
const { chromium } = require('playwright')
const { default: AxeBuilder } = require('@axe-core/playwright')
const sharp = require('sharp')
const base = process.env.PJP_QA_URL || 'http://localhost:5173'
const out = path.resolve('docs/redesign-final-sections/screenshots')
await fs.mkdir(out, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const report = { browser: browser.version(), checks: [], views: [], errors: [], requests: [] }
const check = async (name, run) => {
  try { await run(); report.checks.push({ name, pass: true }) }
  catch (error) { report.checks.push({ name, pass: false, error: error.message }); console.error('FAIL', name, error.message.slice(0, 300)) }
}
const prototype = '/prototype-final.html'
try {
  for (const width of [390, 768, 1024, 1440, 1920]) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    page.on('pageerror', error => report.errors.push({ width, message: error.message }))
    page.on('console', message => { if (message.type() === 'error') report.errors.push({ width, message: message.text() }) })
    page.on('request', request => { if (request.url().includes('/project-gallery/')) report.requests.push({ width, url: request.url() }) })
    for (const concept of ['editorial', 'portfolio', 'filmstrip']) {
      const label = `${concept} ${width}`
      await page.goto(base + prototype + '?concept=' + concept, { waitUntil: 'networkidle' })
      await page.waitForFunction(concept => document.querySelector('.final-prototype')?.dataset.concept === concept, concept)
      await page.evaluate(() => document.fonts.ready)
      if (concept === 'filmstrip') {
        for (const photo of await page.locator('.fp-photo').all()) await photo.scrollIntoViewIfNeeded()
        await page.waitForFunction(() => [...document.querySelectorAll('.fp-gallery img')].every(img => img.complete && img.naturalWidth > 0))
        await page.locator('.fp-filmstrip').evaluate(el => { el.scrollLeft = 0 })
      }
      await page.evaluate(() => scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
      await page.waitForTimeout(100)
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
      const view = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth,
        images: [...document.querySelectorAll('.fp-gallery img')].map(el => ({ loaded: el.complete && el.naturalWidth > 0, src: el.currentSrc, width: el.clientWidth, height: el.clientHeight })),
        footerHeight: document.querySelector('footer').getBoundingClientRect().height,
        heading: getComputedStyle(document.querySelector('h1')).fontFamily,
      }))
      report.views.push({ width, concept, ...view })
      await page.screenshot({ path: path.join(out, `${concept}-${width}.jpg`), fullPage: true })
      await check(label + ': layout, actual images and Barlow', async () => {
        assert.equal(view.overflow, false)
        assert(view.images.every(image => image.loaded && image.width > 0 && image.height > 0))
        assert(view.images.length <= 4)
        assert(view.heading.includes('Barlow'))
        assert.equal(await page.locator('.fp-action').count(), 1)
      })
      await check(label + ': accessible names and contrast', async () => {
        const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
        assert.deepEqual(result.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })), [])
      })
      await check(label + ': image dialog, arrows, Escape and focus return', async () => {
        const trigger = page.locator('.fp-photo').first()
        await trigger.focus()
        await page.keyboard.press('Enter')
        assert(await page.locator('.fp-lightbox').isVisible())
        assert.equal(await page.locator('.pjp-floating-contact').evaluate(el => getComputedStyle(el).visibility), 'hidden')
        const title = await page.locator('#fp-lightbox-title').innerText()
        await page.keyboard.press('ArrowRight')
        assert.notEqual(await page.locator('#fp-lightbox-title').innerText(), title)
        await page.keyboard.press('ArrowLeft')
        assert.equal(await page.locator('#fp-lightbox-title').innerText(), title)
        await page.keyboard.press('Escape')
        assert.equal(await page.locator('.fp-lightbox').isVisible(), false)
        assert(await trigger.evaluate(el => document.activeElement === el))
        assert.equal(await page.evaluate(() => document.body.style.overflow), '')
      })
      await check(label + ': enquiry and floating-control clearance', async () => {
        const action = page.locator('.fp-action')
        await action.click()
        assert(await page.locator('dialog.inquiry-dialog[open]').isVisible())
        await page.keyboard.press('Escape')
        assert(await action.evaluate(el => el === document.activeElement))
        const collisions = []
        for (const control of await page.locator('footer a,footer button,.fp-action').all()) {
          await control.evaluate(el => {
            const a = el.getBoundingClientRect(), b = document.querySelector('.pjp-floating-contact').getBoundingClientRect()
            scrollTo({ top: scrollY + a.top + a.height / 2 - (b.top + b.height / 2), behavior: 'instant' })
          })
          await page.waitForTimeout(20)
          if (await control.evaluate(el => {
            const a = el.getBoundingClientRect(), b = document.querySelector('.pjp-floating-contact').getBoundingClientRect()
            return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
          })) collisions.push(await control.innerText())
        }
        assert.deepEqual(collisions, [])
      })
      if (concept === 'portfolio') await check(label + ': photo selection is real and stable', async () => {
        const initial = await page.locator('.fp-photo img').getAttribute('src')
        const size = await page.locator('.fp-photo').boundingBox()
        await page.locator('.fp-selectors button').nth(2).click()
        assert.notEqual(await page.locator('.fp-photo img').getAttribute('src'), initial)
        const after = await page.locator('.fp-photo').boundingBox()
        assert.equal(after.height, size.height)
      })
      if (concept === 'filmstrip') await check(label + ': horizontal rail uses native scrolling', async () => {
        await page.getByRole('button', { name: 'Foto berikutnya di filmstrip' }).click()
        assert(await page.locator('.fp-filmstrip').evaluate(el => el.scrollLeft > 0))
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
      })
      console.log('Checked', label)
    }
    await page.goto(base + '/', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
    const clip = await page.locator('#proyek').evaluate(el => ({ x: 0, y: Math.floor(el.getBoundingClientRect().top + scrollY), width: innerWidth,
      height: Math.ceil(document.documentElement.scrollHeight - (el.getBoundingClientRect().top + scrollY)) }))
    const fullPage = await page.screenshot({ fullPage: true })
    const dimensions = await sharp(fullPage).metadata()
    await sharp(fullPage).extract({ left: clip.x, top: clip.y, width: clip.width, height: Math.min(clip.height, dimensions.height - clip.y) })
      .jpeg({ quality: 88 }).toFile(path.join(out, `approved-${width}.jpg`))
    await context.close()
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  await page.goto(base + prototype, { waitUntil: 'networkidle' })
  await check('Default motion: visible content, settled photos and hover feedback', async () => {
    await page.waitForTimeout(850)
    const photo = page.locator('.fp-photo').first()
    assert.equal(await photo.evaluate(el => getComputedStyle(el).opacity), '1')
    await photo.hover()
    await page.waitForTimeout(700)
    assert.notEqual(await photo.locator('img').evaluate(el => getComputedStyle(el).transform), 'none')
    await page.screenshot({ path: path.join(out, 'editorial-hover.jpg') })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    assert.equal(await photo.locator('img').evaluate(el => getComputedStyle(el).transform), 'none')
    assert.equal(await photo.locator('img').evaluate(el => getComputedStyle(el).transitionDuration), '0s')
  })
  await check('Keyboard: all footer controls have sequential focus and a visible ring', async () => {
    const controls = page.locator('footer a,footer button')
    await controls.first().focus()
    for (const control of await controls.all()) {
      assert(await control.evaluate(el => document.activeElement === el))
      assert(await control.evaluate(el => parseFloat(getComputedStyle(el).outlineWidth) >= 2 && getComputedStyle(el).outlineStyle !== 'none'))
      await page.keyboard.press('Tab')
    }
  })
  await check('Six services retain form preselection and back-to-top retains prototype', async () => {
    for (const trigger of await page.locator('footer .pjp-site-footer__link[type="button"]').all()) {
      await trigger.click()
      assert.equal(await page.locator('#inquiry-service').inputValue(), await trigger.innerText())
      await page.keyboard.press('Escape')
    }
    await page.locator('.pjp-site-footer__top').click()
    assert.equal(await page.evaluate(() => scrollY), 0)
    assert.equal(new URL(page.url()).pathname, prototype)
    assert.equal(await page.evaluate(() => document.activeElement.id), 'main')
  })
  await check('Contact links and routes remain real', async () => {
    assert.equal(await page.locator('footer .pjp-site-footer__number').getAttribute('href'), 'https://wa.me/6281313884080')
    const ig = page.locator('footer .pjp-site-footer__instagram')
    assert.equal(await ig.getAttribute('href'), 'https://www.instagram.com/jasa_aspalhotmix_official/')
    assert.equal(await ig.getAttribute('rel'), 'noopener noreferrer')
    assert.equal(await ig.getAttribute('target'), '_blank')
    assert.equal(await page.locator('.fp-gallery-end a').getAttribute('href'), '/galeri-proyek')
    await page.locator('.fp-header nav a[href="#kontak"]').click()
    assert.equal(new URL(page.url()).hash, '#kontak')
    await page.locator('.fp-gallery-end a').click()
    await page.waitForURL('**/galeri-proyek')
  })
  await page.close()
  await check('Approved source files unchanged against pre-prototype hashes', async () => {
    const saved = JSON.parse((await fs.readFile('docs/redesign-final-sections/approved-source-hashes.json', 'utf8')).replace(/^\uFEFF/, ''))
    for (const entry of saved) assert.equal(crypto.createHash('sha256').update(await fs.readFile(entry.file)).digest('hex').toUpperCase(), entry.hash, entry.file)
  })
  await check('Browser console and runtime errors', async () => assert.deepEqual(report.errors, []))
  for (const width of [390, 1440]) {
    const imageWidth = width === 1440 ? 720 : 390
    const before = await sharp(path.join(out, `approved-${width}.jpg`)).resize({ width: imageWidth }).toBuffer()
    const after = await sharp(path.join(out, `editorial-${width}.jpg`)).resize({ width: imageWidth }).toBuffer()
    const a = await sharp(before).metadata(), b = await sharp(after).metadata()
    const label = Buffer.from(`<svg width="${imageWidth * 2 + 16}" height="36"><rect width="100%" height="36" fill="#ddd"/><text x="12" y="24" font-size="18">APPROVED HOMEPAGE</text><text x="${imageWidth + 28}" y="24" font-size="18">EDITORIAL PROTOTYPE</text></svg>`)
    await sharp({ create: { width: imageWidth * 2 + 16, height: Math.max(a.height, b.height) + 36, channels: 3, background: '#ddd' } })
      .composite([{ input: before, left: 0, top: 36 }, { input: after, left: imageWidth + 16, top: 36 }, { input: label, left: 0, top: 0 }])
      .jpeg({ quality: 88 }).toFile(path.join(out, `comparison-${width}.jpg`))
  }
} finally {
  await browser.close()
  await fs.writeFile('docs/redesign-final-sections/qa-report.json', JSON.stringify(report, null, 2))
}
const failed = report.checks.filter(check => !check.pass)
console.log(JSON.stringify({ passed: report.checks.length - failed.length, failed, views: report.views.length }, null, 2))
if (failed.length) process.exitCode = 1
