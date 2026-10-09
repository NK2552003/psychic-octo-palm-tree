"use client"

import React, { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import SplashScreen from "./SplashScreen"
import InstallPrompt from "./InstallPrompt";
import CookieConsent from "./CookieConsent";
import DoodleOverlay from "./DoodleOverlay";
import BigCursor from "./BigCursor";
import ProgressScrollBar from "./ProgressScrollBar";
import LenisScroll from "./LenisScroll"
import BrowserSupport from "./BrowserSupport"
import { toast } from "sonner"

const featuredProjects = [
  {
    id: 'featured-ultimate-media-downloader',
    name: 'Ultimate Media Downloader',
    description: 'An open-source media downloader with support for 115+ platforms.',
    action: 'Explore',
    url: 'https://ultimate-media-downloader.fun/',
  },
  {
    id: 'featured-mac-deep-cleaner',
    name: 'Mac Deep Cleaner',
    description: 'A macOS cleanup CLI with cache inspection, disk space recovery, and undo support.',
    action: 'View on PyPI',
    url: 'https://pypi.org/project/mac-deep-cleaner/',
  },
  {
    id: 'featured-forest-ash-theme',
    name: 'Forest Ash Theme',
    description: '21 nature-inspired dark and light themes for your VS Code workspace.',
    action: 'View themes',
    url: 'https://marketplace.visualstudio.com/items?itemName=NK2552003.forest-ash-theme-vscode',
  },
]

type I18nWindow = Window & {
  __i18n?: Pick<typeof import('@/lib/i18n'), 'translateDocument'>
}

export default function AppInitializer({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname === '/simple' || pathname === '/simple/' || pathname === '/unsupported-browser') return <>{children}</>
  return <EnhancedApp>{children}{footer}</EnhancedApp>
}

function EnhancedApp({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const isUnsupportedBrowserPage = pathname === '/unsupported-browser'
  // The server and first client render must both show the splash. Read browser
  // preferences only after hydration, including on returning-visitor navigations.
  const [splashDone, setSplashDone] = useState(false)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const force = new URLSearchParams(window.location.search).get('forceSplash') === '1'
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
        if (force || navigation?.type === 'reload') {
          sessionStorage.removeItem('splashDone')
          return
        }
        setSplashDone(sessionStorage.getItem('splashDone') === '1')
      } catch {
        // Storage may be unavailable; let the splash complete normally.
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [])
  const [renderEnhancements, setRenderEnhancements] = useState(false)



  // register a basic service worker to enable offline caching for PWA
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return

    let refreshing = false

    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        // If there's an updated worker waiting, ask it to activate immediately — but only
      // if we already had a controller (this indicates it's an update rather than the initial install)
      if (reg.waiting && navigator.serviceWorker.controller) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' })
      }

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing
          if (!newWorker) return
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Tell the waiting worker to skip waiting (activate) — the controllerchange handler will reload
              if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' })
            }
          })
        })
      })
      .catch(() => {
        // ignore failures — optional
        // console.warn('SW registration failed', e)
      })

    // When the new service worker takes control, reload the page to use fresh assets.
    // Only reload if there was an existing controller (i.e. this is an update), to avoid
    // reloading during the initial install on first page load.
    let hadController = !!navigator.serviceWorker.controller
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController) {
        // First-time activation — avoid a disruptive reload
        hadController = true
        return
      }
      if (refreshing) return
      refreshing = true
      window.location.reload()
    })
  }, [])

  // Listen for global errors/unhandled rejections and redirect to recovery page
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      try {
        if (typeof window === 'undefined') return
        if (window.location.pathname === '/error-recovery') return
        // avoid redirect during local development
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return
        const msg = (e && (e.message || (e.error && e.error.message))) || ''
        if (typeof msg === 'string' && (msg.includes('@context') || msg.includes('ResizeObserver') || msg.includes('Script error'))) return
        window.location.replace('/error-recovery')
      } catch {}
    }

    const onRejection = (e: PromiseRejectionEvent) => {
      try {
        if (typeof window === 'undefined') return
        if (window.location.pathname === '/error-recovery') return
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return
        const reason = (e && (e.reason?.message || String(e.reason))) || ''
        if (typeof reason === 'string' && (reason.includes('@context') || reason.includes('ResizeObserver'))) return
        window.location.replace('/error-recovery')
      } catch {}
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onRejection)

    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onRejection)
    }
  }, [])

  // keep deferred install prompt available even if `InstallPrompt` mounts later
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  useEffect(() => {
    const handler = (e: Event) => {
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
        const gl = (typeof window !== 'undefined' && (window as I18nWindow).__i18n)
        if (gl && typeof gl.translateDocument === 'function') {
          try { gl.translateDocument(lang) } catch {}
          return true
        }
      } catch {}
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
              try { tryGlobal(lang) } catch {}
              try { window.removeEventListener('i18n:ready', onReady) } catch {}
            }
            try { window.addEventListener('i18n:ready', onReady) } catch {}
            // give up after a brief timeout
            const giveUp = window.setTimeout(() => {
              try { window.removeEventListener('i18n:ready', onReady) } catch {}
              clearTimeout(giveUp)
            }, 5000)
          }
        }, 50)
      } catch {}
    }

    // apply initial
    apply()

    // Listen for storage changes (other tabs) and apply language updates
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'preferredLang') {
        try {
          const val = (e.newValue as 'en'|'hi'|'hinglish') || 'en'
          try { const gl = (window as I18nWindow).__i18n; if (gl && typeof gl.translateDocument === 'function') gl.translateDocument(val) } catch {}
          window.dispatchEvent(new CustomEvent('preferredLangChange', { detail: val }))
        } catch {}
      }
    }

    try { window.addEventListener('storage', onStorage as EventListener) } catch {}

    // Final effort: if i18n helper appears shortly after mount, try applying it once more
    const finalAttempt = setTimeout(() => {
      try { const lang = (localStorage.getItem('preferredLang') as 'en'|'hi'|'hinglish') || 'en'; const gl = (window as I18nWindow).__i18n; if (gl && typeof gl.translateDocument === 'function') gl.translateDocument(lang) } catch {}
    }, 200)

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as 'en' | 'hi' | 'hinglish'
      const lang = detail || 'en'

      // prefer global helper
      if (tryGlobal(lang)) return

      // Listen for i18n ready once and then apply
      const onReady = () => {
        try { tryGlobal(lang) } catch {}
        try { window.removeEventListener('i18n:ready', onReady) } catch {}
      }
      try { window.addEventListener('i18n:ready', onReady) } catch {}

      // No dynamic import fallback here to avoid HMR module factory issues — we rely on the global helper and i18n:ready event instead.
    }

    window.addEventListener('preferredLangChange', handler as EventListener)

    return () => {
      mounted = false
      window.removeEventListener('preferredLangChange', handler as EventListener)
      try { window.removeEventListener('storage', onStorage as EventListener) } catch {}
      clearTimeout(finalAttempt)
    }
  }, [])

  // Defer rendering of heavy UI enhancements (BigCursor, DoodleOverlay, InstallPrompt) until after LCP
  // This prevents them from blocking the critical rendering path
  useEffect(() => {
    if (!splashDone) return

    const scheduleEnhancements = () => {
      setRenderEnhancements(true)
    }

    if ('requestIdleCallback' in window) {
      requestIdleCallback(scheduleEnhancements, { timeout: 3000 })
    } else {
      setTimeout(scheduleEnhancements, 1500)
    }
  }, [splashDone])

  // Announce the featured projects once per page load, after the splash.
  // Mark each toast only when shown so Strict Mode cleanup cannot lose it.
  const shownProjectToasts = useRef(new Set<string>())
  useEffect(() => {
    if (!splashDone || isUnsupportedBrowserPage) return
    // Sonner keeps its queue across Fast Refresh. Remove announcements from
    // the previous implementation before displaying the current selection.
    const featuredIds = new Set(featuredProjects.map(project => project.id))
    toast.getToasts().forEach(notification => {
      if (!featuredIds.has(String(notification.id))) toast.dismiss(notification.id)
    })
    const timers = featuredProjects.map((project, index) => setTimeout(() => {
      if (shownProjectToasts.current.has(project.id)) return
      shownProjectToasts.current.add(project.id)
      toast(project.name, {
        id: project.id,
        description: project.description,
        duration: 9000,
        closeButton: true,
        action: {
          label: project.action,
          onClick: () => window.open(project.url, '_blank', 'noopener,noreferrer'),
        },
      })
    }, 800 + index * 1200))
    return () => {
      timers.forEach(clearTimeout)
      featuredProjects.forEach(project => toast.dismiss(project.id))
    }
  }, [splashDone])

  const contentReady = splashDone || !isHomePage

  return (
    <LenisScroll>
      <BrowserSupport />
      <ProgressScrollBar />
      {!contentReady && (
        <SplashScreen onLoaded={() => {
          setSplashDone(true)
          try { sessionStorage.setItem('splashDone', '1') } catch {}
        }} />
      )}
      {contentReady && children}
      {contentReady && (renderEnhancements || !isHomePage) && <BigCursor />}
      {splashDone && renderEnhancements && isHomePage && <DoodleOverlay />}
      {splashDone && renderEnhancements && !isUnsupportedBrowserPage && <InstallPrompt deferredPrompt={deferredPrompt} setDeferredPrompt={setDeferredPrompt} />}
      {contentReady && !isUnsupportedBrowserPage && <CookieConsent />}
    </LenisScroll>
  )
}
