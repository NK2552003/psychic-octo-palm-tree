"use client"

import React, { useEffect, useState } from "react"
import { toast } from "sonner"

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) return match[2]
  return null
}

function setCookie(name: string, value: string, days = 365) {
  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; samesite=lax`
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => {
      const consent = getCookie("cookie_consent")
      const path = typeof window !== "undefined" ? window.location.pathname : ""

      // don't show the toast on the dedicated cookie policy page
      if (path.startsWith("/cookies")) {
        setVisible(false)
        return
      }

      setVisible(!consent)
    }

    // initial check
    check()

    // handle back/forward and hash-based changes
    window.addEventListener("popstate", check)
    window.addEventListener("hashchange", check)

    // Cleanup
    return () => {
      window.removeEventListener("popstate", check)
      window.removeEventListener("hashchange", check)
    }
  }, [])

  const accept = () => {
    setCookie("cookie_consent", "accepted")
    setCookie("performance_cookies", "1")
    setVisible(false)
    import('../lib/i18n').then(({ t }) => {
      const lang = (localStorage.getItem('preferredLang') as any) || 'en'
      toast.success(t('cookie.accept.toast', lang))
    }).catch(()=>{
      toast.success('Cookies accepted — thanks!')
    })
  }

  const reject = () => {
    setCookie("cookie_consent", "rejected")
    setCookie("performance_cookies", "0")
    setVisible(false)
    import('../lib/i18n').then(({ t }) => {
      const lang = (localStorage.getItem('preferredLang') as any) || 'en'
      toast(t('cookie.reject.toast', lang))
    }).catch(()=>{
      toast('You have rejected performance cookies')
    })
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 pointer-events-none flex justify-center px-4">
      <div className="w-[min(94%,44rem)] pointer-events-auto bg-background/95 border border-border rounded-xl shadow-lg p-3 lg:p-4 flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 text-foreground text-xs lg:text-sm backdrop-blur-md transition-opacity duration-300 cookie-toast">
        <div className="flex-1 text-center lg:text-left">
          <div className="font-semibold" data-i18n="cookie.accept.title">I use cookies</div>
          <div className="mt-1 text-foreground/70" data-i18n="cookie.p1">I use cookies to improve performance and provide a better experience. Accept to enable caching, analytics and faster loads.</div>
          <div className="mt-2"><a href="/cookies" data-i18n="cookie.read" className="underline text-xs lg:text-sm">Read my cookie policy</a></div>
        </div>

        <div className="w-full lg:w-auto flex flex-col gap-2 actions">
          <div className="flex flex-col lg:flex-row gap-2 justify-center lg:justify-start">
            <button
              data-i18n="cookie.accept"
              onClick={accept}
              style={{ background: 'var(--btn-accent)', color: 'var(--btn-accent-foreground)' }}
              className="w-full lg:w-auto px-4 py-2 rounded-md shadow-sm hover:scale-[1.03] active:scale-[0.98] focus:outline-none transition transform duration-150"
            >
              Accept
            </button>
            <button
              data-i18n="cookie.reject"
              onClick={reject}
              className="w-full lg:w-auto px-4 py-2 rounded-md border border-border hover:bg-muted/60 hover:scale-[1.02] transition transform duration-150"
            >
              Reject
            </button>
          </div>

          <div className="flex justify-center">
            <button
              data-i18n="cookie.dismiss"
              onClick={() => setVisible(false)}
              className="px-3 py-2 text-sm text-foreground/70 hover:text-foreground hover:underline transition"
              aria-label="Dismiss cookie message"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
