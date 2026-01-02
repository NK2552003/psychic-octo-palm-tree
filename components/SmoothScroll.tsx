"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    // ensure page uses native scrollbar height while we transform the content
    const setBodyHeight = () => {
      document.body.style.height = `${content.getBoundingClientRect().height}px`
    }

    setBodyHeight()

    // proxy ScrollTrigger to use the native scrollbar while we translate the visual content
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (arguments.length && typeof value === "number") window.scrollTo(0, value)
        return window.scrollY
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
      },
    })

    let current = 0
    let target = window.scrollY || 0

    // use gsap quickSetter for best perf
    const setY = gsap.quickSetter(content, "y", "px")

    // adaptive lerp: smaller when movement is small (smooth), larger when movement is large (faster catch-up)
    const minLerp = 0.06
    const maxLerp = 0.32

    const onScroll = () => {
      target = window.scrollY
    }
    window.addEventListener("scroll", onScroll, { passive: true })

    // tick via gsap.ticker for stable frame syncing
    const tick = () => {
      const diff = target - current
      const abs = Math.abs(diff)

      // Snap to target when very close to prevent getting stuck
      if (abs < 0.5) {
        current = target
      } else {
        // map abs delta to [0,1] using a sensible range (500px)
        const t = Math.min(abs / 500, 1)
        const lerp = minLerp + (maxLerp - minLerp) * t

        current += diff * lerp
      }
      
      // round small values to avoid subpixel jitter
      if (Math.abs(current) < 0.01) current = 0

      setY(-Math.round(current * 100) / 100)

      // update ScrollTrigger to keep transforms in sync
      ScrollTrigger.update()
    }

    gsap.ticker.add(tick)

    const onResize = () => setBodyHeight()
    window.addEventListener("resize", onResize)

    ScrollTrigger.addEventListener("refreshInit", setBodyHeight)
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      ScrollTrigger.removeEventListener("refreshInit", setBodyHeight)
      document.body.style.height = ""
      ScrollTrigger.scrollerProxy(document.body, null as any)
    }
  }, [])

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden" }}>
      <div ref={contentRef} style={{ minHeight: "100%", willChange: "transform" }}>
        {children}
      </div>
    </div>
  )
}
