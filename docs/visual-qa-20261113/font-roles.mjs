import fs from 'node:fs/promises'
import { createRequire } from 'node:module'
const require = createRequire('C:/Projects/PJP-Website-tools/package.json')
const { chromium } = require('playwright')
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const report = { generatedAt: new Date().toISOString(), samples: [], unpainted: [] }
try {
  for (const width of [320,360,390,430,768,1024,1280,1440,1920]) {
    const context = await browser.newContext({ viewport: { width, height:900 }, reducedMotion:'reduce' })
    const page = await context.newPage()
    const session = await context.newCDPSession(page)
    await session.send('DOM.enable')
    await session.send('CSS.enable')
    for (const [name,route] of [['home','/'],['gallery','/galeri-proyek']]) {
      await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'networkidle'})
      await page.evaluate(()=>document.fonts.ready)
      for(const state of ['page','form-error']) {
        if(state==='form-error') {
          await page.locator(name==='home'?'#kontak button':'.project-bottom-cta button').click()
          await page.locator('#inquiry-name').fill('Tim proyek PJP')
          await page.getByRole('button',{name:'Buat dan salin ringkasan'}).click()
        }
        const nodes=await page.evaluate(()=>[...document.querySelectorAll('h1,h2,h3,p,label,button,a,small,strong,input,select,textarea')].filter(e=>e.getClientRects().length&&((e.innerText||e.value||'').trim().length>1)).map((e,index)=>{
          e.setAttribute('data-qa-font',index)
          return {index,tag:e.tagName,text:(e.innerText||e.value).trim(),family:getComputedStyle(e).fontFamily,weight:getComputedStyle(e).fontWeight}
        }))
        const {root}=await session.send('DOM.getDocument')
        for(const node of nodes) {
          const {nodeId}=await session.send('DOM.querySelector',{nodeId:root.nodeId,selector:`[data-qa-font="${node.index}"]`})
          const {fonts}=await session.send('CSS.getPlatformFontsForNode',{nodeId})
          const expected=node.family.includes('Barlow Semi Condensed')?'BarlowSemiCondensed-':'Barlow-'
          const result={width,name,state,...node,fonts}
          if(!fonts.length)report.unpainted.push(result)
          else report.samples.push({...result,pass:fonts.some(f=>f.isCustomFont&&f.postScriptName.startsWith(expected)&&f.glyphCount>0)})
        }
      }
    }
    await context.close()
  }
} finally {
  await browser.close()
  await fs.writeFile('docs/visual-qa-20261113/font-roles.json',JSON.stringify(report,null,2))
}
const failed=report.samples.filter(s=>!s.pass)
console.log(JSON.stringify({samples:report.samples.length,unpainted:report.unpainted.length,failed},null,2))
if(failed.length)process.exitCode=1
