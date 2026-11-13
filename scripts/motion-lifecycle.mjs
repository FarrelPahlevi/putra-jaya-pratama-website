import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(path.resolve('../PJP-Website-tools/package.json'))
const { chromium } = require('playwright')
const baseURL = process.env.PJP_QA_URL || 'http://127.0.0.1:4173'
const motionChunk = (await fs.readdir('dist/assets')).find(name => /^siteMotion-.*\.js$/.test(name))
assert(motionChunk)
const output = path.resolve(process.env.PJP_QA_OUTPUT || 'docs/motion-20261111', 'motion')
await fs.mkdir(output, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const checks = []
const profiles = []
let subscriptionEvidence
const check = async (name, action) => {
  try { await action(); checks.push({ name, pass: true }); console.log('PASS ' + name) }
  catch (error) { checks.push({ name, pass: false, error: error.message }); console.log('FAIL ' + name + ': ' + error.message) }
}

function trackSubscriptions() {
  const intersections = []
  const mutations = []
  const mediaListeners = new Map()
  const NativeIntersection = window.IntersectionObserver
  const NativeMutation = window.MutationObserver
  window.IntersectionObserver = class extends NativeIntersection {
    constructor(...args) { super(...args); this.targets = new Set(); intersections.push(this) }
    observe(target) { this.targets.add(target); return super.observe(target) }
    unobserve(target) { this.targets.delete(target); return super.unobserve(target) }
    disconnect() { this.targets.clear(); return super.disconnect() }
  }
  window.MutationObserver = class extends NativeMutation {
    constructor(...args) { super(...args); this.active = false; this.origin = new Error().stack; mutations.push(this) }
    observe(...args) { this.active = true; this.target = args[0]?.nodeName; return super.observe(...args) }
    disconnect() { this.active = false; return super.disconnect() }
  }
  const add = EventTarget.prototype.addEventListener
  const remove = EventTarget.prototype.removeEventListener
  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (this instanceof MediaQueryList && type === 'change') {
      if (!mediaListeners.has(this)) mediaListeners.set(this, new Set())
      mediaListeners.get(this).add(listener)
    }
    return add.call(this, type, listener, options)
  }
  EventTarget.prototype.removeEventListener = function (type, listener, options) {
    if (this instanceof MediaQueryList && type === 'change') mediaListeners.get(this)?.delete(listener)
    return remove.call(this, type, listener, options)
  }
  window.__liveSubscriptions = () => ({
    intersectionTargets: intersections.reduce((sum, observer) => sum + observer.targets.size, 0),
    mutationObservers: mutations.filter(observer => observer.active && !observer.origin?.includes('InjectedScript._setupGlobalListenersRemovalDetection')).length,
    mediaListeners: [...mediaListeners.values()].reduce((sum, listeners) => sum + listeners.size, 0),
  })
  window.__observerDetails = () => mutations.filter(observer => observer.active).map(observer => ({ target: observer.target, origin: observer.origin }))
}

