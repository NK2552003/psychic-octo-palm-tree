"use client"

import React, { useEffect, useState } from "react"
import { toast } from "sonner"
import { Smartphone } from "lucide-react"

export default function InstallPrompt({ deferredPrompt, setDeferredPrompt }: { deferredPrompt: any | null, setDeferredPrompt: (v: any) => void }) {
  // show when we have a deferred prompt
  const visible = Boolean(deferredPrompt)

  const install = async () => {
    if (!deferredPrompt) return
    try {
      // @ts-ignore
      deferredPrompt.prompt()
      // @ts-ignore
      const choice = await deferredPrompt.userChoice
      if (choice?.outcome === "accepted") {
        try {
          const gl = (window as any).__i18n
          if (gl && typeof gl.t === 'function') {
            const lang = (localStorage.getItem('preferredLang') as any) || 'en'
            toast.success(gl.t('install.toast.installed', lang))
          } else {
            import('../lib/i18n').then(({ t }) => {
              const lang = (localStorage.getItem('preferredLang') as any) || 'en'
              toast.success(t('install.toast.installed', lang))
            }).catch(() => {
              toast.success('App installed — thanks!')
            })
          }
        } catch (e) { toast.success('App installed — thanks!') }
      } else {
        try {
          const gl = (window as any).__i18n
          if (gl && typeof gl.t === 'function') {
            const lang = (localStorage.getItem('preferredLang') as any) || 'en'
            toast(gl.t('install.toast.dismissed', lang))
          } else {
            import('../lib/i18n').then(({ t }) => {
              const lang = (localStorage.getItem('preferredLang') as any) || 'en'
              toast(t('install.toast.dismissed', lang))
            }).catch(() => {
              toast('Installation dismissed')
            })
          }
        } catch (e) { toast('Installation dismissed') }
      }
    } catch (err) {
      try {
        const gl = (window as any).__i18n
        const lang = (localStorage.getItem('preferredLang') as any) || 'en'
        if (gl && typeof gl.t === 'function') {
          toast.error(gl.t('install.toast.failed', lang))
        } else {
          import('../lib/i18n').then(({ t }) => {
            const lang = (localStorage.getItem('preferredLang') as any) || 'en'
            toast.error(t('install.toast.failed', lang))
          }).catch(() => { toast.error('Install failed') })
        }
      } catch (e) { toast.error('Install failed') }
    } finally {
      setDeferredPrompt(null)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 pointer-events-none flex justify-center px-4">
      <div className="w-[min(94%,40rem)] pointer-events-auto bg-background/95 border border-border rounded-xl shadow-lg p-3 lg:p-4 flex flex-col lg:flex-row items-center lg:items-start gap-3 lg:gap-4 text-foreground text-xs lg:text-sm backdrop-blur-md transition-opacity duration-300 pwa-toast">
        <div className="flex-0 w-12 h-12 aspect-square rounded-xl flex items-center justify-center mx-auto lg:mx-0 mb-1 lg:mb-0" style={{ background: 'var(--btn-accent)' }}>
          <Smartphone className="w-6 h-6 mx-auto" style={{ color: 'var(--btn-accent-foreground)' }} aria-hidden />
        </div>

        <div className="flex-1 text-center lg:text-left">
          <div className="font-semibold" data-i18n="install.title">Install this app</div>
          <div className="mt-1 text-foreground/70 text-sm" data-i18n="install.subtitle">Install this site as an app for a faster, more integrated experience.</div>
        </div>

        <div className="flex w-full lg:w-auto flex-col lg:flex-row gap-2 actions">
          <button data-i18n="install.install" onClick={install} style={{ background: 'var(--btn-accent)', color: 'var(--btn-accent-foreground)' }} className="w-full md:w-auto text-sm px-4 py-2 rounded-md shadow-sm hover:scale-[1.03] active:scale-[0.98] focus:outline-none transition transform duration-150">Install</button>
          <button data-i18n="install.dismiss" onClick={() => setDeferredPrompt(null)} className="w-full md:w-auto text-sm px-4 py-2 rounded-md border border-border hover:bg-muted/60 hover:scale-[1.02] transition transform duration-150">Dismiss</button>
        </div>
      </div>
    </div>
  )
}
