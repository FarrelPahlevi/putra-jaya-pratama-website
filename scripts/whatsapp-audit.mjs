import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const { chromium } = require('playwright')
const { default: AxeBuilder } = require('@axe-core/playwright')
const baseURL = process.env.PJP_QA_URL || 'http://127.0.0.1:4173'
const lifecycleOnly = process.argv.includes('--lifecycle-only')
const output = path.resolve(process.env.PJP_QA_OUTPUT || 'docs/whatsapp-20261113', lifecycleOnly ? 'whatsapp-lifecycle' : 'whatsapp')
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const report = { generatedAt:new Date().toISOString(), engine:browser.version(), checks:[], urls:[], viewports:[], interceptedNavigations:[] }
const check = async (name, action) => {
  try { await action(); report.checks.push({ name, pass:true }); console.log('PASS '+name) }
  catch(error) { report.checks.push({ name, pass:false, error:error.message }); console.log('FAIL '+name+': '+error.message.split('\n')[0]) }
}
const validateUrl = (href, text) => {
  const url = new URL(href)
  assert.equal(url.origin, 'https://wa.me')
  assert.equal(url.pathname, '/6281313884080')
  assert.equal(url.searchParams.size, 1)
  assert.equal(url.searchParams.get('text'), text)
  assert.equal(href, 'https://wa.me/6281313884080?text='+encodeURIComponent(text))
}
const axe = async page => {
  const result = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze()
  assert.deepEqual(result.violations.map(v=>v.id),[])
}

