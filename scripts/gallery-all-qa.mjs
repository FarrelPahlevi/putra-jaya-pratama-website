import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import {createRequire} from 'node:module'
const require=createRequire(path.resolve('../PJP-Website-tools/package.json'))
const {chromium}=require('playwright')
const {default:AxeBuilder}=require('@axe-core/playwright')
const base='http://127.0.0.1:5174'
const output=path.resolve('docs/gallery-full-20261117')
await fs.mkdir(output,{recursive:true})
const browser=await chromium.launch({channel:'chrome',headless:true})
const result=[]
try {
 for(const width of [390,768,1440]) {
  const context=await browser.newContext({viewport:{width,height:width===768?1024:900},reducedMotion:'reduce',hasTouch:width<1024})
  const page=await context.newPage()
  const errors=[]
  page.on('pageerror',err=>errors.push(err.message))
  page.on('console',msg=>{if(msg.type()==='error')errors.push(msg.text())})
  await page.goto(base+'/galeri-proyek',{waitUntil:'networkidle'})
  assert.equal(await page.locator('.project-photo__button').count(),24)
  assert.equal(await page.locator('.project-category__head>span').textContent(),'198 FOTO')
  assert.equal(await page.locator('.project-filter-status').textContent(),'24 dari 198 foto ditampilkan')
  const first=page.locator('.project-photo__button').first()
  await first.scrollIntoViewIfNeeded()
  assert.equal(await first.locator('img').evaluate(async el=>{await el.decode().catch(()=>{});return el.naturalWidth>0}),true)
  await first.click()
  assert.equal(await page.locator('.project-lightbox').evaluate(el=>el.open),true)
  await page.getByRole('button',{name:'Foto berikutnya',exact:true}).click()
  await page.getByRole('button',{name:'Foto sebelumnya',exact:true}).click()
  await page.keyboard.press('Escape')
  assert.equal(await page.locator('.project-lightbox').evaluate(el=>el.open),false)
  assert.equal(await first.evaluate(el=>el===document.activeElement),true)
  let loop=0
  while(await page.getByRole('button',{name:/Muat 24 foto berikutnya/}).count()) {
   await page.getByRole('button',{name:/Muat 24 foto berikutnya/}).click()
   loop++
   if(loop>10)throw new Error('Pagination loop')
  }
  assert.equal(await page.locator('.project-photo__button').count(),198)
  assert.equal(await page.locator('.project-filter-status').textContent(),'198 dari 198 foto ditampilkan')
  const last=page.locator('.project-photo__button').last()
  await last.scrollIntoViewIfNeeded()
  assert.equal(await last.locator('img').evaluate(async el=>{await el.decode().catch(()=>{});return el.naturalWidth>0}),true)
  await last.click()
  assert.equal(await page.locator('.project-lightbox__controls>span').textContent(),'198 / 198')
  await page.getByRole('button',{name:'Foto berikutnya',exact:true}).click()
  assert.equal(await page.locator('.project-lightbox__controls>span').textContent(),'01 / 198')
  await page.keyboard.press('Escape')
  const metric=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,brokenVisible:[...document.querySelectorAll('.project-photo img')].filter(x=>x.getBoundingClientRect().top<innerHeight&&x.getBoundingClientRect().bottom>0&&(!x.complete||x.naturalWidth===0)).length}))
  assert.equal(metric.overflow,false)
  assert.equal(metric.brokenVisible,0)
  assert.deepEqual(errors,[])
  await page.locator('.project-filter').filter({hasText:'Pengaspalan hotmix'}).click()
  assert.equal(await page.locator('.project-photo__button').count(),24)
  await page.getByRole('button',{name:'Semua foto',exact:true}).click()
  assert.equal(await page.locator('.project-photo__button').count(),24)
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
  assert.deepEqual(axe.violations.map(v=>v.id),[])
  await page.screenshot({path:path.join(output,'gallery-'+width+'.png')})
  result.push({width,checks:'passed',errors,metric,axeViolations:0})
  console.log('PASS gallery '+width+'px: pagination 198, images, filters, lightbox, overflow, accessibility')
  await context.close()
 }
} finally { await browser.close(); await fs.writeFile(path.join(output,'qa-report.json'),JSON.stringify(result,null,2)) }
