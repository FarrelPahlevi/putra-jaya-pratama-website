import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const { chromium } = require('playwright')
const baseURL = process.env.PJP_QA_URL || 'http://127.0.0.1:4173'
const output = path.resolve(process.env.PJP_QA_OUTPUT || 'docs/motion-20261111', 'motion')
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const report = { engine: browser.version(), checks: [], viewports: [], limitations: ['Emulated viewports/touch; no physical device or field Core Web Vitals measurement.'] }
const check = async (name, action) => {
  try { await action(); report.checks.push({ name, pass: true }); console.log('PASS ' + name) }
  catch (error) { report.checks.push({ name, pass: false, error: error.message }); console.log('FAIL ' + name + ': ' + error.message) }
}
const scrollTo = (page, y) => page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), y)
const stats = page => page.evaluate(() => ({
  overflow: document.documentElement.scrollWidth > innerWidth,
  root: document.querySelector('.minimal-site')?.dataset.motionState,
  active: document.getAnimations().filter(a => a.playState === 'running').length,
  effects: document.getAnimations().length,
  styles: [...document.querySelectorAll('[data-motion], [data-hero-line], [data-hero-support]')].filter(e => e.style.cssText).length,
  headerTop: document.querySelector('.minimal-header').getBoundingClientRect().top,
  hidden: [...document.querySelectorAll('main h1,main h2,main p, main [data-motion]')].filter(e => getComputedStyle(e).opacity === '0' || getComputedStyle(e).visibility === 'hidden').length,
  cls: window.__motionMetrics?.cls ?? 0,
  shifts: window.__motionMetrics?.shifts ?? [],
}))

