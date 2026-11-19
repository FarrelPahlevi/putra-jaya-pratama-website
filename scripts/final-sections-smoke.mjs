import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
const require = createRequire('C:/Projects/PJP-Website-tools/package.json')
const { chromium } = require('playwright')
const { default: AxeBuilder } = require('@axe-core/playwright')
const sharp = require('sharp')
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const checks = []
const check = async (name, action) => {
  try { const details = await action(); checks.push({ name, pass: true, details }) }
  catch (error) { checks.push({ name, pass: false, error: error.message }) }
}
try {
  for (const width of [1440, 1920]) await check(`filmstrip ${width}: layout, actual images and Barlow`, async () => {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto('http://localhost:5173/prototype-final.html?concept=filmstrip', { waitUntil: 'networkidle' })
    await page.waitForFunction(() => document.querySelector('.final-prototype')?.dataset.concept === 'filmstrip')
    const initial = await page.locator('.fp-gallery img').evaluateAll(imgs => imgs.map(img => ({ loaded: img.complete && img.naturalWidth > 0, src: img.currentSrc })))
    for (const photo of await page.locator('.fp-photo').all()) await photo.scrollIntoViewIfNeeded()
    await page.waitForFunction(() => [...document.querySelectorAll('.fp-gallery img')].every(img => img.complete && img.naturalWidth > 0))
    const final = await page.locator('.fp-gallery img').evaluateAll(imgs => imgs.map(img => ({ loaded: img.complete && img.naturalWidth > 0, width: img.clientWidth, height: img.clientHeight })))
    assert(final.every(image => image.loaded && image.width > 0 && image.height > 0))
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
    assert((await page.locator('h1').evaluate(el => getComputedStyle(el).fontFamily)).includes('Barlow'))
    await context.close()
    return { initial, final, note: 'Off-screen native lazy images are checked after scrolling them into view.' }
  })
  await check('Built prototype: SSR hydration and enquiry', async () => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', e => errors.push(e.message))
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
    await page.goto('http://localhost:4173/prototype-final.html', { waitUntil: 'networkidle' })
    await page.locator('.fp-action').click()
    assert(await page.locator('.inquiry-dialog[open]').isVisible())
    await page.keyboard.press('Escape')
    assert.deepEqual(errors, [])
    await context.close()
    return { errors }
  })
  await check('Built prototype: content remains readable with JavaScript disabled', async () => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto('http://localhost:4173/prototype-final.html', { waitUntil: 'networkidle' })
    assert(await page.locator('h1').isVisible())
    assert(await page.locator('#fp-consult-title').isVisible())
    assert.equal(await page.locator('.fp-consult noscript a').getAttribute('href'), 'https://wa.me/6281313884080')
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
    await page.screenshot({ path: 'docs/redesign-final-sections/screenshots/no-javascript-390.jpg', fullPage: true })
    await context.close()
  })
  await check('Static review bundle: approved comparison and gallery navigation', async () => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto('http://localhost:4173/prototype-final.html', { waitUntil: 'networkidle' })
    await page.locator('.fp-gallery-end a').click()
    await page.waitForURL('**/galeri-proyek')
    assert.equal(await page.locator('.project-gallery-page').count() || await page.locator('h1').filter({ hasText: 'Galeri' }).count(), 1)
    await page.goto('http://localhost:4173/prototype-final.html', { waitUntil: 'networkidle' })
    await page.getByRole('link', { name: 'Versi saat ini' }).click()
    await page.waitForURL(url => url.pathname === '/' && url.hash === '#proyek')
    assert.equal(await page.locator('#proyek a[href="/galeri-proyek"]').count(), 1)
    await context.close()
  })
  await check('Final visual refinement: 15 responsive compositions and AA contrast', async () => {
    const views = []
    for (const width of [390, 768, 1024, 1440, 1920]) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
      const page = await context.newPage()
      for (const concept of ['editorial', 'portfolio', 'filmstrip']) {
        await page.goto(`http://localhost:5173/prototype-final.html?concept=${concept}`, { waitUntil: 'networkidle' })
        await page.waitForFunction(concept => document.querySelector('.final-prototype')?.dataset.concept === concept, concept)
        await page.evaluate(() => document.fonts.ready)
        if (concept === 'filmstrip') {
          for (const photo of await page.locator('.fp-photo').all()) await photo.scrollIntoViewIfNeeded()
          await page.waitForFunction(() => [...document.querySelectorAll('.fp-gallery img')].every(img => img.complete && img.naturalWidth > 0))
          await page.locator('.fp-filmstrip').evaluate(el => { el.scrollLeft = 0 })
        }
        await page.evaluate(() => scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
        assert.equal(await page.locator('h1').innerText(), 'Pengaspalan.\nDari dekat.')
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
        await page.screenshot({ path: `docs/redesign-final-sections/screenshots/${concept}-${width}.jpg`, fullPage: true })
        if (concept === 'editorial' && [390, 1440].includes(width)) {
          const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
          assert.deepEqual(axe.violations.map(v => v.id), [])
        }
        views.push({ width, concept, pass: true, images: await page.locator('.fp-gallery img').evaluateAll(imgs => imgs.map(img => ({ src: img.currentSrc, loaded: img.complete && img.naturalWidth > 0 }))) })
      }
      await context.close()
    }
    await fs.writeFile('docs/redesign-final-sections/final-visual-report.json', JSON.stringify(views, null, 2))
    for (const width of [390, 1440]) {
      const w = width === 1440 ? 720 : 390
      const before = await sharp(`docs/redesign-final-sections/screenshots/approved-${width}.jpg`).resize({ width: w }).toBuffer()
      const after = await sharp(`docs/redesign-final-sections/screenshots/editorial-${width}.jpg`).resize({ width: w }).toBuffer()
      const a = await sharp(before).metadata(), b = await sharp(after).metadata()
      const label = Buffer.from(`<svg width="${w * 2 + 16}" height="36"><rect width="100%" height="36" fill="#ddd"/><text x="12" y="24" font-size="18">APPROVED HOMEPAGE</text><text x="${w + 28}" y="24" font-size="18">EDITORIAL PROTOTYPE</text></svg>`)
      await sharp({ create: { width: w * 2 + 16, height: Math.max(a.height, b.height) + 36, channels: 3, background: '#ddd' } })
        .composite([{ input: before, left: 0, top: 36 }, { input: after, left: w + 16, top: 36 }, { input: label, left: 0, top: 0 }])
        .jpeg({ quality: 88 }).toFile(`docs/redesign-final-sections/screenshots/comparison-${width}.jpg`)
    }
    return { compositions: views.length }
  })
} finally {
  await browser.close()
  await fs.writeFile('docs/redesign-final-sections/smoke-report.json', JSON.stringify(checks, null, 2))
}
const main = JSON.parse(await fs.readFile('docs/redesign-final-sections/qa-report.json', 'utf8'))
const summary = main.checks.map(original => {
  const recheck = checks.find(check => check.name === original.name)
  return recheck ? { ...recheck, recheckedAfter: original.error } : original
})
summary.push(...checks.filter(check => !main.checks.some(original => original.name === check.name)))
await fs.writeFile('docs/redesign-final-sections/qa-summary.json', JSON.stringify(summary, null, 2))
console.log(JSON.stringify({ passed: summary.filter(c => c.pass).length, failures: summary.filter(c => !c.pass), rechecks: checks }, null, 2))
assert(summary.every(check => check.pass), 'Unresolved QA failures')
