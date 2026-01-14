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

  // Apply translations when language preference changes
  useEffect(() => {
    let mounted = true

    const tryGlobal = (lang: 'en' | 'hi' | 'hinglish') => {
      try {
        const gl = (typeof window !== 'undefined' && (window as any).__i18n) as any
        if (gl && typeof gl.translateDocument === 'function') {
          try { gl.translateDocument(lang) } catch (e) {}
          return true
        }
      } catch (e) {}
      return false
    }

    const apply = () => {
      if (!mounted) return
      try {
        const lang = (localStorage.getItem('preferredLang') as 'en' | 'hi' | 'hinglish') || 'en'

        // Fast path: use global helper if available
        if (tryGlobal(lang)) return

        // Poll briefly for window.__i18n to appear (covers HMR timing)
        let attempts = 0
        const maxAttempts = 40
        const id = window.setInterval(() => {
          attempts++
          if (tryGlobal(lang)) {
            clearInterval(id)
            return
          }
          if (attempts >= maxAttempts) {
            clearInterval(id)
            // Listen for explicit readiness event as a safer fallback
            const onReady = () => {
              try { tryGlobal(lang) } catch (e) {}
              try { window.removeEventListener('i18n:ready', onReady) } catch (e) {}
            }
            try { window.addEventListener('i18n:ready', onReady) } catch (e) {}
            // give up after a brief timeout
            const giveUp = window.setTimeout(() => {
              try { window.removeEventListener('i18n:ready', onReady) } catch (e) {}
              clearTimeout(giveUp)
            }, 5000)
          }
        }, 50)
      } catch (e) {}
    }

    // apply initial
    apply()

    // Listen for storage changes (other tabs) and apply language updates
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'preferredLang') {
        try {
          const val = (e.newValue as 'en'|'hi'|'hinglish') || 'en'
          try { const gl = (window as any).__i18n; if (gl && typeof gl.translateDocument === 'function') gl.translateDocument(val) } catch (e) {}
          window.dispatchEvent(new CustomEvent('preferredLangChange', { detail: val }))
        } catch (e) {}
      }
    }

    try { window.addEventListener('storage', onStorage as EventListener) } catch (e) {}

    // Final effort: if i18n helper appears shortly after mount, try applying it once more
    const finalAttempt = setTimeout(() => {
      try { const lang = (localStorage.getItem('preferredLang') as 'en'|'hi'|'hinglish') || 'en'; const gl = (window as any).__i18n; if (gl && typeof gl.translateDocument === 'function') gl.translateDocument(lang) } catch (e) {}
    }, 200)

    const handler = (e: Event) => {
      // @ts-ignore
      const detail = (e as CustomEvent).detail as 'en' | 'hi' | 'hinglish'
      const lang = detail || 'en'

      // prefer global helper
      if (tryGlobal(lang)) return

      // Listen for i18n ready once and then apply
      const onReady = () => {
        try { tryGlobal(lang) } catch (e) {}
        try { window.removeEventListener('i18n:ready', onReady) } catch (e) {}
      }
      try { window.addEventListener('i18n:ready', onReady) } catch (e) {}

      // No dynamic import fallback here to avoid HMR module factory issues — we rely on the global helper and i18n:ready event instead.
    }

    window.addEventListener('preferredLangChange', handler as EventListener)

    return () => {
      mounted = false
      window.removeEventListener('preferredLangChange', handler as EventListener)
      try { window.removeEventListener('storage', onStorage as EventListener) } catch (e) {}
      clearTimeout(finalAttempt)
    }
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
