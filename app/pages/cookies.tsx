"use client"

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'

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

  useEffect(() => {
    const c = getCookie('cookie_consent')
    if (c === 'accepted' || c === 'rejected') setConsent(c as 'accepted' | 'rejected')
  }, [])

  const accept = () => {
    setCookie('cookie_consent', 'accepted')
    setCookie('performance_cookies', '1')
    setConsent('accepted')
    toast.success('Cookies accepted — thanks!')
  }

  const reject = () => {
    setCookie('cookie_consent', 'rejected')
    setCookie('performance_cookies', '0')
    setConsent('rejected')
    toast('You have rejected performance cookies')
  }

  const clearPreferences = () => {
    // expire the cookie
    setCookie('cookie_consent', '', -1)
    setCookie('performance_cookies', '', -1)
    setConsent(null)
    toast('Cookie preferences cleared — you can re-accept or reject')
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative">
      <a href="/" aria-label="Back to site" className="fixed top-6 left-4 sm:left-6 z-50 inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-background/80 text-foreground text-sm hover:bg-muted/70 transition">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to site</span>
      </a>

      <div className="max-w-lg w-full mx-auto text-center px-4">
        <h1 className="text-2xl font-bold mb-4">Cookie Policy</h1>
        <p className="mb-2">I use cookies to improve performance and provide a better experience. By accepting cookies you enable features like faster load times, improved caching, and analytics that help improve the site.</p>
        <h2 className="text-lg font-semibold mt-4">What cookies I set</h2>
        <ul className="list-disc ml-6 mt-2 text-left inline-block">
          <li><strong>Performance cookies</strong> — used to cache resources and make page loads faster.</li>
          <li><strong>Essential cookies</strong> — required for navigation and basic functionality.</li>
        </ul>
        <p className="mt-4">You can clear or block cookies in your browser at any time. If you reject performance cookies, the site will still work but may be slower.</p>

        {consent === null ? (
          <div className="mt-6 w-full max-w-md mx-auto">
            <div className="flex flex-col lg:flex-row gap-3">
              <button onClick={accept} style={{ background: 'var(--btn-accent)', color: 'var(--btn-accent-foreground)' }} className="flex-1 px-4 py-2 rounded shadow-sm hover:scale-[1.03] transition">Accept Cookies</button>
              <button onClick={reject} className="flex-1 px-4 py-2 rounded border hover:bg-muted/50 transition">Reject</button>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div className="inline-block px-4 py-2 rounded bg-muted text-foreground/90">Cookies: <strong className="ml-1">{consent}</strong></div>
            <div className="mt-3">
              <button onClick={clearPreferences} className="px-3 py-2 ml-0 rounded border hover:bg-muted/50 transition">Change preferences</button>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}