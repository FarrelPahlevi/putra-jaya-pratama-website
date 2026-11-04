import { useReducedMotion } from 'motion/react'
import type { Transition } from 'motion/react'

export function useMotionConfig() {
  const shouldReduceMotion = useReducedMotion()

  const transition: Transition = {
    duration: shouldReduceMotion ? 0.1 : 0.45,
    ease: 'easeOut',
  }

  return {
    shouldReduceMotion,
    fadeInUp: {
      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition,
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: shouldReduceMotion ? 0.1 : 0.35 },
    },
    staggerItem: (index: number = 0) => ({
      initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-40px' },
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.08,
        ease: 'easeOut',
      } as Transition,
    }),
  }
}
