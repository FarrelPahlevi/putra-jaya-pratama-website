import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const { chromium } = require('playwright')
const sharp = require('sharp')
const baseURL = process.env.PJP_QA_URL || 'http://127.0.0.1:4173'
const phase = process.argv.includes('--before') ? 'before' : 'after'
const output = path.resolve(process.env.PJP_QA_OUTPUT || 'docs/visual-qa-20261113', `typography-${phase}`)
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const report = { generatedAt: new Date().toISOString(), engine: browser.version(), phase, comparisons: [], fonts: [], controls: [], checks: [] }
const check = async (name, action) => {
  try { await action(); report.checks.push({ name, pass: true }) }
  catch (error) { report.checks.push({ name, pass: false, error: error.message }); console.log(`FAIL ${name}: ${error.message.split('\n')[0]}`) }
}

async function paintedFont(page, session, selector, expected, label) {
  const { root } = await session.send('DOM.getDocument')
  const { nodeId } = await session.send('DOM.querySelector', { nodeId: root.nodeId, selector })
  if (!nodeId || !(await page.locator(selector).first().isVisible())) return
  const { fonts } = await session.send('CSS.getPlatformFontsForNode', { nodeId })
  const sample = { label, selector, expected, fonts }
  report.fonts.push(sample)
  const postScriptPrefix = expected.replaceAll(' ', '') + '-'
  await check(`${label}: painted font ${selector}`, async () => assert(fonts.some(f => f.isCustomFont && (f.familyName === expected || f.postScriptName.startsWith(postScriptPrefix)) && f.glyphCount > 0), JSON.stringify(fonts)))
}

async function pixelLoss(page, heading, progress, stem) {
  await page.evaluate(() => {
    document.getAnimations().filter(animation => animation.timeline instanceof DocumentTimeline && animation.playState === 'running').forEach(animation => animation.pause())
  })
  if (progress !== null) await heading.evaluate((element, progress) => {
    const targets = [element, ...element.querySelectorAll('[data-hero-line]')]
    window.__qaTextAnimations.filter(a => targets.includes(a.effect?.target)).forEach(animation => {
      animation.pause()
      animation.currentTime = Number(animation.effect.getTiming().duration) * progress
    })
  }, progress)
  const rect = await heading.boundingBox()
  const viewport = page.viewportSize()
  const clip = { x: Math.max(0, Math.floor(rect.x - 20)), y: Math.max(0, Math.floor(rect.y - 20)), width: 0, height: 0 }
  clip.width = Math.min(viewport.width - clip.x, Math.ceil(rect.width + 40))
  clip.height = Math.min(viewport.height - clip.y, Math.ceil(rect.height + 40))
  const actual = await page.screenshot({ clip, animations: 'allow' })
  const properties = await heading.evaluate(element => {
    const targets = [element, ...element.querySelectorAll('[data-hero-line]')]
    window.__qaRestore = targets.map(target => ({ target, style: target.getAttribute('style') }))
    const values = targets.map(target => ({ text: target.textContent, clipPath: getComputedStyle(target).clipPath, lineHeight: getComputedStyle(target).lineHeight, size: getComputedStyle(target).fontSize }))
    targets.forEach(target => target.style.setProperty('clip-path', 'none', 'important'))
    return values
  })
  const reference = await page.screenshot({ clip, animations: 'allow' })
  await page.evaluate(() => window.__qaRestore.forEach(({ target, style }) => {
    if (style === null) target.removeAttribute('style')
    else target.setAttribute('style', style)
  }))
  const a = await sharp(actual).ensureAlpha().raw().toBuffer()
  const b = await sharp(reference).ensureAlpha().raw().toBuffer()
  assert.equal(a.length, b.length)
  let changedPixels = 0
  for (let i = 0; i < a.length; i += 4) if (Math.abs(a[i] - b[i]) + Math.abs(a[i+1] - b[i+1]) + Math.abs(a[i+2] - b[i+2]) > 60) changedPixels++
  const save = changedPixels > 0 || progress === 0 || progress === 1 || progress === null
  if (save) {
    await fs.writeFile(path.join(output, stem + '-actual.png'), actual)
    if (changedPixels > 0) await fs.writeFile(path.join(output, stem + '-unclipped-reference.png'), reference)
  }
  report.comparisons.push({ stem, progress, changedPixels, properties, screenshot: save ? stem + '-actual.png' : undefined })
  await check(stem + ': raster glyph coverage', async () => assert.equal(changedPixels, 0, `${changedPixels} pixels differ when only text clipping is removed`))
}

