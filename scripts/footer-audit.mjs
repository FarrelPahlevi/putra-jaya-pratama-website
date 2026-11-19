import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const { chromium } = require('playwright')
const { default: AxeBuilder } = require('@axe-core/playwright')
const before = process.argv.includes('--before')
const smoke = process.argv.includes('--smoke')
const references = process.argv.includes('--references')
const interactions = process.argv.includes('--interactions')
const sweep = process.argv.includes('--sweep')
const fallback = process.argv.includes('--fallback')
const phase = before ? 'before' : 'after'
const baseURL = process.env.PJP_QA_URL || 'http://127.0.0.1:4173'
const output = path.resolve('docs/footer-redesign-20261117', references ? 'references' : phase)
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const report = { phase, baseURL, engine: browser.version(), checks: [], views: [], references: [], motion: [] }
const check = async (name, action) => {
  try { await action(); report.checks.push({ name, pass: true }) }
  catch (error) { report.checks.push({ name, pass: false, error: error.message }); console.log('FAIL', name, error.message) }
}

try {
  if (references) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
    for (const [name, url] of [
      ['footer-large-type', 'https://www.footer.design/styles/large-type'],
      ['21st-footers', 'https://21st.dev/community/components/explore/footer-design'],
      ['awwwards-inspiration', 'https://www.awwwards.com/inspiration/'],
      ['awwwards-footer-elements', 'https://www.awwwards.com/elements/?text=footer'],
    ]) {
      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })
        await page.waitForTimeout(1800)
        await page.screenshot({ path: path.join(output, name + '.png') })
        report.references.push({ name, url, status: response.status(), title: await page.title(), text: (await page.locator('body').innerText()).slice(0, 1800) })
      } catch (error) { report.references.push({ name, url, error: error.message }) }
    }
  } else if (fallback) {
    for (const width of [768,1440]) {
      for (const mode of ['no-js','no-observer']) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, javaScriptEnabled: mode !== 'no-js' })
        if (mode === 'no-observer') await context.addInitScript(() => { delete window.IntersectionObserver })
        const page = await context.newPage()
        await page.goto(baseURL, { waitUntil: 'networkidle' })
        await check(`${mode} ${width}: persistent shortcut has conservative compact fallback`, async () => {
          const box = await page.locator('.pjp-floating-contact__link').boundingBox()
          assert(box.width <= 52)
          assert.equal(await page.locator('.pjp-floating-contact__link').getAttribute('href'), 'https://wa.me/6281313884080')
        })
        await context.close()
      }
    }
  } else if (sweep) {
    for (const width of [320,390,768,1024,1440,1920]) {
      for (const route of ['/', '/galeri-proyek']) {
        const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
        const page = await context.newPage()
        await page.goto(baseURL + route, { waitUntil: 'networkidle' })
        await page.evaluate(() => document.fonts.ready)
        const collisions = []
        const controls = page.locator('footer a,footer button')
        for (let index = 0; index < await controls.count(); index++) {
          await controls.nth(index).evaluate(el => {
            const target = el.getBoundingClientRect()
            const floating = document.querySelector('.pjp-floating-contact').getBoundingClientRect()
            window.scrollTo({ top: scrollY + target.top + target.height / 2 - (floating.top + floating.height / 2), behavior: 'instant' })
          })
          await page.waitForTimeout(40)
          const collision = await controls.nth(index).evaluate(el => {
            const a = el.getBoundingClientRect()
            const b = document.querySelector('.pjp-floating-contact').getBoundingClientRect()
            return a.right > b.left && a.left < b.right && a.bottom > b.top && a.top < b.bottom ? el.textContent.trim() : null
          })
          if (collision) collisions.push(collision)
        }
        await check(`${route} ${width}: no floating overlap throughout footer scrolling`, async () => assert.deepEqual(collisions, []))
        await context.close()
      }
    }
  } else if (interactions) {
    for (const width of [390, 768, 1440]) {
      for (const [name, route] of [['home', '/'], ['gallery', '/galeri-proyek']]) {
        const label = `${name} ${width}`
        const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
        await context.route('https://wa.me/**', r => r.fulfill({ status: 200, contentType: 'text/html', body: '<title>WhatsApp destination test</title>' }))
        const page = await context.newPage()
        await page.goto(baseURL + route, { waitUntil: 'networkidle' })
        await page.evaluate(() => document.fonts.ready)
        const footer = page.locator('footer')
        await check(label + ': WhatsApp opens the original URL', async () => {
          const popupPromise = page.waitForEvent('popup')
          await footer.getByRole('link', { name: 'Konsultasi via WhatsApp', exact: true }).click()
          const popup = await popupPromise
          await popup.waitForLoadState()
          assert.equal(popup.url(), 'https://wa.me/6281313884080')
          await popup.close()
        })
        await check(label + ': each service seeds inquiry and returns focus', async () => {
          for (const service of ['Pengaspalan hotmix','Paving block','Cut and fill','Cor beton','Saluran U-Ditch','Resapan air']) {
            const trigger = footer.getByRole('button', { name: service, exact: true })
            await trigger.click()
            assert.equal(await page.locator('#inquiry-service').inputValue(), service)
            assert(await page.locator('dialog[open]').isVisible())
            await page.keyboard.press('Escape')
            assert.equal(await page.locator('dialog[open]').count(), 0)
            assert(await trigger.evaluate(el => el === document.activeElement))
          }
          await footer.getByRole('button', { name: 'Isi kebutuhan proyek', exact: true }).click()
          assert(await page.locator('dialog[open]').isVisible())
          await page.keyboard.press('Escape')
        })
        await check(label + ': keyboard can reach every footer control with visible focus', async () => {
          const controls = footer.locator('a,button')
          await controls.first().focus()
          for (let index = 0; index < await controls.count(); index++) {
            const control = controls.nth(index)
            assert(await control.evaluate(el => el === document.activeElement), 'Unexpected Tab order at ' + index)
            const focus = await control.evaluate(el => ({ outline: getComputedStyle(el).outlineStyle, width: getComputedStyle(el).outlineWidth }))
            assert.notEqual(focus.outline, 'none')
            assert(parseFloat(focus.width) >= 2)
            await page.keyboard.press('Tab')
          }
          await footer.getByRole('button', { name: 'Paving block', exact: true }).focus()
          await page.keyboard.press('Enter')
          assert(await page.locator('dialog[open]').isVisible())
          await page.keyboard.press('Escape')
        })
        await check(label + ': back-to-top remains on the same route and moves focus', async () => {
          await footer.getByRole('link', { name: 'Kembali ke atas halaman' }).click()
          assert.equal(await page.evaluate(() => scrollY), 0)
          assert.equal(new URL(page.url()).pathname, route)
          assert.equal(await page.evaluate(() => document.activeElement.id), name === 'home' ? 'beranda' : 'main')
        })
        await check(label + ': navigation reaches the right section and gallery', async () => {
          await footer.getByRole('navigation', { name: 'Navigasi footer' }).getByRole('link', { name: 'Layanan', exact: true }).click()
          if (name === 'gallery') await page.waitForURL('**/#layanan')
          assert.equal(new URL(page.url()).hash, '#layanan')
          const section = await page.locator('#layanan').boundingBox()
          assert(section.y >= 0 && section.y < 150)
          if (name === 'home') assert.equal(await page.evaluate(() => document.activeElement.id), 'layanan')
          await page.locator('footer nav').getByRole('link', { name: 'Galeri Proyek' }).click()
          await page.waitForURL('**/galeri-proyek')
          assert(await page.locator('footer h2').isVisible())
        })
        await context.close()
      }
    }
    const motionContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
    const page = await motionContext.newPage()
    await page.goto(baseURL, { waitUntil: 'networkidle' })
    await page.waitForFunction(() => document.querySelector('.minimal-site').dataset.motionState === 'active')
    await check('Motion: footer heading reveals once and settles without a mask', async () => {
      await page.locator('footer h2').scrollIntoViewIfNeeded()
      await page.waitForTimeout(80)
      const heading = page.locator('footer h2')
      const active = await heading.evaluate(el => el.getAnimations().filter(a => a.playState === 'running').length)
      assert(active > 0)
      assert.equal(await heading.evaluate(el => getComputedStyle(el).clipPath), 'none')
      await page.waitForTimeout(900)
      assert.equal(await heading.evaluate(el => getComputedStyle(el).opacity), '1')
      await page.locator('.pjp-site-footer__wordmark').scrollIntoViewIfNeeded()
      await page.waitForTimeout(900)
      assert.equal(await page.locator('.pjp-site-footer__wordmark').evaluate(el => getComputedStyle(el).opacity), '1')
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await heading.scrollIntoViewIfNeeded()
      assert.equal(await heading.evaluate(el => el.getAnimations().filter(a => a.playState === 'running').length), 0)
    })
    await check('Motion: button hover responds and smooth back-to-top completes', async () => {
      const cta = page.locator('.pjp-site-footer__cta')
      await cta.hover()
      await page.waitForTimeout(300)
      assert.notEqual(await cta.evaluate(el => getComputedStyle(el).transform), 'none')
      await page.screenshot({ path: path.join(output, 'desktop-cta-hover.png') })
      await page.locator('.pjp-site-footer__top').click()
      await page.waitForFunction(() => scrollY === 0)
      assert.equal(await page.evaluate(() => document.activeElement.id), 'beranda')
    })
    await check('Motion: changing to reduced motion restores visible static content', async () => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.locator('footer').scrollIntoViewIfNeeded()
      const state = await page.locator('footer').evaluate(el => ({
        running: el.getAnimations({ subtree: true }).filter(a => a.playState === 'running').length,
        items: [...el.querySelectorAll('[data-motion]')].map(n => ({ opacity: getComputedStyle(n).opacity, transform: getComputedStyle(n).transform })),
      }))
      report.motion.push(state)
      assert.equal(state.running, 0)
      assert(state.items.every(x => x.opacity === '1' && x.transform === 'none'))
    })
    await motionContext.close()
    for (const route of ['/', '/galeri-proyek']) {
      const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
      const page = await context.newPage()
      await page.goto(baseURL + route, { waitUntil: 'networkidle' })
      await check(route + ': prerendered footer remains visible without JavaScript', async () => {
        assert.equal(await page.locator('footer h2').textContent(), 'Punya Proyek Jalan?')
        assert.equal(await page.locator('.pjp-site-footer__cta').getAttribute('href'), 'https://wa.me/6281313884080')
        assert.equal(await page.locator('.pjp-site-footer__wordmark').evaluate(el => getComputedStyle(el).opacity), '1')
      })
      await context.close()
    }
  } else if (smoke) {
    const page = await browser.newPage()
    await page.goto(baseURL, { waitUntil: 'networkidle' })
    await check('Footer contains the requested project CTA', async () => {
      assert.equal(await page.locator('footer h2').textContent({ timeout: 2500 }), 'Punya Proyek Jalan?')
    })
  } else {
    const sizes = before ? [[1440, 1000], [768, 1024], [390, 844]] : [[320,740],[360,800],[390,844],[430,932],[768,1024],[1024,768],[1280,900],[1440,1000],[1920,1080]]
    for (const [width, height] of sizes) {
      for (const [name, route] of [['home', '/'], ['gallery', '/galeri-proyek']]) {
        const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', hasTouch: width <= 1024 })
        const page = await context.newPage()
        const errors = []
        page.on('pageerror', error => errors.push(error.message))
        await page.goto(baseURL + route, { waitUntil: 'networkidle' })
        await page.evaluate(() => document.fonts.ready)
        const footer = page.locator('footer')
        await footer.scrollIntoViewIfNeeded()
        await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
        await page.waitForTimeout(80)
        if (before || [390,768,1024,1440].includes(width)) {
          // Omit page-fixed navigation from tall element captures; viewport captures stay unmodified.
          await footer.screenshot({ path: path.join(output, `${name}-${width}-footer.png`), style: '.minimal-header, .minimal-skip { visibility: hidden !important; }' })
          await page.screenshot({ path: path.join(output, `${name}-${width}-bottom.png`) })
        }
        const metrics = await footer.evaluate(el => {
          const box = el.getBoundingClientRect()
          const floating = document.querySelector('.pjp-floating-contact').getBoundingClientRect()
          const controls = [...el.querySelectorAll('a,button')].map(node => {
            const r = node.getBoundingClientRect()
            return { text: node.textContent.trim(), height: r.height, width: r.width, overflow: r.left < -1 || r.right > innerWidth + 1,
              collision: r.right > floating.left && r.left < floating.right && r.bottom > floating.top && r.top < floating.bottom }
          })
          return { height: box.height, overflow: document.documentElement.scrollWidth > innerWidth, controls,
            words: el.innerText, fonts: document.fonts.check('800 48px "Barlow Semi Condensed"') }
        })
        report.views.push({ name, width, height, metrics, errors })
        if (!before) {
          const label = `${name} ${width}`
          await check(label + ': no overflow, floating collision or runtime errors', async () => {
            assert.equal(metrics.overflow, false)
            assert.deepEqual(metrics.controls.filter(x => x.collision || x.overflow), [])
            assert.deepEqual(errors, [])
            assert(metrics.fonts)
          })
          await check(label + ': controls remain at least 44px', async () => {
            assert.deepEqual(metrics.controls.filter(x => x.height < 43.9 || x.width < 43.9), [])
          })
          await check(label + ': exact content and original destination', async () => {
            assert.equal(await footer.locator('h2').textContent(), 'Punya Proyek Jalan?')
            assert(metrics.words.includes('Ceritakan kebutuhan proyek Anda. Kami siap bantu dari perencanaan hingga pengerjaan.'))
            assert(!metrics.words.toLowerCase().includes('situs dalam pengembangan'))
            const cta = footer.getByRole('link', { name: 'Konsultasi via WhatsApp', exact: true })
            assert.equal(await cta.getAttribute('href'), 'https://wa.me/6281313884080')
            assert.equal(await cta.getAttribute('target'), '_blank')
            for (const link of await footer.locator('nav[aria-label="Navigasi footer"] a').all()) {
              const href = await link.getAttribute('href')
              if (href.startsWith('#')) assert.equal(await page.locator(href).count(), 1)
              if (name === 'gallery' && href.includes('#')) assert(href.startsWith('/#'))
            }
          })
          if ([390,768,1440].includes(width)) {
            await check(label + ': footer WCAG 2.2 AA axe audit', async () => {
              const result = await new AxeBuilder({ page }).include('footer').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
              assert.deepEqual(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), [])
            })
          }
        }
        await context.close()
      }
    }
  }
} finally {
  await browser.close()
  await fs.writeFile(path.join(output, smoke ? 'smoke.json' : fallback ? 'fallback.json' : sweep ? 'sweep.json' : interactions ? 'interactions.json' : 'report.json'), JSON.stringify(report, null, 2))
}
console.log(`${report.checks.filter(x => x.pass).length}/${report.checks.length} checks passed; ${report.views.length} responsive views; ${report.references.length} reference captures`)
if (report.checks.some(x => !x.pass)) process.exitCode = 1
