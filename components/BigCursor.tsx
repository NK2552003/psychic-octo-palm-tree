"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

const MOBILE_RE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const EASING = 0.12 // RAF easing factor for smooth lag
const SCROLL_EASING = 0.15 // Additional easing for scroll effects

function getThemeProps(theme: "light" | "dark", reducedOpacity = false) {
  const opacityFactor = reducedOpacity ? 0.4 : 1
  
  if (theme === "dark") {
    return {
      border: `1.25px solid rgba(245, 247, 248, ${0.85 * opacityFactor})`,
      shadowColor: `rgba(245, 247, 248, ${0.8 * opacityFactor})`,
      hoverBorder: "10px solid rgba(245, 247, 248, 0.7)",
      bg: "rgba(255, 255, 255, 0.04)",
    }
  }

  return {
    border: `1.25px solid rgba(17, 25, 32, ${0.8 * opacityFactor})`,
    shadowColor: `rgba(17, 25, 32, ${0.8 * opacityFactor})`,
    hoverBorder: "10px solid rgba(0, 143, 135, 0.35)",
    bg: "rgba(17, 25, 32, 0.25)",
  }
}

export default function BigCursor() {
  const { resolvedTheme } = useTheme()
  const themePropsRef = useRef(getThemeProps(resolvedTheme === "dark" ? "dark" : "light"))
  const cursorRef = useRef<HTMLElement | null>(null)

  // Update theme props when resolvedTheme changes
  useEffect(() => {
    themePropsRef.current = getThemeProps(resolvedTheme === "dark" ? "dark" : "light")
    if (cursorRef.current) {
      const props = themePropsRef.current
      cursorRef.current.style.backgroundColor = props.bg
      cursorRef.current.style.border = props.border
      cursorRef.current.style.boxShadow = `0 -15px 0 -8px transparent, 0 0 0 1px ${props.shadowColor}`
    }
  }, [resolvedTheme])

  // Listen for custom theme toggle events from FloatingControls
  useEffect(() => {
    const handleThemeToggle = () => {
      // Get current theme from DOM
      const isDark = document.documentElement.classList.contains("dark")
      themePropsRef.current = getThemeProps(isDark ? "dark" : "light")
      if (cursorRef.current) {
        const props = themePropsRef.current
        cursorRef.current.style.backgroundColor = props.bg
        cursorRef.current.style.border = props.border
        cursorRef.current.style.boxShadow = `0 -15px 0 -8px transparent, 0 0 0 1px ${props.shadowColor}`
      }
    }

    window.addEventListener("theme-toggled", handleThemeToggle)
    return () => window.removeEventListener("theme-toggled", handleThemeToggle)
  }, [])

  useEffect(() => {
    const CURSOR_SIZE = 20
    if (typeof window === "undefined" || MOBILE_RE.test(navigator.userAgent)) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const root = document.body
    const themeProps = themePropsRef.current

    // Check if cursor already exists
    const existingCursor = document.querySelector(".curzr") as HTMLElement | null
    if (existingCursor) {
      cursorRef.current = existingCursor
      return
    }

    // Ensure cursor is hidden globally
    document.documentElement.style.cursor = "none !important"
    root.style.cursor = "none !important"
    root.classList.add("curzr-enabled")

    let styleTag = document.getElementById("curzr-style") as HTMLStyleElement | null
    if (!styleTag) {
      styleTag = document.createElement("style")
      styleTag.id = "curzr-style"
      styleTag.textContent = `
        * {
          cursor: none !important;
        }
        body,
        body *,
        html,
        html * {
          cursor: none !important;
        }
        :root {
          cursor: none !important;
        }
        .curzr-enabled,
        .curzr-enabled * {
          cursor: none !important;
        }
        .curzr-enabled input[type="text"],
        .curzr-enabled input[type="email"],
        .curzr-enabled input[type="password"],
        .curzr-enabled textarea,
        .curzr-enabled [contenteditable] {
          cursor: text !important;
        }
        /* Ensure text selection doesn't show default cursor */
        .curzr-enabled::selection {
          background-color: inherit;
        }
        .curzr-enabled *::selection {
          background-color: inherit;
        }
        /* Force no cursor on all interactive elements */
        button, a, input, textarea, [role="button"] {
          cursor: none !important;
        }
      `
      document.head.appendChild(styleTag)
    }

    const cursor = document.createElement("div")
    cursor.className = "curzr"
    cursorRef.current = cursor

    Object.assign(cursor.style, {
      boxSizing: "border-box",
      position: "fixed",
      top: "0",
      left: "0",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: themeProps.bg,
      border: themeProps.border,
      boxShadow: `0 -15px 0 -8px transparent, 0 0 0 1px ${themeProps.shadowColor}`,
      pointerEvents: "none",
      userSelect: "none",
      zIndex: "2147483647",
      opacity: "0",
      transition: "transform 180ms cubic-bezier(0.18,0.89,0.32,1.28), border 180ms ease, box-shadow 160ms ease, opacity 150ms ease, width 140ms ease, height 140ms ease",
      willChange: "transform, box-shadow, opacity, width, height",
      transform: "translate3d(-10px, -10px, 0)",
    })

    root.appendChild(cursor)

    let position = {
      pointerX: 0,
      pointerY: 0,
      easedX: 0,
      easedY: 0,
      prevX: 0,
      prevY: 0,
      prevAngle: 0,
      angleDisplace: 0,
      distance: 0,
      scrollVelocity: 0,
      lastScrollY: 0,
    }

    let fading = false
    let rafId: number | null = null
    let lastX = 0,
      lastY = 0
    let isInteractive = false
    let hoverScale = 1
    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout | null = null

    const calcAngle = (dx: number, dy: number) => {
      const absX = Math.abs(dx)
      const absY = Math.abs(dy)
      const degrees = 57.296
      const unsorted = Math.atan(absY / (absX || 1e-6)) * degrees
      let angle = position.prevAngle

      if (dx <= 0 && dy >= 0) angle = 90 - unsorted
      else if (dx < 0 && dy < 0) angle = unsorted + 90
      else if (dx >= 0 && dy <= 0) angle = 90 - unsorted + 180
      else if (dx > 0 && dy > 0) angle = unsorted + 270

      if (!Number.isFinite(angle)) angle = position.prevAngle

      const diff = angle - position.prevAngle
      if (diff <= -270) position.angleDisplace += 360 + diff
      else if (diff >= 270) position.angleDisplace += diff - 360
      else position.angleDisplace += diff

      position.prevAngle = angle
      return position.angleDisplace
    }

    const updateCursorDisplay = () => {
      const dx = position.prevX - position.easedX
      const dy = position.prevY - position.easedY
      
      // Combine hover scale with scroll-based stretch
      let scale = hoverScale
      const scrollStretch = Math.min(Math.abs(position.scrollVelocity) * 0.08, 1.2)
      scale *= (1 + scrollStretch)
      
      const rotate = calcAngle(dx, dy)
      
      // Use reduced opacity border during scroll
      const scrollThreshold = 0.5
      const useReducedOpacity = Math.abs(position.scrollVelocity) > scrollThreshold
      const props = useReducedOpacity 
        ? getThemeProps(themePropsRef.current.shadowColor.includes("245") ? "dark" : "light", true)
        : themePropsRef.current

      cursor.style.transform = `translate3d(${position.easedX - CURSOR_SIZE / 2}px, ${position.easedY - CURSOR_SIZE / 2}px, 0) rotate(${rotate}deg) scale(${scale})`
      cursor.style.border = isInteractive ? props.hoverBorder : props.border
      
      // Enhanced shadow with scroll effect
      const shadowOffset = 15 + position.distance + (Math.abs(position.scrollVelocity) * 0.3)
      cursor.style.boxShadow = `0 ${-shadowOffset}px 0 -8px ${props.shadowColor}, 0 0 0 1px ${props.shadowColor}`

      if (!fading && isScrolling) {
        fading = true
        window.setTimeout(() => {
          const currentProps = themePropsRef.current
          cursor.style.boxShadow = `0 -15px 0 -8px transparent, 0 0 0 1px ${currentProps.shadowColor}`
          fading = false
        }, 80)
      }

      if (cursor.style.opacity !== "1") cursor.style.opacity = "1"
    }

    const motivationLoop = () => {
      position.prevX = position.easedX
      position.prevY = position.easedY

      position.easedX += (position.pointerX - position.easedX) * EASING
      position.easedY += (position.pointerY - position.easedY) * EASING

      // Smooth out scroll velocity
      position.scrollVelocity *= 0.92

      const dx = lastX - position.easedX
      const dy = lastY - position.easedY
      position.distance = Math.hypot(dx, dy)

      lastX = position.easedX
      lastY = position.easedY

      updateCursorDisplay()
      rafId = requestAnimationFrame(motivationLoop)
    }

    const moveHandler = (event: MouseEvent) => {
      position.pointerX = event.pageX + root.getBoundingClientRect().x
      position.pointerY = event.pageY + root.getBoundingClientRect().y

      const target = event.target
      const hasHoverClass = target instanceof Element && target.classList.contains("curzr-hover")
      
      isInteractive =
        target instanceof HTMLElement &&
        (target.localName === "button" ||
          target.localName === "a" ||
          target.onclick !== null ||
          hasHoverClass ||
          target.localName === "input" ||
          target.localName === "textarea" ||
          target.getAttribute("role") === "button" ||
          target.closest("button") !== null ||
          target.closest("a") !== null)

      hoverScale = isInteractive ? 1.5 : 1

      if (!rafId) rafId = requestAnimationFrame(motivationLoop)
    }

    const scrollHandler = () => {
      const currentScrollY = window.scrollY
      const newVelocity = currentScrollY - position.lastScrollY
      position.scrollVelocity = newVelocity
      position.lastScrollY = currentScrollY
      isScrolling = true

      // Clear previous timeout
      if (scrollTimeout) clearTimeout(scrollTimeout)
      
      // Set timeout to stop scroll effect after scrolling ends
      scrollTimeout = setTimeout(() => {
        isScrolling = false
        position.scrollVelocity = 0
      }, 100)
    }

    const clickHandler = () => {
      const base = cursor.style.transform
      cursor.style.transform = `${base} scale(0.75)`
      window.setTimeout(() => {
        cursor.style.transform = base
      }, 75)
    }

    // Re-ensure cursor is visible on visibility change
    const visibilityHandler = () => {
      if (!document.hidden) {
        document.documentElement.style.cursor = "none !important"
        root.style.cursor = "none !important"
        cursor.style.opacity = "1"
      }
    }

    // Ensure cursor stays visible and hidden cursor is enabled
    const focusHandler = () => {
      document.documentElement.style.cursor = "none !important"
      root.style.cursor = "none !important"
      if (cursor) cursor.style.opacity = "1"
    }

    // Keep enforcing cursor: none
    const enforceNoCursor = setInterval(() => {
      document.documentElement.style.cursor = "none !important"
      root.style.cursor = "none !important"
      // Also enforce on all elements
      document.querySelectorAll("*").forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.cursor = "none !important"
        }
      })
    }, 300)

    const pointerHandler = (event: PointerEvent) => {
      document.documentElement.style.cursor = "none !important"
      root.style.cursor = "none !important"
    }

    const dragHandler = (event: DragEvent) => {
      document.documentElement.style.cursor = "none !important"
      root.style.cursor = "none !important"
    }

    const mouseEnterHandler = () => {
      document.documentElement.style.cursor = "none !important"
      root.style.cursor = "none !important"
    }

    const globalMouseHandler = () => {
      document.documentElement.style.cursor = "none !important"
      root.style.cursor = "none !important"
    }

    window.addEventListener("mousemove", moveHandler)
    window.addEventListener("click", clickHandler)
    window.addEventListener("scroll", scrollHandler, { passive: true })
    window.addEventListener("visibilitychange", visibilityHandler)
    window.addEventListener("focus", focusHandler)
    window.addEventListener("pointerdown", pointerHandler)
    window.addEventListener("pointerup", pointerHandler)
    window.addEventListener("pointermove", pointerHandler)
    window.addEventListener("dragstart", dragHandler)
    window.addEventListener("drag", dragHandler)
    window.addEventListener("dragend", dragHandler)
    window.addEventListener("mouseenter", mouseEnterHandler)
    window.addEventListener("mouseover", globalMouseHandler)
    document.addEventListener("mouseover", focusHandler)
    document.addEventListener("mouseenter", mouseEnterHandler)
    document.addEventListener("mousemove", globalMouseHandler, { capture: true })

    // Start animation loop
    rafId = requestAnimationFrame(motivationLoop)

    return () => {
      window.removeEventListener("mousemove", moveHandler)
      window.removeEventListener("click", clickHandler)
      window.removeEventListener("scroll", scrollHandler)
      window.removeEventListener("visibilitychange", visibilityHandler)
      window.removeEventListener("focus", focusHandler)
      window.removeEventListener("pointerdown", pointerHandler)
      window.removeEventListener("pointerup", pointerHandler)
      window.removeEventListener("pointermove", pointerHandler)
      window.removeEventListener("dragstart", dragHandler)
      window.removeEventListener("drag", dragHandler)
      window.removeEventListener("dragend", dragHandler)
      window.removeEventListener("mouseenter", mouseEnterHandler)
      window.removeEventListener("mouseover", globalMouseHandler)
      document.removeEventListener("mouseover", focusHandler)
      document.removeEventListener("mouseenter", mouseEnterHandler)
      document.removeEventListener("mousemove", globalMouseHandler, { capture: true } as any)
      
      if (rafId) cancelAnimationFrame(rafId)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      clearInterval(enforceNoCursor)
      
      cursor.remove()
      document.documentElement.style.cursor = ""
      root.style.cursor = ""
      root.classList.remove("curzr-enabled")
    }
  }, [])

  return null
}
