import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const { chromium } = require('playwright')
const { default: AxeBuilder } = require('@axe-core/playwright')
const before = process.argv.includes('--before')
const phase = before ? 'before' : 'after'
const baseURL = process.env.PJP_QA_URL || 'http://127.0.0.1:5173'
const output = path.resolve(process.env.PJP_QA_OUTPUT || 'docs/gallery-minimal-20261111', phase)
await fs.mkdir(output, { recursive: true })
const sizes = before ? [[390,844],[1440,900]] : [[320,740],[390,844],[430,932],[768,1024],[1024,768],[1280,800],[1440,900],[1920,1080]]
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const results = []
try {
  for (const [width,height] of sizes) {
    const context = await browser.newContext({ viewport: { width,height }, reducedMotion: 'reduce', hasTouch: width <= 1024 })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    await page.goto(`${baseURL}/galeri-proyek`, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      await document.fonts.ready
      for (const image of document.images) image.loading = 'eager'
      await Promise.all([...document.images].map(image => image.decode().catch(() => {})))
    })
    const metrics = await page.evaluate(() => {
      const rect = element => {
        const r = element.getBoundingClientRect()
        return { left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height }
      }
      const photos = [...document.querySelectorAll('.project-photo')].map(rect)
      const overlaps = photos.some((a,i) => photos.slice(i+1).some(b => Math.min(a.right,b.right)-Math.max(a.left,b.left)>1 && Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1))
      const title = document.querySelector('h1')
      const status = document.querySelector('.project-filter-status')
      return {
        heroCount:document.querySelectorAll('.project-hero').length,
        heading:title?.textContent,headingCount:document.querySelectorAll('h1').length,
        headingGap:rect(title).top-rect(document.querySelector('header')).bottom,
        overflow:document.documentElement.scrollWidth>innerWidth,
        filters:[...document.querySelectorAll('.project-filter')].map(element=>element.textContent.trim()),
        filterSizes:[...document.querySelectorAll('.project-filter')].map(rect),
        category:document.querySelector('.project-category__heading').textContent.trim(),
        categoryCount:document.querySelector('.project-category__head>span').textContent,
        photos:photos.length,overlaps,
        brokenImages:[...document.images].filter(image=>!image.complete||!image.naturalWidth).map(image=>image.src),
        status:rect(status),statusText:status.textContent,
        categoryHeading:document.querySelector('.project-category__heading').lastElementChild.tagName,
        portfolioLabel:document.querySelector('main').textContent.includes('01 / PORTOFOLIO'),
        font:getComputedStyle(title).fontFamily,
        firstSection:document.querySelector('main>section').id,
        clippedText:[...document.querySelectorAll('h1,h2,h3,p,button')].filter(element=>element.getClientRects().length && element.scrollWidth>element.clientWidth+1).map(element=>element.textContent),
      }
    })
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
    await page.screenshot({ path:path.join(output,`gallery-${width}.png`) })
    await page.screenshot({ path:path.join(output,`gallery-${width}-full.png`),fullPage:true })
    const checks = []
    const check = async (name,test) => {
      try { await test(); checks.push({name,pass:true}) }
      catch (error) { checks.push({name,pass:false,error:error.message}) }
    }
    await check('hero, portfolio label and redundant counts removed', async()=>{
      assert.equal(metrics.heroCount,0)
      assert.equal(metrics.heading,'Galeri Proyek.')
      assert.equal(metrics.headingCount,1)
      assert.equal(metrics.portfolioLabel,false)
      assert.deepEqual(metrics.filters,['Semua foto','Pengaspalan hotmix'])
      assert.equal(metrics.firstSection,'dokumentasi')
      assert(metrics.status.width<=1 && metrics.status.height<=1)
    })
    await check('fixed header clearance, typography and responsive layout',async()=>{
      assert(metrics.headingGap>=32 && metrics.headingGap<=100)
      assert.equal(metrics.overflow,false)
      assert.equal(metrics.overlaps,false)
      assert.equal(metrics.clippedText.length,0)
      assert(metrics.font.includes('Barlow Semi Condensed'))
      assert(metrics.filterSizes.every(r=>r.height>=44 && r.width>=44))
    })
    await check('category, count and all four photos preserved',async()=>{
      assert.equal(metrics.category,'Pengaspalan hotmix')
      assert.equal(metrics.categoryCount,'04 FOTO')
      assert.equal(metrics.categoryHeading,'H2')
      assert.equal(metrics.photos,4)
      assert.equal(metrics.brokenImages.length,0)
    })
    await check('axe accessibility scan',async()=>assert.deepEqual(axe.violations.map(item=>item.id),[]))
    if (!before) {
      await check('both filters retain state and screen-reader status',async()=>{
        const hotmix=page.getByRole('button',{name:'Pengaspalan hotmix',exact:true})
        await hotmix.click()
        assert.equal(await hotmix.getAttribute('aria-pressed'),'true')
        assert.equal(await page.locator('.project-photo__button').count(),4)
        assert.equal(await page.locator('.project-filter-status').getAttribute('role'),'status')
        assert.equal(await page.locator('.project-filter-status').textContent(),'4 foto ditampilkan')
        const all=page.getByRole('button',{name:'Semua foto',exact:true})
        await all.focus()
        await page.keyboard.press('Space')
        assert.equal(await all.getAttribute('aria-pressed'),'true')
      })
      await check('all photos open, arrows work, focus stays inside and returns on Escape',async()=>{
        const photos=page.locator('.project-photo__button')
        for(let i=0;i<4;i++){
          await photos.nth(i).click()
          const dialog=page.locator('.project-lightbox')
          const photo=dialog.locator('img')
          const original=await photo.getAttribute('src')
          assert.equal(original,await photos.nth(i).locator('img').getAttribute('src'))
          await page.getByRole('button',{name:'Foto berikutnya'}).click()
          assert.notEqual(await photo.getAttribute('src'),original)
          await page.getByRole('button',{name:'Foto sebelumnya'}).click()
          await page.keyboard.press('ArrowRight')
          await page.keyboard.press('ArrowLeft')
          for(let tab=0;tab<5;tab++){
            await page.keyboard.press('Tab')
            assert(await dialog.evaluate(element=>element.contains(document.activeElement)))
          }
          if(i===0 && [390,1440].includes(width)) await page.screenshot({path:path.join(output,`lightbox-${width}.png`)})
          await page.keyboard.press('Escape')
          assert(await photos.nth(i).evaluate(element=>element===document.activeElement))
        }
      })
      await check('global navigation state and consultation entry remain functional',async()=>{
        if(width<=950){
          await page.getByRole('button',{name:'Buka menu'}).click()
          assert.equal(await page.locator('.minimal-mobile-menu [aria-current="page"]').textContent(),'Galeri Proyek03')
          await page.keyboard.press('Escape')
        } else {
          assert.equal(await page.locator('.minimal-nav [aria-current="page"]').textContent(),'Galeri Proyek')
        }
        await page.locator('.project-bottom-cta button').click()
        assert.equal(await page.locator('.inquiry-dialog').isVisible(),true)
        await page.keyboard.press('Escape')
      })
    }
    await check('console and runtime remain clean',async()=>assert.deepEqual(errors,[]))
    results.push({width,height,metrics,checks,violations:axe.violations.map(item=>({id:item.id,nodes:item.nodes.map(node=>node.target)})),errors})
    console.log(`${phase} ${width}: ${checks.filter(item=>item.pass).length}/${checks.length} checks passed`)
    await context.close()
  }
} finally {
  await fs.writeFile(path.join(output,'report.json'),JSON.stringify({phase,baseURL,results},null,2))
  await browser.close()
}
const failures=results.flatMap(result=>result.checks.filter(check=>!check.pass).map(check=>({width:result.width,...check})))
console.log(JSON.stringify({viewports:results.length,failures},null,2))
if(!before && failures.length) process.exitCode=1