try {
  for (const [width, height] of [[320,740],[360,800],[390,844],[430,932],[768,1024],[1024,768],[1280,800],[1440,900],[1920,1080]]) {
    for (const [name, route] of [['home','/'],['gallery','/galeri-proyek']]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'no-preference' })
      await context.addInitScript(() => {
        window.__qaTextAnimations = []
        const native = Element.prototype.animate
        Element.prototype.animate = function (...args) {
          const animation = native.apply(this, args)
          if (this.matches('h1,h2,[data-hero-line]')) {
            animation.pause()
            animation.currentTime = 0
            window.__qaTextAnimations.push(animation)
          }
          return animation
        }
      })
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
      await page.goto(baseURL + route, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts.ready)
      const session = await context.newCDPSession(page)
      await session.send('DOM.enable')
      await session.send('CSS.enable')
      const label = `${name} ${width}`
      await paintedFont(page, session, 'main h1', 'Barlow Semi Condensed', label)
      await paintedFont(page, session, 'main p', 'Barlow', label)
      await paintedFont(page, session, '.minimal-nav a', 'Barlow', label)
      await paintedFont(page, session, '.minimal-footer__identity p', 'Barlow', label)
      const headings = page.locator('main h1,main h2')
      for (let i = 0; i < await headings.count(); i++) {
        const heading = headings.nth(i)
        const y = await heading.evaluate(e => e.getBoundingClientRect().top + scrollY - 140)
        await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), Math.max(0, y))
        await page.waitForTimeout(100)
        for (const progress of [0,0.1,0.35,1]) await pixelLoss(page, heading, progress, `${name}-${width}-heading-${i}-t${progress}`)
        // Check committed end styles too, after Motion has removed its native effects.
        await heading.evaluate(element => {
          const targets = [element, ...element.querySelectorAll('[data-hero-line]')]
          window.__qaTextAnimations.filter(a => targets.includes(a.effect?.target)).forEach(animation => animation.finish())
        })
        await page.waitForTimeout(35)
        await pixelLoss(page, heading, null, `${name}-${width}-heading-${i}-committed`)
      }
      if (name === 'home') {
        await page.locator('#kontak button').click()
        await paintedFont(page, session, '#inquiryTitle', 'Barlow Semi Condensed', label)
        await paintedFont(page, session, 'label[for="inquiry-service"]', 'Barlow', label)
        await paintedFont(page, session, '#inquiry-service', 'Barlow', label)
        const select = await page.locator('#inquiry-service').evaluate(e => {
          const s = getComputedStyle(e)
          const canvas = document.createElement('canvas').getContext('2d')
          canvas.font = s.font
          return { width: e.clientWidth, padding: parseFloat(s.paddingLeft) + parseFloat(s.paddingRight), textWidth: canvas.measureText(e.selectedOptions[0].text).width, text: e.selectedOptions[0].text, fontSize: s.fontSize }
        })
        report.controls.push({ width, select })
        await check(`form ${width}: selected service fits its native control`, async () => {
          assert(select.width - select.padding - 18 >= select.textWidth, JSON.stringify(select))
          assert.equal(select.fontSize, '16px')
        })
        await page.screenshot({ path: path.join(output, `form-${width}.png`) })
        await page.getByRole('button', { name: 'Kirim via WhatsApp' }).click()
        await page.screenshot({ path: path.join(output, `validation-${width}.png`) })
        await page.keyboard.press('Escape')
      }
      await check(`${label}: no runtime errors`, async () => assert.deepEqual(errors, []))
      await session.detach()
      await context.close()
      console.log(`${label}: ${report.comparisons.filter(c=>c.stem.startsWith(`${name}-${width}-`) && c.changedPixels).length} glyph clipping samples`)
    }
  }
} finally {
  await browser.close()
  await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2))
}
const failed = report.checks.filter(c => !c.pass)
console.log(`${report.checks.length - failed.length}/${report.checks.length} typography checks passed; ${report.comparisons.length} raster comparisons`)
if (failed.length) process.exitCode = 1
