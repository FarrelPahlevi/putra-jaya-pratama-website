export const MOTION = {
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  desktop: { distance: 26, duration: 0.72, stagger: 0.09, clip: 10 },
  tablet: { distance: 18, duration: 0.6, stagger: 0.07, clip: 6 },
  mobile: { distance: 10, duration: 0.44, stagger: 0.045, clip: 0 },
  hero: { duration: 0.78, stagger: 0.075 },
} as const

export const motionProfile = () => window.matchMedia('(min-width: 1200px)').matches
  ? MOTION.desktop
  : window.matchMedia('(min-width: 768px)').matches ? MOTION.tablet : MOTION.mobile