try {
  for(const [width,height] of lifecycleOnly ? [] : [[320,740],[360,800],[390,844],[430,932],[768,1024],[1024,768],[1280,800],[1440,900],[1920,1080]]) {
    for(const [name,route] of [['home','/'],['gallery','/galeri-proyek']]) {
      const context=await browser.newContext({viewport:{width,height},reducedMotion:'reduce',hasTouch:width<=1024,permissions:['clipboard-read','clipboard-write']})
      await context.route('https://wa.me/**',async route=>{
        report.interceptedNavigations.push(route.request().url())
        await route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><title>Intercepted WhatsApp test</title><p>Navigation mocked locally.</p>'})
      })
      await context.addInitScript(()=>{
        window.__waCalls=[]; window.__copies=[]; window.__denyCopy=false; window.__throwPopup=false
        window.open=(url,target,features)=>{
          window.__waCalls.push({url:String(url),target,features})
          if(window.__throwPopup)throw new Error('Popup blocked in test')
          return null
        }
        navigator.clipboard.writeText=async text=>{
          if(window.__denyCopy)throw new Error('Clipboard denied in test')
          window.__copies.push(text)
        }
      })
      const page=await context.newPage()
      const errors=[]
      page.on('pageerror',error=>errors.push(error.message))
      page.on('console',message=>{if(message.type()==='error')errors.push(message.text())})
      await page.goto(baseURL+route,{waitUntil:'networkidle'})
      const trigger=page.locator(name==='home'?'.minimal-hero__buttons button':'.project-bottom-cta button')
      await trigger.click()
      const dialog=page.locator('.inquiry-dialog')
      const label=`${name} ${width}`
      await check(label+': initial dialog, labels, touch targets and axe',async()=>{
        const r=await dialog.boundingBox()
        assert(r.x>=0&&r.y>=0&&r.x+r.width<=width+1&&r.y+r.height<=height+1)
        assert(await dialog.evaluate(e=>e.contains(document.activeElement)))
        const fields=await dialog.locator('input,select,textarea').all()
        assert.equal(fields.length,6)
        for(const field of fields)assert(await field.evaluate(e=>e.labels?.length&&getComputedStyle(e).fontSize==='16px'))
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
        for(const button of await dialog.locator('button').all())assert((await button.boundingBox()).height>=44)
        await axe(page)
      })
      await page.screenshot({path:path.join(output,`${name}-${width}-initial.png`)})
      await check(label+': empty required fields and first-invalid focus',async()=>{
        await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).click()
        assert.equal(await page.evaluate(()=>window.__waCalls.length),0)
        assert(await page.locator('#inquiry-name').evaluate(e=>e===document.activeElement))
        assert.equal(await page.locator('#inquiry-name').getAttribute('aria-invalid'),'true')
        assert.equal(await page.locator('#inquiry-location').getAttribute('aria-invalid'),'true')
        await page.waitForFunction(()=>{
          const label=document.querySelector('label[for="inquiry-name"]').getBoundingClientRect()
          const dialog=document.querySelector('.inquiry-dialog').getBoundingClientRect()
          return label.top>=dialog.top+8&&label.bottom<dialog.bottom
        })
        if(width>650){
          const nameTop=(await page.locator('#inquiry-name').boundingBox()).y
          const serviceTop=(await page.locator('#inquiry-service').boundingBox()).y
          assert(Math.abs(nameTop-serviceTop)<2,'field rows moved out of alignment on validation')
        }
        await page.locator('#inquiry-name').fill('Tim proyek PJP')
        await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).click()
        assert(await page.locator('#inquiry-location').evaluate(e=>e===document.activeElement))
        await axe(page)
      })
      await check(label+': required-only message, exact number/encoding and honest feedback',async()=>{
        await page.locator('#inquiry-location').fill('Bekasi')
        await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).click()
        const calls=await page.evaluate(()=>window.__waCalls)
        assert.equal(calls.length,1)
        const text=await page.locator('#inquiry-summary').inputValue()
        validateUrl(calls[0].url,text)
        assert.equal(calls[0].target,'_blank')
        assert(calls[0].features.includes('noopener')&&calls[0].features.includes('noreferrer'))
        assert(!/Perkiraan luas:|Rencana pengerjaan:|Keterangan:|belum diisi|undefined/.test(text))
        assert.equal(await page.evaluate(()=>window.__copies.length),0)
        const fallback=page.getByRole('link',{name:'Buka WhatsApp',exact:true})
        await page.waitForFunction(()=>{
          const link=document.querySelector('.inquiry-output a')?.getBoundingClientRect()
          const dialog=document.querySelector('.inquiry-dialog').getBoundingClientRect()
          return link&&link.bottom<=dialog.bottom-8&&link.top>=dialog.top
        })
        assert.equal(await fallback.getAttribute('href'),calls[0].url)
        assert.equal(await fallback.getAttribute('rel'),'noopener noreferrer')
        assert(!/(sudah|berhasil) (terkirim|diterima)/i.test(await page.locator('.inquiry-form__status').innerText()))
        report.urls.push({name,width,kind:'required-only',url:calls[0].url,message:text})
      })
      await check(label+': all optional fields, special characters and current snapshot',async()=>{
        await page.locator('#inquiry-name').fill('  Éko & "Tim" + #1 / 50%  ')
        assert.equal(await page.locator('#inquiry-summary').count(),0)
        await page.locator('#inquiry-location').fill(' Bekasi & Cikarang / Blok #2? ')
        await page.locator('#inquiry-area').fill(' 500 m² / 20 × 25 m ')
        await page.locator('#inquiry-timing').fill(' Akhir bulan ini / setelah survei ')
        await page.locator('#inquiry-details').fill('Jalan akses & area parkir.\nBeban > 5 ton; 50% rusak.')
        await page.screenshot({path:path.join(output,`${name}-${width}-fields.png`)})
        await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).click()
        const call=await page.evaluate(()=>window.__waCalls.at(-1))
        const text=await page.locator('#inquiry-summary').inputValue()
        validateUrl(call.url,text)
        assert(text.includes('Nama: Éko & "Tim" + #1 / 50%'))
        assert(text.includes('Perkiraan luas: 500 m² / 20 × 25 m'))
        assert(text.includes('Rencana pengerjaan: Akhir bulan ini / setelah survei'))
        assert(text.includes('Keterangan: Jalan akses & area parkir.\nBeban > 5 ton; 50% rusak.'))
        report.urls.push({name,width,kind:'all-fields',url:call.url,message:text})
        await axe(page)
      })
      await page.screenshot({path:path.join(output,`${name}-${width}-ready.png`)})
      await check(label+': copy success/retry and denied clipboard fallback',async()=>{
        await page.getByRole('button',{name:'Salin Ringkasan',exact:true}).click()
        const text=await page.locator('#inquiry-summary').inputValue()
        assert.equal(await page.evaluate(()=>window.__copies.at(-1)),text)
        await page.getByRole('button',{name:'Salin lagi',exact:true}).click()
        assert.equal(await page.evaluate(()=>window.__copies.length),2)
        await page.evaluate(()=>{window.__denyCopy=true})
        await page.getByRole('button',{name:'Salin lagi',exact:true}).click()
        await page.waitForFunction(()=>document.querySelector('#inquiry-summary')?.selectionEnd>0)
        assert((await page.locator('.inquiry-form__status').innerText()).includes('Penyalinan otomatis belum berhasil'))
      })
      await check(label+': Escape, scroll restore, return focus and retained data',async()=>{
        await page.keyboard.press('Escape')
        assert.equal(await dialog.isVisible(),false)
        assert.equal(await page.evaluate(()=>document.body.style.overflow),'')
        assert(await trigger.evaluate(e=>e===document.activeElement))
        await trigger.click()
        assert.equal(await page.locator('#inquiry-area').inputValue(),' 500 m² / 20 × 25 m ')
        await page.keyboard.press('Escape')
      })
      if(name==='home') {
        await check(label+': all six service CTAs preselect and repeated context overrides stale selection',async()=>{
          const links=page.locator('.minimal-service__inquiry')
          assert.equal(await links.count(),6)
          for(const link of await links.all()) {
            const title=(await link.innerText()).trim()
            await link.click()
            await page.waitForFunction(title=>document.querySelector('#inquiry-service')?.value===title,title)
            assert.equal(await page.locator('#inquiry-service').inputValue(),title)
            await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).click()
            const serviceMessage=await page.locator('#inquiry-summary').inputValue()
            const serviceUrl=await page.evaluate(()=>window.__waCalls.at(-1).url)
            assert(serviceMessage.includes('Jenis pekerjaan: '+title))
            validateUrl(serviceUrl,serviceMessage)
            report.urls.push({name,width,kind:'service',service:title,url:serviceUrl,message:serviceMessage})
            await page.locator('#inquiry-service').selectOption('Belum yakin / perlu konsultasi')
            await page.keyboard.press('Escape')
            await link.click()
            await page.waitForFunction(title=>document.querySelector('#inquiry-service')?.value===title,title)
            assert.equal(await page.locator('#inquiry-service').inputValue(),title)
            await page.keyboard.press('Escape')
          }
        })
        await check(label+': every generic home consultation trigger uses the shared dialog',async()=>{
          for(const selector of ['.minimal-hero__buttons button','.minimal-story__copy button','#kontak button','.minimal-footer__links button']){
            await page.locator(selector).click()
            assert(await dialog.isVisible())
            await page.keyboard.press('Escape')
          }
          if(width<=950){
            await page.getByRole('button',{name:'Buka menu'}).click()
            await page.locator('.minimal-mobile-menu button').click()
            assert(await dialog.isVisible())
            await page.keyboard.press('Escape')
            assert(await page.getByRole('button',{name:'Buka menu'}).evaluate(e=>e===document.activeElement))
          }
        })
      } else {
        await check(label+': gallery filter/lightbox and footer consultation stay functional',async()=>{
          await page.getByRole('button',{name:'Pengaspalan hotmix',exact:true}).click()
          assert.equal(await page.locator('.project-photo').count(),4)
          await page.locator('.project-photo__button').first().click()
          await page.keyboard.press('ArrowRight')
          await page.keyboard.press('Escape')
          await page.locator('.minimal-footer__links button').click()
          assert(await dialog.isVisible())
          await page.keyboard.press('Escape')
        })
      }
      await check(label+': official contact links and clean console',async()=>{
        const links=await page.locator('a[href^="https://wa.me/"]').all()
        assert(links.length>=1)
        for(const link of links){
          assert.equal(new URL(await link.getAttribute('href')).pathname,'/6281313884080')
          assert.equal(await link.getAttribute('rel'),'noopener noreferrer')
        }
        assert(!/kontak resmi.*(belum tersedia|sedang dilengkapi)/i.test(await page.locator('body').innerText()))
        assert.deepEqual(errors,[])
      })
      report.viewports.push({name,width,height,errors,whatsAppCalls:await page.evaluate(()=>window.__waCalls.length)})
      await context.close()
    }
  }

  await check('keyboard submit, pending clipboard and mobile-menu focus recovery',async()=>{
    const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true})
    await context.route('https://wa.me/**',route=>route.abort())
    await context.addInitScript(()=>{
      window.__waCalls=[]
      window.open=url=>{window.__waCalls.push(String(url));return null}
      navigator.clipboard.writeText=()=>new Promise(resolve=>{window.__finishCopy=resolve})
    })
    const page=await context.newPage()
    await page.goto(baseURL,{waitUntil:'networkidle'})
    await page.getByRole('button',{name:'Buka menu'}).tap()
    await page.locator('.minimal-mobile-menu button').tap()
    await page.locator('#inquiry-name').fill('Tim proyek')
    await page.locator('#inquiry-location').fill('Bekasi')
    await page.locator('#inquiry-location').press('Enter')
    assert.equal(await page.evaluate(()=>window.__waCalls.length),1)
    await page.getByRole('button',{name:'Salin Ringkasan',exact:true}).click()
    await page.waitForFunction(()=>typeof window.__finishCopy==='function')
    assert(await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).isDisabled())
    assert.equal(await page.getByRole('button',{name:'Menyalin ringkasan...',exact:true}).getAttribute('aria-busy'),'true')
    await page.screenshot({path:path.join(output,'pending-copy-390.png')})
    await page.locator('#inquiry-location').fill('Bandung')
    assert.equal(await page.locator('#inquiry-summary').count(),0)
    assert(await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).isEnabled())
    await page.evaluate(()=>window.__finishCopy())
    await page.getByRole('button',{name:'Salin Ringkasan',exact:true}).waitFor()
    assert.equal(await page.locator('.inquiry-form__status').innerText(),'')
    await page.keyboard.press('Escape')
    assert(await page.getByRole('button',{name:'Buka menu'}).evaluate(e=>e===document.activeElement))
    assert.equal(await page.evaluate(()=>document.body.style.overflow),'')
    await context.close()
  })

  await check('pending clipboard can be abandoned and late requests cannot unlock a newer copy',async()=>{
    const context=await browser.newContext({viewport:{width:390,height:844}})
    await context.route('https://wa.me/**',route=>route.abort())
    await context.addInitScript(()=>{
      window.__resolvers=[];window.__waCalls=[]
      navigator.clipboard.writeText=()=>new Promise(resolve=>window.__resolvers.push(resolve))
      window.open=url=>{window.__waCalls.push(String(url));return null}
    })
    const page=await context.newPage()
    await page.goto(baseURL,{waitUntil:'networkidle'})
    const trigger=page.locator('.minimal-hero__buttons button')
    await trigger.click()
    await page.locator('#inquiry-name').fill('Tim proyek')
    await page.locator('#inquiry-location').fill('Bekasi')
    await page.getByRole('button',{name:'Salin Ringkasan',exact:true}).click()
    await page.waitForFunction(()=>window.__resolvers.length===1)
    await page.keyboard.press('Escape')
    await trigger.click()
    assert(await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).isEnabled())
    await page.locator('#inquiry-location').fill('Bandung')
    await page.getByRole('button',{name:'Salin Ringkasan',exact:true}).click()
    await page.waitForFunction(()=>window.__resolvers.length===2)
    await page.evaluate(()=>window.__resolvers[0]())
    await page.waitForTimeout(50)
    assert(await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).isDisabled())
    await page.keyboard.press('Escape')
    await trigger.click()
    await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).click()
    const text=await page.locator('#inquiry-summary').inputValue()
    assert(text.includes('Lokasi pekerjaan: Bandung'))
    validateUrl(await page.evaluate(()=>window.__waCalls.at(-1)),text)
    await page.evaluate(()=>window.__resolvers[1]())
    await page.waitForTimeout(50)
    assert((await page.locator('.inquiry-form__status').innerText()).startsWith('Pesan sudah disiapkan.'))
    assert(await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).isEnabled())
    await context.close()
  })

  await check('blocked window.open: native retry navigation is intercepted locally',async()=>{
    const context=await browser.newContext()
    await context.addInitScript(()=>{window.open=()=>{throw new Error('Blocked popup')}})
    await context.route('https://wa.me/**',async route=>{
      report.interceptedNavigations.push(route.request().url())
      await route.fulfill({status:200,contentType:'text/html',body:'<title>Mock WhatsApp</title><p>Local interception only.</p>'})
    })
    const page=await context.newPage()
    await page.goto(baseURL,{waitUntil:'networkidle'})
    await page.locator('.minimal-hero__buttons button').click()
    await page.locator('#inquiry-name').fill('Tim PJP')
    await page.locator('#inquiry-location').fill('Bekasi')
    await page.getByRole('button',{name:'Kirim via WhatsApp',exact:true}).click()
    const [popup]=await Promise.all([context.waitForEvent('page'),page.getByRole('link',{name:'Buka WhatsApp',exact:true}).click()])
    await popup.waitForLoadState('domcontentloaded')
    assert.equal(await popup.title(),'Mock WhatsApp')
    assert.equal(await popup.evaluate(()=>window.opener),null)
    await context.close()
  })
} finally {
  await browser.close()
  await fs.writeFile(path.join(output,'report.json'),JSON.stringify(report,null,2))
}
console.log(`${report.checks.filter(c=>c.pass).length}/${report.checks.length} WhatsApp checks passed; no live WhatsApp requests were allowed`)
if(report.checks.some(c=>!c.pass))process.exitCode=1
