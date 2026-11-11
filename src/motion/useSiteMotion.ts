import { useEffect, useRef } from 'react'
import './motion.css'

export function useSiteMotion() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = root.current
    if (!element) return
    let disposed = false
    let stop: (() => void) | undefined
    // Loading after paint leaves the static page usable even if this chunk fails.
    const frame = requestAnimationFrame(() => {
      import('./siteMotion').then(({ createSiteMotion }) => {
        if (!disposed) stop = createSiteMotion(element)
      }).catch(() => {
        if (!disposed) element.dataset.motionState = 'static'
      })
    })
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      stop?.()
    }
  }, [])

  return root
}
