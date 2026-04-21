"use client"

import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'
import { t, type LangCode } from '@/lib/i18n'

function setCookie(name: string, value: string, days = 365) {
  const maxAge = days * 24 * 60 * 60
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; samesite=lax`
}

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) return match[2]
  return null
}

export default function CookiesPage() {
  const [consent, setConsent] = useState<'accepted' | 'rejected' | null>(null)
  const [lang, setLang] = useState<LangCode>(typeof window !== 'undefined' ? ((localStorage.getItem('preferredLang') as LangCode) || 'en') : 'en')
  const containerRef = useRef<HTMLDivElement>(null)

    // Trigger page entrance animation on mount
  useEffect(() => {
    if (containerRef.current) {
      // Add animation class after a tiny delay to ensure browser picks it up
      containerRef.current.classList.add("page-enter")
    }
  }, [])
  useEffect(() => {
    const c = getCookie('cookie_consent')
    if (c === 'accepted' || c === 'rejected') setConsent(c as 'accepted' | 'rejected')

    const onPref = (e: any) => setLang(((e && e.detail) as LangCode) || ((localStorage.getItem('preferredLang') as LangCode) || 'en'))
    window.addEventListener('preferredLangChange', onPref)
    window.addEventListener('storage', onPref)
    return () => {
      window.removeEventListener('preferredLangChange', onPref)
      window.removeEventListener('storage', onPref)
    }
  }, [])

  const accept = () => {
    setCookie('cookie_consent', 'accepted')
    setCookie('performance_cookies', '1')
    setConsent('accepted')
    import('../../lib/i18n').then(({ t }) => {
      const lang = (localStorage.getItem('preferredLang') as any) || 'en'
      toast.success(t('cookie.accept.toast', lang))
    }).catch(()=>{ toast.success('Cookies accepted — thanks!') })
  }

  const reject = () => {
    setCookie('cookie_consent', 'rejected')
    setCookie('performance_cookies', '0')
    setConsent('rejected')
    import('../../lib/i18n').then(({ t }) => {
      const lang = (localStorage.getItem('preferredLang') as any) || 'en'
      toast(t('cookie.reject.toast', lang))
    }).catch(()=>{})
  }

  const clearPreferences = () => {
    // expire the cookie
    setCookie('cookie_consent', '', -1)
    setCookie('performance_cookies', '', -1)
    setConsent(null)
    import('../../lib/i18n').then(({ t }) => {
      const lang = (localStorage.getItem('preferredLang') as any) || 'en'
      toast(t('cookie.clear.toast', lang))
    }).catch(()=>{ toast('Cookie preferences cleared — you can re-accept or reject') })
  }

  return (
    <main ref={containerRef} className="min-h-screen flex items-center justify-center p-6 relative">
      <a href="/" data-i18n-attr="aria-label" data-i18n="cookie.back" aria-label="Back to site" className="fixed top-6 left-4 sm:left-6 z-50 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background/80 text-foreground text-sm hover:bg-muted/70 transition">
        <ArrowLeft className="w-4 h-4" />
        <span data-i18n="cookie.back">Back to site</span>
      </a>

      <div className="max-w-lg w-full mx-auto text-center px-4">
        <h1 data-i18n="cookie.title" className="text-2xl font-bold mb-4">Cookie Policy</h1>
        <p data-i18n="cookie.p1" className="mb-2">I use cookies to improve performance and provide a better experience. By accepting cookies you enable features like faster load times, improved caching, and analytics that help improve the site.</p>
        <h2 data-i18n="cookie.what.heading" className="text-lg font-semibold mt-4">What cookies I set</h2>
        <ul className="list-disc ml-6 mt-2 text-left inline-block">
          <li><strong data-i18n="cookie.performance">Performance cookies</strong> — <span data-i18n="cookie.performance.desc">used to cache resources and make page loads faster.</span></li>
          <li><strong data-i18n="cookie.essential">Essential cookies</strong> — <span data-i18n="cookie.essential.desc">required for navigation and basic functionality.</span></li>
        </ul>
        <p data-i18n="cookie.note" className="mt-4">You can clear or block cookies in your browser at any time. If you reject performance cookies, the site will still work but may be slower.</p>

        {consent === null ? (
          <div className="mt-6 w-full max-w-md mx-auto">
            <div className="flex flex-col lg:flex-row gap-3">
              <button data-i18n="cookie.accept" onClick={accept} style={{ background: 'var(--btn-accent)', color: 'var(--btn-accent-foreground)' }} className="flex-1 px-4 py-2 rounded shadow-sm hover:scale-[1.03] transition">Accept Cookies</button>
              <button data-i18n="cookie.reject" onClick={reject} className="flex-1 px-4 py-2 rounded border hover:bg-muted/50 transition">Reject</button>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div className="inline-block px-4 py-2 rounded bg-muted text-foreground/90">{t('cookie.status', lang)} <strong className="ml-1">{consent ? t(`cookie.status.${consent}`, lang) : ''}</strong></div>
            <div className="mt-3">
              <button onClick={clearPreferences} className="px-3 py-2 ml-0 rounded border hover:bg-muted/50 transition">Change preferences</button>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}