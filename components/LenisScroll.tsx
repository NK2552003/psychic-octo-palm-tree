'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { isLowPerformanceDevice } from '@/lib/deviceDetection'

export default function LenisScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Check if we should skip Lenis on this device
    const isWindowsChrome = typeof navigator !== 'undefined' && /Windows/.test(navigator.userAgent) && /Chrome/.test(navigator.userAgent)
    const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const isLowPerf = isLowPerformanceDevice()

    // Skip Lenis on Windows Chrome, mobile, or low-tier devices
    if (isWindowsChrome || isMobile || isLowPerf) {
      return
    }

    // Initialize Lenis with smooth scrolling settings
    const lenis = new Lenis({
      duration: 1.2, // Scroll duration in seconds
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for butter-smooth feel
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      syncMethod: 'raf', // Use requestAnimationFrame for best performance
      overscroll: true,
    })

    lenisRef.current = lenis

    // RAF loop for animating scroll
    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Stop Lenis on page unload
    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
