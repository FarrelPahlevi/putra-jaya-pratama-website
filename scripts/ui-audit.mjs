import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const { chromium } = require('playwright')
const { default: AxeBuilder } = require('@axe-core/playwright')
const phase = process.argv.includes('--before') ? 'before' : 'after'
const baseURL = process.env.PJP_QA_URL || 'http://127.0.0.1:5173'
const output = path.resolve(process.env.PJP_QA_OUTPUT || 'docs/ui-ux-20261111', phase)
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const sizes = [[320,740],[360,800],[390,844],[430,932],[768,1024],[1024,768],[1280,800],[1440,900],[1920,1080]]
const report = { phase, baseURL, engine: browser.version(), viewports: [], interactions: [] }

try {
  for (const [width, height] of sizes) {
    for (const [name, route] of [['home','/'], ['gallery','/galeri-proyek']]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce', hasTouch: width <= 1024 })
      const page = await context.newPage()
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
      await page.goto(baseURL + route, { waitUntil: 'networkidle' })
      await page.evaluate(async () => {
        await document.fonts.ready
        for (const image of document.images) image.loading = 'eager'
        await Promise.race([
          Promise.all([...document.images].map(image => image.decode().catch(() => {}))),
          new Promise(resolve => setTimeout(resolve, 8000)),
        ])
        window.scrollTo(0, 0)
      })
      const metrics = await page.evaluate(() => {
        const rect = element => {
          const r = element.getBoundingClientRect()
          return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) }
        }
        const controls = [...document.querySelectorAll('a[href], button, input, select, textarea')]
          .filter(element => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden' && !element.matches('.minimal-skip'))
        const photos = [...document.querySelectorAll('.project-photo')]
        return {
          overflow: document.documentElement.scrollWidth > innerWidth,
          clippedText: [...document.querySelectorAll('h1,h2,h3,p,button,label')]
            .filter(element => element.getClientRects().length && element.scrollWidth > element.clientWidth + 1)
            .map(element => element.textContent.trim().slice(0, 70)),
          smallTargets: controls.filter(element => {
            const r = element.getBoundingClientRect()
            return r.width < 44 || r.height < 44
          }).map(element => ({ text: element.textContent.trim().slice(0, 70) || element.getAttribute('aria-label'), ...rect(element) })),
          brokenImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.getAttribute('src')),
          imageOverlap: photos.some((element, index) => photos.slice(index + 1).some(other => {
            const a = element.getBoundingClientRect(), b = other.getBoundingClientRect()
            return Math.min(a.right,b.right)-Math.max(a.left,b.left)>1 && Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1
          })),
          mainHeading: document.querySelector('h1')?.textContent,
          font: getComputedStyle(document.querySelector('h1')).fontFamily,
          fontsLoaded: document.fonts.check('800 32px "Barlow Semi Condensed"') && document.fonts.check('400 16px Barlow'),
          title: document.title,
          visibleCopy: document.body.innerText,
          sections: [...document.querySelectorAll('main > section')].map(element => ({ id: element.id || element.className, ...rect(element) })),
        }
      })
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
      const violations = axe.violations.map(item => ({ id: item.id, impact: item.impact, description: item.description, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) }))
      await page.screenshot({ path: path.join(output, `${name}-${width}.png`), fullPage: true })
      await page.screenshot({ path: path.join(output, `${name}-${width}-hero.png`) })
      if ([390,768,1440].includes(width) && name === 'home') {
        for (const id of ['layanan','tentang','proses','kontak']) await page.locator(`#${id}`).screenshot({ path: path.join(output, `${name}-${width}-${id}.png`) })
      }
      report.viewports.push({ page: name, width, height, ...metrics, violations, errors })
      console.log(`${phase} ${name} ${width}: overflow=${metrics.overflow}, overlap=${metrics.imageOverlap}, targets=${metrics.smallTargets.length}, axe=${violations.length}, images=${metrics.brokenImages.length}`)
      await context.close()
    }
  }
} finally {
  await fs.writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2))
  await browser.close()
}
const failed = report.viewports.filter(view => view.overflow || view.imageOverlap || view.clippedText.length || view.smallTargets.length || view.brokenImages.length || view.violations.length || view.errors.length || !view.fontsLoaded)
console.log(`${report.viewports.length - failed.length}/${report.viewports.length} viewport checks passed`)
if (phase === 'after' && failed.length) process.exitCode = 1
