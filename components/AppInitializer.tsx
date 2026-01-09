"use client"

import React, { useEffect, useState } from "react"
import SplashScreen from "./SplashScreen"
import Signature from "./signature"
import InstallPrompt from "./InstallPrompt"
import CookieConsent from "./CookieConsent"
import { ThemeProvider } from "./theme-provider"

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

  // register a basic service worker to enable offline caching for PWA
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    navigator.serviceWorker
      .register('/sw.js')
      .catch((e) => {
        // ignore failures — optional
        // console.warn('SW registration failed', e)
      })
  }, [])

  // keep deferred install prompt available even if `InstallPrompt` mounts later
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null)
  useEffect(() => {
    const handler = (e: Event) => {
      // @ts-ignore
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler as EventListener)
    return () => window.removeEventListener('beforeinstallprompt', handler as EventListener)
  }, [])

  // don't mount or initialize anything until we know the system theme
  if (!themeDetected) return null

  return (
    <ThemeProvider attribute="class" defaultTheme={systemTheme}>
      {!splashDone && <SplashScreen onLoaded={() => setSplashDone(true)} />}
      {splashDone && children}
      {splashDone && <InstallPrompt deferredPrompt={deferredPrompt} setDeferredPrompt={setDeferredPrompt} />}
      {splashDone && <CookieConsent />}
    </ThemeProvider>
  )
}
