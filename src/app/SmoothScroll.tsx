import { useEffect } from 'react'
import Lenis from 'lenis'

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.08,
      syncTouch: false,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}
