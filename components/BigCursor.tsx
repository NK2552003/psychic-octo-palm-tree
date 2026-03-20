"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

const MOBILE_RE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
const CURSOR_SIZE = 100

function getThemeColors(theme: "light" | "dark") {
  if (theme === "dark") {
    return {
      circle: "rgba(255,255,255,0.8)",
      dot: "rgba(255,255,255,1)",
      background: "rgba(255,255,255,0.08)",
    }
  }

  return {
    circle: "rgba(0,0,0,0.65)",
    dot: "rgba(0,0,0,1)",
    background: "rgba(0,0,0,0.05)",
  }
}

export default function BigCursor() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (typeof window === "undefined" || MOBILE_RE.test(navigator.userAgent)) {
      return
    }

    const root = document.body

    // disable the native cursor and keep the custom cursor in control
    document.documentElement.style.cursor = "none"
    root.style.cursor = "none"
    root.classList.add("curzr-enabled")

    const cursorStyle = document.createElement("style")
    cursorStyle.id = "curzr-style"
    cursorStyle.textContent = `
      .curzr-enabled,
      .curzr-enabled * {
        cursor: none !important;
      }
    `
    document.head.appendChild(cursorStyle)

    const wrapper = document.createElement("div")
    wrapper.className = "curzr"

    const circle = document.createElement("div")
    circle.className = "circle"

    const dot = document.createElement("div")
    dot.className = "dot"

    // keep it invisible until first movement to avoid early flicker assault
    circle.style.opacity = "0"
    dot.style.opacity = "0"

    wrapper.appendChild(circle)
    wrapper.appendChild(dot)
    root.appendChild(wrapper)

    const baseStyle: Partial<CSSStyleDeclaration> = {
      boxSizing: "border-box",
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "2147483647",
      pointerEvents: "none",
      userSelect: "none",
      transform: `translate3d(0px, 0px, 0px)`,
      transition: "transform 100ms ease-out, opacity 200ms ease",
      willChange: "transform",
    }

    Object.assign(circle.style, baseStyle, {
      width: `${CURSOR_SIZE}px`,
      height: `${CURSOR_SIZE}px`,
      borderRadius: "50%",
      border: "2px solid",
      transform: `translate3d(${ -CURSOR_SIZE / 2 }px, ${ -CURSOR_SIZE / 2 }px, 0px)`,
    })

    Object.assign(dot.style, baseStyle, {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      transform: "translate3d(-50%, -50%, 0px)",
      transition: "transform 75ms ease-out, background-color 200ms ease",
    })

    const setColor = (theme: "light" | "dark") => {
      const { circle: circleColor, dot: dotColor, background } = getThemeColors(theme)
      circle.style.borderColor = circleColor
      circle.style.backgroundColor = background
      dot.style.backgroundColor = dotColor
    }

    const theme = resolvedTheme === "dark" ? "dark" : "light"
    setColor(theme)

    let pointerX = 0
    let pointerY = 0
    let activeScale = 1

    const updateTransforms = () => {
      circle.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) scale(${activeScale})`
      dot.style.transform = `translate3d(calc(-50% + ${pointerX}px), calc(-50% + ${pointerY}px), 0)`
    }

    const moveHandler = (event: MouseEvent) => {
      pointerX = event.pageX
      pointerY = event.pageY + root.getBoundingClientRect().y

      const target = event.target as HTMLElement | null
      const hasCursorHoverClass =
        !!target &&
        target instanceof Element &&
        target.classList.contains("curzr-hover")

      const isInteractive =
        !!target &&
        (target.localName === "button" ||
          target.localName === "a" ||
          (target as HTMLElement).onclick !== null ||
          hasCursorHoverClass)

      activeScale = isInteractive ? 1.45 : 1
      updateTransforms()

      if (circle.style.opacity !== "1") {
        circle.style.opacity = "1"
        dot.style.opacity = "1"
      }
    }

    const clickHandler = () => {
      activeScale = 0.75
      updateTransforms()
      window.setTimeout(() => {
        activeScale = 1
        updateTransforms()
      }, 75)
    }

    window.addEventListener("mousemove", moveHandler)
    window.addEventListener("click", clickHandler)

    return () => {
      window.removeEventListener("mousemove", moveHandler)
      window.removeEventListener("click", clickHandler)
      wrapper.remove()
      document.documentElement.style.cursor = ""
      root.style.cursor = ""
      root.classList.remove("curzr-enabled")
      const injectedStyle = document.getElementById("curzr-style")
      if (injectedStyle) injectedStyle.remove()
    }
  }, [resolvedTheme])

  return null
}
