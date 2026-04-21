"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header' 

export default function ErrorRecovery() {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
    // Trigger page entrance animation on mount
    useEffect(() => {
      if (containerRef.current) {
        // Add animation class after a tiny delay to ensure browser picks it up
        containerRef.current.classList.add("page-enter")
      }
    }, [])
  const clearCookies = () => {
    try {
      const cookies = document.cookie.split(';')
      for (const cookie of cookies) {
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${location.hostname}`
        if (location.hostname.includes('.')) {
          const hostParts = location.hostname.split('.').slice(-2).join('.')
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${hostParts}`
        }
      }
      setMessage('Cookies cleared (Note: HttpOnly cookies cannot be cleared by this page).')
      setTimeout(() => router.push('/'), 700)
    } catch (e) {
      setMessage('Failed to clear cookies automatically. Please clear them via your browser settings.')
      setTimeout(() => router.push('/'), 700)
    }
  }

  const clearCacheAndStorage = async () => {
    setBusy(true)
    setMessage(null)
    try {
      // delete caches
      if ('caches' in window) {
        const keys = await caches.keys()
        await Promise.all(keys.map((k) => caches.delete(k)))
      }

      // unregister service workers
      if ('serviceWorker' in navigator) {
        try {
          const regs = await navigator.serviceWorker.getRegistrations()
          await Promise.all(regs.map((r) => r.unregister()))
        } catch (e) {
          // ignore
        }
      }

      // clear storage
      try { localStorage.clear() } catch (e) {}
      try { sessionStorage.clear() } catch (e) {}

      // try clear cookies as well
      clearCookies()

      setMessage('Cache, storage, and non-HttpOnly cookies cleared. Redirecting to home...')

      // give the unregisters a moment then navigate to home
      setTimeout(() => router.push('/'), 700)
    } catch (e) {
      setMessage('Automatic clear failed. Please clear cache and cookies manually from your browser and reload.')
    } finally {
      setBusy(false)
    }
  }

  const forceReloadNoCache = () => {
    // Try fetch to bypass caches, then reload
    try {
      fetch(window.location.href, { cache: 'no-store', mode: 'same-origin' }).finally(() => router.push('/'))
    } catch (e) {
      router.push('/')
    }
  }

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col">
      <Header time={new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })} />
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full bg-[var(--color-card)] text-[var(--color-card-foreground)] border border-[var(--color-border)] rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold mb-4 text-[var(--color-card-foreground)]">Client-side error detected</h1>
          <p className="mb-4 text-[var(--color-muted-foreground)]">
            The site encountered a client-side error while loading. This can happen when your browser serves an older/stale cached file or cookie that conflicts with the newly deployed code.
          </p>

          <div className="space-y-3 mb-4">
            <p className="text-sm text-[var(--color-muted-foreground)]">Quick fixes (try them in order):</p>
            <div className="flex gap-2">
              <button
                onClick={clearCacheAndStorage}
                disabled={busy}
                className="px-4 py-2 rounded bg-[var(--btn-accent)] text-[var(--btn-accent-foreground)] hover:opacity-90 disabled:opacity-50"
              >
                Clear cache & storage
              </button>
              <button
                onClick={clearCookies}
                disabled={busy}
                className="px-4 py-2 rounded border border-[var(--color-border)] text-[var(--color-foreground)]"
              >
                Clear cookies
              </button>
              <button
                onClick={forceReloadNoCache}
                className="px-4 py-2 rounded border border-[var(--color-border)] text-[var(--color-foreground)]"
              >
                Reload (bypass cache)
              </button>
            </div>
          </div>

          {message && (
            <div className="mb-4 p-3 rounded bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
              {message}
            </div>
          )}

          <details className="text-sm text-[var(--color-muted-foreground)]">
            <summary className="cursor-pointer mb-2 font-medium">Manual instructions</summary>
            <ol className="pl-4 list-decimal space-y-1">
              <li>Open your browser settings → Privacy & Security → Clear browsing data.</li>
              <li>Select <strong>Cached images and files</strong> and <strong>Cookies and other site data</strong>, then clear.</li>
              <li>Reload this page.</li>
            </ol>
            <p className="mt-2 text-xs text-[var(--color-muted-foreground)]">Note: If your site uses HttpOnly cookies, they must be cleared via browser settings (cannot be removed by JavaScript).</p>
          </details>

          <div className="mt-6 text-sm text-[var(--color-muted-foreground)]">
            If the problem persists after clearing cache and cookies, try opening the site in an incognito window or contact support.
          </div>
        </div>
      </main>
    </section>
  )
}
