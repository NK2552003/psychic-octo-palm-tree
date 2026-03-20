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
      
      // Update arrow color
      const arrowPath = document.querySelector(".curzr-scroll-arrow path") as SVGPathElement | null
      if (arrowPath) {
        const strokeColor = themePropsRef.current.shadowColor.match(/rgba?\([^)]+\)/)?.[0] || "currentColor"
        arrowPath.setAttribute("stroke", strokeColor)
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
        *:hover {
          cursor: none !important;
        }
        *:active {
          cursor: none !important;
        }
        html {
          cursor: none !important;
        }
        body {
          cursor: none !important;
        }
        input[type="text"],
        input[type="email"],
        input[type="password"],
        textarea,
        [contenteditable] {
          cursor: text !important;
        }
        ::selection {
          background-color: inherit;
        }
        *::selection {
          background-color: inherit;
        }
        button, a, input, textarea, [role="button"], [role="link"], li, .icon-entry {
          cursor: none !important;
        }
        button:hover, a:hover {
          cursor: none !important;
        }
        /* Force cursor none on all elements globally */
        ::-webkit-scrollbar-thumb {
          cursor: default;
        }
        /* Ensure SVG and image elements never show cursor */
        svg, img {
          cursor: none !important;
        }
        svg:hover, img:hover {
          cursor: none !important;
        }
        /* Ensure overlay and fixed elements don't show cursor */
        .curzr, .curzr-scroll-arrow {
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
      transition: "transform 240ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border 180ms ease, box-shadow 160ms ease, opacity 150ms ease, width 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94), height 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      willChange: "transform, box-shadow, opacity, width, height",
      transform: "translate3d(-10px, -10px, 0)",
    })

    // Create scroll direction indicator arrow
    const scrollArrow = document.createElement("div")
    scrollArrow.className = "curzr-scroll-arrow"
    Object.assign(scrollArrow.style, {
      position: "fixed",
      width: "12px",
      height: "12px",
      pointerEvents: "none",
      userSelect: "none",
      zIndex: "2147483646",
      opacity: "0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "opacity 150ms ease, transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      willChange: "opacity, transform",
    })

    // SVG Arrow
    const arrowSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    arrowSvg.setAttribute("viewBox", "0 0 24 24")
    arrowSvg.setAttribute("width", "12")
    arrowSvg.setAttribute("height", "12")
    arrowSvg.setAttribute("fill", "none")
    arrowSvg.setAttribute("stroke", themePropsRef.current.shadowColor.match(/rgba?\([^)]+\)/)?.[0] || "currentColor")
    arrowSvg.setAttribute("stroke-width", "2.5")
    arrowSvg.setAttribute("stroke-linecap", "round")
    arrowSvg.setAttribute("stroke-linejoin", "round")
    
    const arrowPath = document.createElementNS("http://www.w3.org/2000/svg", "path")
    arrowPath.setAttribute("d", "M12 5v14m0 0l-7-7m7 7l7-7")
    arrowSvg.appendChild(arrowPath)
    scrollArrow.appendChild(arrowSvg)

    root.appendChild(cursor)
    root.appendChild(scrollArrow)

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
      scrollDirection: 0, // 1 for down, -1 for up
      arrowScale: 0, // 0 to 1
      easedArrowScale: 0,
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
      
      // Smoother zoom with elastic easing
      let scale = hoverScale
      const scrollMagnitude = Math.abs(position.scrollVelocity)
      const smoothScrollStretch = Math.min(scrollMagnitude * 0.06, 1.0) // Reduced and smoother
      scale *= (1 + smoothScrollStretch)
      
      const rotate = calcAngle(dx, dy)
      
      // Use reduced opacity border during scroll
      const scrollThreshold = 0.5
      const useReducedOpacity = Math.abs(position.scrollVelocity) > scrollThreshold
      const props = useReducedOpacity 
        ? getThemeProps(themePropsRef.current.shadowColor.includes("245") ? "dark" : "light", true)
        : themePropsRef.current

      // Inverse circle styling for interactive elements
      if (isInteractive) {
        const bgColor = themePropsRef.current.shadowColor.includes("245") ? "dark" : "light"
        const borderColor = themePropsRef.current.shadowColor.match(/rgba?\([^)]+\)/)?.[0] || "currentColor"
        const inverseColor = borderColor.replace(/[\d.]+\)/, '0.3)')
        
        cursor.style.backgroundColor = "transparent"
        cursor.style.border = `2px solid ${borderColor}`
        cursor.style.width = "28px"
        cursor.style.height = "28px"
        cursor.style.boxShadow = `inset 0 0 0 3px ${inverseColor}`
      } else {
        const props = useReducedOpacity 
          ? getThemeProps(themePropsRef.current.shadowColor.includes("245") ? "dark" : "light", true)
          : themePropsRef.current
          
        cursor.style.width = "20px"
        cursor.style.height = "20px"
        cursor.style.backgroundColor = props.bg
        cursor.style.border = props.border
        
        // Enhanced shadow with scroll effect
        const shadowOffset = 15 + position.distance + (Math.abs(position.scrollVelocity) * 0.3)
        cursor.style.boxShadow = `0 ${-shadowOffset}px 0 -8px ${props.shadowColor}, 0 0 0 1px ${props.shadowColor}`
      }

      // Calculate cursor offset based on size
      const cursorOffset = isInteractive ? 14 : 10
      
      // Smooth scale animation for cursor
      cursor.style.transform = `translate3d(${position.easedX - cursorOffset}px, ${position.easedY - cursorOffset}px, 0) rotate(${rotate}deg) scale(${scale})`

      // Update scroll arrow position and rotation
      if (isScrolling && Math.abs(position.scrollVelocity) > 0.5) {
        // Smooth easing for arrow scale
        position.easedArrowScale += (position.arrowScale - position.easedArrowScale) * 0.15
        
        const arrowOpacity = Math.min(position.easedArrowScale, 1)
        scrollArrow.style.opacity = arrowOpacity.toString()
        
        // Position arrow above/below cursor based on scroll direction
        const arrowDistance = 22 + (position.easedArrowScale * 8)
        const arrowX = position.easedX - 6 // Center the 12px arrow
        const arrowY = position.scrollVelocity > 0 
          ? position.easedY + arrowDistance  // Scroll down - arrow below
          : position.easedY - arrowDistance  // Scroll up - arrow above
        
        // Rotate arrow based on scroll direction
        const arrowRotation = position.scrollVelocity > 0 ? 0 : 180
        
        // Scale arrow based on scroll velocity
        const arrowScaleValue = 0.8 + Math.min(Math.abs(position.scrollVelocity) * 0.15, 0.6)
        
        scrollArrow.style.transform = `translate3d(${arrowX}px, ${arrowY}px, 0) rotate(${arrowRotation}deg) scale(${arrowScaleValue})`
      } else {
        // Fade out arrow
        position.easedArrowScale += (0 - position.easedArrowScale) * 0.12
        scrollArrow.style.opacity = Math.max(position.easedArrowScale, 0).toString()
      }

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

      // Immediately ensure cursor is visible and hidden globally - AGGRESSIVE
      cursor.style.opacity = "1"
      document.documentElement.style.cursor = "none !important"
      root.style.cursor = "none !important"
      
      // Force ALL elements to have no cursor on rapid movement
      const allElements = document.querySelectorAll("*")
      for (let i = 0; i < Math.min(allElements.length, 50); i++) {
        (allElements[i] as HTMLElement).style.cursor = "none !important"
      }

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
      
      // Track scroll direction
      if (newVelocity > 0) {
        position.scrollDirection = 1 // Scrolling down
      } else if (newVelocity < 0) {
        position.scrollDirection = -1 // Scrolling up
      }
      
      isScrolling = true
      
      // Set arrow scale based on velocity magnitude
      position.arrowScale = Math.min(Math.abs(newVelocity) * 0.3, 1)

      // Clear previous timeout
      if (scrollTimeout) clearTimeout(scrollTimeout)
      
      // Set timeout to stop scroll effect after scrolling ends
      scrollTimeout = setTimeout(() => {
        isScrolling = false
        position.scrollVelocity = 0
        position.arrowScale = 0
      }, 150)
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

    // Keep enforcing cursor: none with very aggressive interval (16ms ~60fps)
    const enforceNoCursor = setInterval(() => {
      document.documentElement.style.cursor = "none !important"
      root.style.cursor = "none !important"
      // Ensure custom cursor stays visible
      if (cursor && cursor.style.opacity !== "1") {
        cursor.style.opacity = "1"
      }
    }, 16)

    // Helper function to enforce cursor hidden state
    const enforceCursorHidden = (el?: HTMLElement) => {
      document.documentElement.style.cursor = "none !important"
      root.style.cursor = "none !important"
      if (el) el.style.setProperty("cursor", "none", "important")
    }

    const pointerHandler = (event: PointerEvent) => {
      enforceCursorHidden(event.target as HTMLElement)
    }

    const dragHandler = () => {
      enforceCursorHidden()
    }

    const mouseEnterHandler = () => {
      enforceCursorHidden()
    }

    const globalMouseHandler = () => {
      enforceCursorHidden()
    }

    const pointerOverHandler = (event: PointerEvent) => {
      enforceCursorHidden(event.target as HTMLElement)
    }

    const mouseOverHandler = (event: MouseEvent) => {
      enforceCursorHidden(event.target as HTMLElement)
    }

    // Use capture phase for mousemove to catch events before other handlers
    window.addEventListener("mousemove", moveHandler, { capture: true })
    document.addEventListener("mousemove", moveHandler, { capture: true })
    window.addEventListener("click", clickHandler)
    window.addEventListener("scroll", scrollHandler, { passive: true })
    window.addEventListener("visibilitychange", visibilityHandler)
    window.addEventListener("focus", focusHandler)
    window.addEventListener("pointerdown", pointerHandler)
    window.addEventListener("pointerup", pointerHandler)
    window.addEventListener("pointermove", pointerHandler)
    window.addEventListener("pointerover", pointerOverHandler, { capture: true })
    window.addEventListener("dragstart", dragHandler)
    window.addEventListener("drag", dragHandler)
    window.addEventListener("dragend", dragHandler)
    window.addEventListener("mouseenter", mouseEnterHandler)
    window.addEventListener("mouseover", mouseOverHandler, { capture: true })
    document.addEventListener("mouseover", mouseOverHandler, { capture: true })
    document.addEventListener("mouseenter", mouseEnterHandler)
    document.addEventListener("mousemove", globalMouseHandler, { capture: true })
    document.addEventListener("pointerover", pointerOverHandler, { capture: true })

    // Start animation loop
    rafId = requestAnimationFrame(motivationLoop)

    return () => {
      window.removeEventListener("mousemove", moveHandler, { capture: true } as any)
      document.removeEventListener("mousemove", moveHandler, { capture: true } as any)
      window.removeEventListener("click", clickHandler)
      window.removeEventListener("scroll", scrollHandler)
      window.removeEventListener("visibilitychange", visibilityHandler)
      window.removeEventListener("focus", focusHandler)
      window.removeEventListener("pointerdown", pointerHandler)
      window.removeEventListener("pointerup", pointerHandler)
      window.removeEventListener("pointermove", pointerHandler)
      window.removeEventListener("pointerover", pointerOverHandler, { capture: true } as any)
      window.removeEventListener("dragstart", dragHandler)
      window.removeEventListener("drag", dragHandler)
      window.removeEventListener("dragend", dragHandler)
      window.removeEventListener("mouseenter", mouseEnterHandler)
      window.removeEventListener("mouseover", mouseOverHandler, { capture: true } as any)
      document.removeEventListener("mouseover", mouseOverHandler, { capture: true } as any)
      document.removeEventListener("mouseenter", mouseEnterHandler)
      document.removeEventListener("mousemove", globalMouseHandler, { capture: true } as any)
      document.removeEventListener("pointerover", pointerOverHandler, { capture: true } as any)
      
      if (rafId) cancelAnimationFrame(rafId)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      clearInterval(enforceNoCursor)
      
      cursor.remove()
      scrollArrow.remove()
      document.documentElement.style.cursor = ""
      root.style.cursor = ""
      root.classList.remove("curzr-enabled")
    }
  }, [])

  return null
}