try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  await context.addInitScript(trackSubscriptions)
  const page = await context.newPage()
  await page.route('**/motion-fixture', route => route.fulfill({ contentType: 'text/html', body: `<!doctype html><html><body style="margin:0"><div id="fixture"><main><section class="minimal-hero" style="height:900px;overflow:hidden;position:relative"><img class="minimal-hero__image" style="width:100%;height:100%;object-fit:cover" src="/assets/pjp-preview/asphalt-access-preview.webp" alt="Jalan"><h1 data-motion="title">PJP</h1></section><section style="height:1800px"><h2 data-motion="title">Layanan</h2></section></main></div></body></html>` }))
  await page.goto(baseURL + '/motion-fixture')
  await page.evaluate(async url => {
    const module = await import(url)
    window.__createMotion = Object.values(module).find(value => typeof value === 'function')
    window.__motionRoot = document.getElementById('fixture')
  }, baseURL + '/assets/' + motionChunk)
  // Prime Playwright's main-world runtime; its observer is identified separately.
  await page.locator('#fixture').evaluate(element => element.id)
  const subscriptionBaseline = await page.evaluate(() => window.__liveSubscriptions())
  await check('duplicate initialization replaces the previous scene', async () => {
    const count = await page.evaluate(() => {
      window.__stopOne = window.__createMotion(window.__motionRoot)
      window.__stopTwo = window.__createMotion(window.__motionRoot)
      return document.getAnimations().filter(a => a.effect?.target?.matches('.minimal-hero__image')).length
    })
    assert.equal(count, 1)
  })
  await check('stale cleanup does not stop the replacement scene', async () => {
    await page.evaluate(() => window.__stopOne())
    assert.equal(await page.locator('#fixture').getAttribute('data-motion-state'), 'active')
    assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.effect?.target?.matches('.minimal-hero__image')).length), 1)
  })
  await check('unmount cleanup removes animations and restores original inline styles', async () => {
    await page.waitForTimeout(1000)
    await page.evaluate(() => window.__stopTwo())
    assert.equal(await page.evaluate(() => document.getAnimations().length), 0)
    assert.equal(await page.locator('#fixture').getAttribute('data-motion-state'), null)
    assert.equal(await page.locator('.minimal-hero__image').evaluate(e => e.style.transform), '')
    assert.equal(await page.locator('.minimal-hero__image').evaluate(e => e.style.objectFit), 'cover')
    await page.setViewportSize({ width: 390, height: 844 })
    await page.waitForTimeout(100)
    assert.equal(await page.locator('#fixture').getAttribute('data-motion-state'), null)
  })
  await check('twenty mount/unmount cycles leave no animation effects', async () => {
    await page.setViewportSize({ width: 1440, height: 900 })
    const count = await page.evaluate(() => {
      for (let i = 0; i < 20; i++) window.__createMotion(window.__motionRoot)()
      return document.getAnimations().length
    })
    assert.equal(count, 0)
  })
  await check('observer targets, mutation observers and media listeners are released after repeated mounts', async () => {
    const subscriptions = await page.evaluate(() => window.__liveSubscriptions())
    assert.deepEqual(subscriptions, subscriptionBaseline, JSON.stringify(await page.evaluate(() => window.__observerDetails())))
    await page.evaluate(() => {
      for (let i = 0; i < 30; i++) window.__createMotion(window.__motionRoot)()
    })
    assert.deepEqual(await page.evaluate(() => window.__liveSubscriptions()), subscriptions)
    subscriptionEvidence = { baseline: subscriptionBaseline, afterFiftyCycles: await page.evaluate(() => window.__liveSubscriptions()), remainingObservers: await page.evaluate(() => window.__observerDetails()) }
  })
  await check('missing Intersection Observer falls back to visible static content', async () => {
    await page.evaluate(() => {
      delete window.IntersectionObserver
      window.__stopThree = window.__createMotion(window.__motionRoot)
    })
    assert.equal(await page.locator('#fixture').getAttribute('data-motion-state'), 'static')
    assert(await page.locator('h1').isVisible())
    assert.equal(await page.evaluate(() => document.getAnimations().length), 0)
    await page.evaluate(() => window.__stopThree())
  })
  await context.close()

  await check('short desktop and height-only resize keep the hero image covering its frame', async () => {
    const shortContext = await browser.newContext({ viewport: { width: 1440, height: 600 } })
    const shortPage = await shortContext.newPage()
    await shortPage.goto(baseURL, { waitUntil: 'networkidle' })
    for (const height of [600,900,500,1080]) {
      await shortPage.setViewportSize({ width: 1440, height })
      for (const progress of [0,0.5,0.9]) {
        await shortPage.evaluate(progress => window.scrollTo({ top: document.querySelector('.minimal-hero').offsetHeight * progress, behavior: 'instant' }), progress)
        await shortPage.waitForTimeout(100)
        const coverage = await shortPage.evaluate(() => {
          const hero = document.querySelector('.minimal-hero').getBoundingClientRect()
          const image = document.querySelector('.minimal-hero__image').getBoundingClientRect()
          return { top: image.top <= hero.top + 1, bottom: image.bottom >= hero.bottom - 1, left: image.left <= hero.left + 1, right: image.right >= hero.right - 1 }
        })
        assert(Object.values(coverage).every(Boolean), JSON.stringify({ height, progress, coverage }))
      }
    }
    await shortContext.close()
  })

  for (const width of [390,1440]) {
    const profileContext = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'no-preference' })
    const profilePage = await profileContext.newPage()
    await profilePage.addInitScript(() => {
      window.__performance = { cls: 0, lcp: null, longTasks: [] }
      new PerformanceObserver(list => list.getEntries().forEach(e => { if (!e.hadRecentInput) window.__performance.cls += e.value })).observe({ type: 'layout-shift', buffered: true })
      new PerformanceObserver(list => list.getEntries().forEach(e => { window.__performance.lcp = e.startTime })).observe({ type: 'largest-contentful-paint', buffered: true })
      new PerformanceObserver(list => list.getEntries().forEach(e => window.__performance.longTasks.push({ start: e.startTime, duration: e.duration }))).observe({ type: 'longtask', buffered: true })
    })
    const session = await profileContext.newCDPSession(profilePage)
    await session.send('Emulation.setCPUThrottlingRate', { rate: 4 })
    await profilePage.goto(baseURL, { waitUntil: 'networkidle' })
    await profilePage.waitForFunction(() => document.querySelector('.minimal-site')?.dataset.motionState === 'active')
    await profilePage.evaluate(() => document.fonts.ready)
    const metrics = await profilePage.evaluate(async () => {
      const intervals = []
      const begin = performance.now()
      let previous = begin
      const total = document.documentElement.scrollHeight - innerHeight
      await new Promise(resolve => {
        function frame(now) {
          intervals.push(now - previous)
          previous = now
          const progress = Math.min((now - begin) / 6000, 1)
          window.scrollTo({ top: total * (progress < 0.5 ? progress * 2 : (1 - progress) * 2), behavior: 'instant' })
          if (progress < 1) requestAnimationFrame(frame)
          else resolve()
        }
        requestAnimationFrame(frame)
      })
      intervals.shift()
      const sorted = [...intervals].sort((a,b) => a-b)
      return {
        ...window.__performance,
        frames: intervals.length,
        medianFrameMs: sorted[Math.floor(sorted.length * 0.5)],
        p95FrameMs: sorted[Math.floor(sorted.length * 0.95)],
        framesOver50ms: intervals.filter(value => value > 50).length,
        scrollLongTasks: window.__performance.longTasks.filter(task => task.start >= begin),
        overflow: document.documentElement.scrollWidth > innerWidth,
      }
    })
    profiles.push({ width, height: 900, cpuSlowdown: 4, ...metrics })
    await check(`CPU 4x ${width}: forward/reverse scroll stays usable without overflow`, async () => {
      assert.equal(metrics.overflow, false)
      assert(await profilePage.locator('.minimal-hero__buttons button').isEnabled())
      assert(metrics.frames > 100)
    })
    await session.detach()
    await profileContext.close()
  }
} finally {
  await browser.close()
  await fs.writeFile(path.join(output, 'lifecycle-performance.json'), JSON.stringify({ checks, subscriptionEvidence, profiles, limitation: 'Single local headless Chrome sample with 4x CPU slowdown; network unthrottled. rAF samples are diagnostics, not a field FPS/CWV guarantee.' }, null, 2))
}
console.log(`${checks.filter(c=>c.pass).length}/${checks.length} checks passed`)
if (checks.some(c=>!c.pass)) process.exitCode = 1
