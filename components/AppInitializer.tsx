"use client"

import React, { useEffect, useState } from "react"
import SplashScreen from "./SplashScreen"
import Signature from "./signature"
import { ThemeProvider } from "./theme-provider"
import SmoothScroll from "./SmoothScroll"

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const [themeDetected, setThemeDetected] = useState(false)
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light")
  const [splashDone, setSplashDone] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const update = () => {
      setSystemTheme(mq.matches ? "dark" : "light")
      setThemeDetected(true)
    }

    // run immediately to detect current setting
    update()

    // listen for changes while mounted
    if (mq.addEventListener) mq.addEventListener("change", update)
    else mq.addListener(update)

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update)
      else mq.removeListener(update)
    }
  }, [])

  // don't mount or initialize anything until we know the system theme
  if (!themeDetected) return null

  return (
    <ThemeProvider attribute="class" defaultTheme={systemTheme}>
      {!splashDone && <SplashScreen onLoaded={() => setSplashDone(true)} />}
      {splashDone && <SmoothScroll>{children}</SmoothScroll>}
    </ThemeProvider>
  )
}
