import { animate } from 'motion/mini'
import { scroll } from 'motion'
import { MOTION, motionProfile } from './tokens'

type Playback = ReturnType<typeof animate>
type Frame = Parameters<typeof animate>[1]
const activeSites = new WeakMap<HTMLElement, () => void>()

export function createSiteMotion(root: HTMLElement) {
  activeSites.get(root)?.()
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  const desktop = window.matchMedia('(min-width: 1200px)')
  const tablet = window.matchMedia('(min-width: 768px)')
  const threeColumns = window.matchMedia('(min-width: 1100px)')
  const twoColumns = window.matchMedia('(min-width: 520px)')
  const queries = [reduced, desktop, tablet, threeColumns, twoColumns]
  let disposeScene = () => {}
  let destroyed = false
  const seen = new WeakSet<Element>()

  const start = () => {
    disposeScene()
    if (destroyed || reduced.matches || !('IntersectionObserver' in window) || !Element.prototype.animate) {
      root.dataset.motionState = 'static'
      return
    }

    const profile = motionProfile()
    const controls = new Map<HTMLElement, Set<Playback>>()
    const originalStyles = new Map<HTMLElement, string | null>()
    const observed = new Set<HTMLElement>()
    const scrollStops: (() => void)[] = []
    let observer: IntersectionObserver | undefined
    let mutations: MutationObserver | undefined
    let stopped = false

    const remember = (element: HTMLElement) => {
      if (!originalStyles.has(element)) originalStyles.set(element, element.getAttribute('style'))
    }
    const play = (element: HTMLElement, frames: Frame, delay = 0, duration: number = profile.duration) => {
      remember(element)
      const animation = animate(element, frames, { duration, delay, ease: MOTION.ease })
      const running = controls.get(element) ?? new Set<Playback>()
      controls.set(element, running)
      running.add(animation)
      animation.then(() => { running.delete(animation) })
      return animation
    }
    const restore = (element: HTMLElement) => {
      controls.get(element)?.forEach(animation => animation.cancel())
      controls.delete(element)
      const original = originalStyles.get(element)
      if (original === null) element.removeAttribute('style')
      else if (original !== undefined) element.setAttribute('style', original)
      originalStyles.delete(element)
    }

    disposeScene = () => {
      stopped = true
      observer?.disconnect()
      mutations?.disconnect()
      scrollStops.forEach(stop => stop())
      originalStyles.forEach((_, element) => restore(element))
      observed.clear()
      delete root.dataset.motionDepth
    }

    const reveal = (element: HTMLElement) => {
      if (seen.has(element) || stopped) return
      seen.add(element)
      const kind = element.dataset.motion
      const order = Number(element.dataset.motionOrder ?? 0)
      const columns = threeColumns.matches ? 3 : twoColumns.matches ? 2 : 1
      const delay = Math.min(order % (kind === 'illustration' ? columns : 4), 2) * profile.stagger
      const distance = profile.distance
      if (kind === 'photo') {
        // Animate the image layer: the enclosing link and its focus outline stay still.
        const image = element.querySelector<HTMLElement>('img')
        if (image) play(image, {
          clipPath: [`inset(${profile.clip}% 0 0 0)`, 'inset(0% 0 0 0)'],
          scale: [desktop.matches ? 1.045 : 1.015, 1],
          opacity: [0.85, 1],
        }, delay)
      } else if (kind === 'illustration') {
        play(element, { transform: [`translateY(${distance}px) scale(0.96)`, 'translateY(0px) scale(1)'], opacity: [0.75, 1] }, delay)
      } else if (kind === 'line') {
        play(element, { transform: ['scaleX(0.65)', 'scaleX(1)'], opacity: [0.7, 1] }, delay)
      } else if (kind === 'title') {
        play(element, {
          transform: [`translateY(${distance * 0.55}px)`, 'translateY(0px)'],
          clipPath: [`inset(0 0 ${profile.clip}% 0)`, 'inset(0 0 0% 0)'],
          opacity: [0.85, 1],
        }, 0)
      } else {
        play(element, { transform: [`translateY(${distance * (kind === 'settle' ? 0.35 : 0.6)}px)`, 'translateY(0px)'], opacity: [0.8, 1] }, delay)
      }
    }

    try {
      observer = new IntersectionObserver(entries => {
        try {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return
            observer?.unobserve(entry.target)
            observed.delete(entry.target as HTMLElement)
            reveal(entry.target as HTMLElement)
          })
        } catch {
          disposeScene()
          root.dataset.motionState = 'static'
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -3% 0px' })

      const refresh = () => {
        observed.forEach(element => {
          if (!root.contains(element)) { observer?.unobserve(element); observed.delete(element) }
        })
        originalStyles.forEach((_, element) => { if (!root.contains(element)) restore(element) })
        root.querySelectorAll<HTMLElement>('[data-motion]').forEach(element => {
          if (!seen.has(element) && !observed.has(element)) {
            observed.add(element)
            observer?.observe(element)
          }
        })
      }
      refresh()
      mutations = new MutationObserver(refresh)
      mutations.observe(root.querySelector('main') ?? root, { childList: true, subtree: true })

      const hero = root.querySelector<HTMLElement>('.minimal-hero')
      if (hero && !seen.has(hero) && hero.getBoundingClientRect().bottom > 0 && window.scrollY < 80) {
        seen.add(hero)
        hero.querySelectorAll<HTMLElement>('[data-hero-line]').forEach((line, index) => {
          play(line, { transform: [`translateY(${profile.distance}px)`, 'translateY(0px)'], clipPath: ['inset(0 0 14% 0)', 'inset(0 0 0% 0)'] }, index * MOTION.hero.stagger, MOTION.hero.duration)
        })
        hero.querySelectorAll<HTMLElement>('[data-hero-support]').forEach((element, index) => {
          play(element, { transform: ['translateY(8px)', 'translateY(0px)'], opacity: [0.9, 1] }, index * 0.06, profile.duration)
        })
      }

      const depth = (target: HTMLElement, image: HTMLElement, amount: string, scale: number, offset: ['start start' | 'start end', 'end start']) => {
        remember(image)
        const animation = animate(image, {
          transform: [`translateY(-${amount}) scale(${scale})`, `translateY(${amount}) scale(${scale})`],
        }, { duration: 1, ease: 'linear' })
        controls.set(image, new Set([animation]))
        scrollStops.push(scroll(animation, { target, offset }))
      }
      if (tablet.matches) {
        const heroImage = hero?.querySelector<HTMLElement>('.minimal-hero__image')
        if (hero && heroImage) depth(hero, heroImage, desktop.matches ? '1.8%' : '0.8%', 1.045, ['start start', 'end start'])
      }
      if (desktop.matches) {
        const story = root.querySelector<HTMLElement>('.minimal-story')
        const image = story?.querySelector<HTMLElement>('.minimal-story__image img')
        if (story && image) depth(story, image, '1.8%', 1.07, ['start end', 'end start'])
        root.dataset.motionDepth = 'desktop'
      }
      root.dataset.motionState = 'active'
    } catch {
      disposeScene()
      root.dataset.motionState = 'static'
    }
  }

  queries.forEach(query => query.addEventListener('change', start))
  start()
  const cleanup = () => {
    if (destroyed) return
    destroyed = true
    queries.forEach(query => query.removeEventListener('change', start))
    disposeScene()
    delete root.dataset.motionState
    if (activeSites.get(root) === cleanup) activeSites.delete(root)
  }
  activeSites.set(root, cleanup)
  return cleanup
}