try {
  for (const [width, height] of [[320,740],[360,800],[390,844],[430,932],[768,1024],[1024,768],[1280,800],[1440,900],[1920,1080]]) {
    for (const [name, route] of [['home','/'],['gallery','/galeri-proyek']]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'no-preference', hasTouch: width <= 1024 })
      await context.addInitScript(() => {
        window.__motionMetrics = { cls: 0, shifts: [] }
        new PerformanceObserver(list => list.getEntries().forEach(entry => {
          if (entry.hadRecentInput) return
          window.__motionMetrics.cls += entry.value
          window.__motionMetrics.shifts.push({ value: entry.value, time: entry.startTime, nodes: entry.sources?.map(s => s.node?.className) })
        })).observe({ type: 'layout-shift', buffered: true })
      })
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('console', message => { if (['error','warning'].includes(message.type())) errors.push(message.text()) })
      await page.goto(baseURL + route, { waitUntil: 'networkidle' })
      await page.waitForFunction(() => document.querySelector('.minimal-site')?.dataset.motionState === 'active')
      await page.evaluate(() => document.fonts.ready)
      await check(`${name} ${width}: initial render, working CTA, no hidden content`, async () => {
        const initial = await stats(page)
        assert.equal(initial.hidden, 0)
        assert.equal(initial.overflow, false)
        if (name === 'home') {
          await page.locator('.minimal-hero__buttons button').click()
          assert(await page.locator('dialog[open]').isVisible())
          await page.keyboard.press('Escape')
        }
      })
      const limit = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)
      let maxActive = 0
      await check(`${name} ${width}: slow/fast/reverse scroll and fixed header`, async () => {
        for (let y = 0; y <= limit; y += Math.round(height * 0.6)) {
          await scrollTo(page, y)
          await page.waitForTimeout(85)
          const current = await stats(page)
          maxActive = Math.max(maxActive, current.active)
          assert.equal(current.overflow, false)
          assert.equal(current.hidden, 0)
          assert.equal(Math.round(current.headerTop), 0)
        }
        await scrollTo(page, limit)
        await scrollTo(page, 0)
        await scrollTo(page, limit * 0.5)
        await scrollTo(page, 0)
        await page.waitForTimeout(1200)
        const final = await stats(page)
        assert.equal(final.hidden, 0)
        assert.equal(final.overflow, false)
        assert(final.active <= (name === 'home' && width >= 768 ? 6 : 0), `unexpected persistent animations: ${final.active}`)
        assert(maxActive > 0, 'no animation observed while scrolling')
      })
      if (name === 'home') {
        await check(`${name} ${width}: parallax reverses, mobile stays static`, async () => {
          const image = page.locator('.minimal-hero__image')
          const before = await image.evaluate(e => getComputedStyle(e).transform)
          await scrollTo(page, height * 0.5)
          await page.waitForTimeout(100)
          const after = await image.evaluate(e => getComputedStyle(e).transform)
          if (width >= 768) assert.notEqual(before, after)
          else assert.equal(before, 'none')
          await scrollTo(page, 0)
          await page.waitForTimeout(100)
          assert.equal(await image.evaluate(e => getComputedStyle(e).transform), before)
        })
        await check(`${name} ${width}: anchor navigation stays below header`, async () => {
          await page.locator('.minimal-hero__buttons a').click()
          await page.waitForTimeout(1000)
          assert.equal(await page.evaluate(() => document.activeElement.id), 'layanan')
          const top = await page.locator('#layanan').evaluate(e => e.getBoundingClientRect().top)
          const headerHeight = await page.locator('.minimal-header').evaluate(e => e.getBoundingClientRect().height)
          assert(top >= headerHeight - 2, `anchor top ${top}, header ${headerHeight}`)
        })
      } else {
        await check(`${name} ${width}: group transition and keyboard lightbox`, async () => {
          for (let i = 0; i < 4; i++) {
            await page.getByRole('button', { name: i % 2 ? 'Semua foto' : 'Pengaspalan hotmix', exact: true }).click()
          }
          assert.equal(await page.locator('.project-photo').count(), 4)
          await page.locator('.project-photo__button').first().focus()
          await page.keyboard.press('Enter')
          assert(await page.locator('.project-lightbox[open]').isVisible())
          await page.keyboard.press('ArrowRight')
          await page.keyboard.press('ArrowLeft')
          await page.keyboard.press('Escape')
          assert(await page.locator('.project-photo__button').first().evaluate(e => e === document.activeElement))
        })
      }
      await scrollTo(page, 0)
      await page.waitForTimeout(1100)
      await page.screenshot({ path: path.join(output, `${name}-${width}-initial.png`) })
      const selectors = name === 'home' ? ['#layanan','#tentang','#proyek','#kontak'] : ['.project-photo-grid']
      if ([390,768,1440,1920].includes(width)) {
        for (const selector of selectors) {
          const y = await page.locator(selector).evaluate(e => e.getBoundingClientRect().top + scrollY - 110)
          await scrollTo(page, y)
          await page.waitForTimeout(1000)
          await page.screenshot({ path: path.join(output, `${name}-${width}-${selector.replace(/[#.]/g,'')}.png`) })
        }
      }
      const metrics = await stats(page)
      report.viewports.push({ name, width, height, maxActive, ...metrics, errors })
      await check(`${name} ${width}: console clean`, async () => assert.deepEqual(errors, []))
      await check(`${name} ${width}: refresh preserves visible content and initialized motion`, async () => {
        await page.reload({ waitUntil: 'networkidle' })
        await page.waitForFunction(() => document.querySelector('.minimal-site')?.dataset.motionState === 'active')
        assert.equal((await stats(page)).hidden, 0)
        assert.equal((await stats(page)).overflow, false)
        assert(await page.locator('h1').isVisible())
      })
      await context.close()
    }
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' })
  const page = await context.newPage()
  await page.goto(baseURL, { waitUntil: 'networkidle' })
  await check('runtime reduced-motion toggles and restores all animated styles', async () => {
    await scrollTo(page, 1400)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.waitForFunction(() => document.querySelector('.minimal-site')?.dataset.motionState === 'static')
    assert.equal(await page.evaluate(() => document.getAnimations().length), 0)
    assert.equal(await page.locator('.minimal-hero__image').evaluate(e => e.style.cssText), '')
    assert.equal((await stats(page)).styles, 0)
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.waitForFunction(() => document.querySelector('.minimal-site')?.dataset.motionState === 'active')
  })
  await check('repeated breakpoint changes do not duplicate scroll animations', async () => {
    for (const width of [390,1440,1024,430,1920,768,1440]) {
      await page.setViewportSize({ width, height: 900 })
      await page.waitForTimeout(120)
      assert.equal((await stats(page)).overflow, false)
    }
    await page.waitForTimeout(1200)
    const animations = await page.evaluate(() => document.getAnimations().filter(a => a.effect?.target?.matches('.minimal-hero__image,.minimal-story__image img')).length)
    assert.equal(animations, 2)
  })
  await check('touch input scrolls without trapping', async () => {
    const touchContext = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true })
    const touchPage = await touchContext.newPage()
    await touchPage.goto(baseURL, { waitUntil: 'networkidle' })
    const session = await touchContext.newCDPSession(touchPage)
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 190, y: 700 }] })
    for (let i = 1; i <= 12; i++) {
      await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 190, y: 700 - i * 40 }] })
      await touchPage.waitForTimeout(25)
    }
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await touchPage.waitForTimeout(250)
    assert(await touchPage.evaluate(() => scrollY > 100))
    await session.detach()
    await touchContext.close()
  })
  await context.close()

  await check('failed motion chunk keeps content and enhanced controls usable', async () => {
    const failureContext = await browser.newContext()
    const failed = await failureContext.newPage()
    await failed.route('**/assets/siteMotion-*.js', route => route.abort())
    await failed.goto(baseURL, { waitUntil: 'networkidle' })
    await failed.waitForFunction(() => document.querySelector('.minimal-site')?.dataset.motionState === 'static')
    assert.equal((await stats(failed)).hidden, 0)
    await failed.locator('.minimal-hero__buttons button').click()
    assert(await failed.locator('dialog[open]').isVisible())
    await failureContext.close()
  })

  for (const width of [320,360,390,430,768,1024,1280,1440,1920]) {
    for (const [name,route] of [['home','/'],['gallery','/galeri-proyek']]) {
      await check(`JavaScript disabled ${name} ${width}: content, navigation, summary and native images`, async () => {
        const staticContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } })
        const staticPage = await staticContext.newPage()
        await staticPage.goto(baseURL + route, { waitUntil: 'networkidle' })
        assert(await staticPage.locator('h1').isVisible())
        assert(await staticPage.locator('.pjp-static-navigation').isVisible())
        assert(await staticPage.locator('#ringkasan-manual-text').isEditable())
        assert.equal(await staticPage.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
        if (name === 'home') assert.equal(await staticPage.locator('.minimal-service img').count(), 6)
        else {
          assert.equal(await staticPage.locator('.project-photo__button[href]').count(), 4)
          const href = await staticPage.locator('.project-photo__button').first().getAttribute('href')
          await staticPage.locator('.project-photo__button').first().click()
          assert(staticPage.url().endsWith(href))
          await staticPage.goBack()
        }
        await staticPage.screenshot({ path: path.join(output, `${name}-${width}-no-javascript.png`) })
        await staticContext.close()
      })
    }
  }
} finally {
  await browser.close()
  await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2))
}
const failed = report.checks.filter(check => !check.pass)
console.log(`${report.checks.length - failed.length}/${report.checks.length} checks passed`)
if (failed.length) process.exitCode = 1
