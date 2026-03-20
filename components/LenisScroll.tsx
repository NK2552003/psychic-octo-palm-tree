'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { shouldDisableLenisScroll } from '@/lib/deviceDetection'

export default function LenisScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Check if we should skip Lenis on this device
    const shouldDisable = shouldDisableLenisScroll()

    // Skip Lenis if detection says so
    if (shouldDisable) {
      return
    }

    // Initialize Lenis with smooth scrolling settings
    const lenis = new Lenis({
      duration: 1.2, // Scroll duration in seconds
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for butter-smooth feel
    } as any)

    lenisRef.current = lenis

    // RAF loop for animating scroll
    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Stop Lenis on page unload
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
