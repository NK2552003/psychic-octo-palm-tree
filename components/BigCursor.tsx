"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

const MOBILE_RE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const EASING = 0.12 // RAF easing factor for smooth lag

function getThemeProps(theme: "light" | "dark") {
  if (theme === "dark") {
    return {
      border: "1.25px solid rgba(245, 247, 248, 0.85)",
      shadowColor: "rgba(245, 247, 248, 0.8)",
      hoverBorder: "10px solid rgba(245, 247, 248, 0.7)",
      bg: "rgba(255, 255, 255, 0.04)",
    }
  }

  return {
    border: "1.25px solid rgba(17, 25, 32, 0.8)",
    shadowColor: "rgba(17, 25, 32, 0.8)",
    hoverBorder: "10px solid rgba(0, 143, 135, 0.35)",
    bg: "rgba(17, 25, 32, 0.25)",
  }
}

export default function BigCursor() {
  const { resolvedTheme } = useTheme()
  const themePropsRef = useRef(getThemeProps(resolvedTheme === "dark" ? "dark" : "light"))

  useEffect(() => {
    themePropsRef.current = getThemeProps(resolvedTheme === "dark" ? "dark" : "light")
    const cursor = document.querySelector(".curzr") as HTMLElement | null
    if (cursor) {
      const props = themePropsRef.current
      cursor.style.backgroundColor = props.bg
      cursor.style.border = props.border
      cursor.style.boxShadow = `0 -15px 0 -8px transparent, 0 0 0 1px ${props.shadowColor}`
    }
  }, [resolvedTheme])

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
      return
    }

    document.documentElement.style.cursor = "none"
    root.style.cursor = "none"
    root.classList.add("curzr-enabled")

    let styleTag = document.getElementById("curzr-style") as HTMLStyleElement | null
    if (!styleTag) {
      styleTag = document.createElement("style")
      styleTag.id = "curzr-style"
      styleTag.textContent = `
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
      `
      document.head.appendChild(styleTag)
    }

    const cursor = document.createElement("div")
    cursor.className = "curzr"

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
      transition: "transform 180ms cubic-bezier(0.18,0.89,0.32,1.28), border 180ms ease, box-shadow 160ms ease, opacity 150ms ease",
      willChange: "transform, box-shadow, opacity",
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
    }

    let fading = false
    let rafId: number | null = null
    let lastX = 0,
      lastY = 0
    let isInteractive = false

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
      const scale = isInteractive ? 1.5 : 1
      const rotate = calcAngle(dx, dy)
      const props = themePropsRef.current

      cursor.style.transform = `translate3d(${position.easedX - CURSOR_SIZE / 2}px, ${position.easedY - CURSOR_SIZE / 2}px, 0) rotate(${rotate}deg) scale(${scale})`
      cursor.style.border = isInteractive ? props.hoverBorder : props.border
      cursor.style.boxShadow = `0 ${-15 - position.distance}px 0 -8px ${props.shadowColor}, 0 0 0 1px ${props.shadowColor}`

      if (!fading) {
        fading = true
        window.setTimeout(() => {
          cursor.style.boxShadow = `0 -15px 0 -8px transparent, 0 0 0 1px ${props.shadowColor}`
          fading = false
        }, 50)
      }

      if (cursor.style.opacity !== "1") cursor.style.opacity = "1"
    }

    const motivationLoop = () => {
      position.prevX = position.easedX
      position.prevY = position.easedY

      position.easedX += (position.pointerX - position.easedX) * EASING
      position.easedY += (position.pointerY - position.easedY) * EASING

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
          target.localName === "textarea")

      if (!rafId) rafId = requestAnimationFrame(motivationLoop)
    }

    const clickHandler = () => {
      const base = cursor.style.transform
      cursor.style.transform = `${base} scale(0.75)`
      window.setTimeout(() => {
        cursor.style.transform = base
      }, 75)
    }

    window.addEventListener("mousemove", moveHandler)
    window.addEventListener("click", clickHandler)
    rafId = requestAnimationFrame(motivationLoop)

    return () => {
      window.removeEventListener("mousemove", moveHandler)
      window.removeEventListener("click", clickHandler)
      if (rafId) cancelAnimationFrame(rafId)
      cursor.remove()
      document.documentElement.style.cursor = ""
      root.style.cursor = ""
      root.classList.remove("curzr-enabled")
    }
  }, [])

  return null
}
