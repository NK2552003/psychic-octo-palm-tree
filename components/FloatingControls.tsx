"use client";

import { useEffect, useState, useRef } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { translateDocument, t } from "@/lib/i18n";
// Use inline outlined SVGs for language icons to avoid lucide-react HMR issues

export default function FloatingControls({
  toggleTheme,
  isDark,
}: { toggleTheme: (e: MouseEvent<HTMLButtonElement>) => void; isDark: boolean }) {

  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("preferredLang") || "en";
  });

  // Mobile: state to control language menu
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  // Hover tooltip state (used to show hover tags like the left menu)
  const [hoverTarget, setHoverTarget] = useState<string | null>(null);
  const [hoverText, setHoverText] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    function onDocClick(e: Event) {
      if (!langMenuRef.current) return
      const target = (e.target as Node | null)
      if (!target) return
      if (!langMenuRef.current.contains(target)) setLangMenuOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLangMenuOpen(false)
    }
    if (langMenuOpen) {
      document.addEventListener('mousedown', onDocClick)
      document.addEventListener('keydown', onKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKeyDown)
      // clear hover state when menu closes
      setHoverTarget(null)
      setHoverText(null)
    }
  }, [langMenuOpen])

  // Expose wrapping helpers so we can re-apply right away when the user clicks
  const unwrapDevanagari = () => {
    document.querySelectorAll('span[data-devanagari-wrapped="true"]').forEach((el) => {
      const parent = el.parentNode
      if (!parent) return
      parent.replaceChild(document.createTextNode(el.textContent || ''), el)
    })
  }

  const wrapDevanagari = (rootEl: ParentNode) => {
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null)
    const nodes: Text[] = []
    let node: Node | null
    while ((node = walker.nextNode())) {
      nodes.push(node as Text)
    }

    const devRange = /[\u0900-\u097F]+/g

    nodes.forEach((textNode) => {
      const parent = textNode.parentElement
      if (!parent) return
      // Skip scripts/styles and common form/markup containers
      if (parent.closest('script, style, textarea, code, pre, input, svg')) return
      // Skip already wrapped content
      if (parent.closest('[data-devanagari-wrapped="true"]')) return

      const text = textNode.nodeValue || ''
      if (!devRange.test(text)) return

      // create a document fragment and rebuild node with wraps
      const frag = document.createDocumentFragment()
      let lastIndex = 0
      devRange.lastIndex = 0
      let m
      while ((m = devRange.exec(text)) !== null) {
        const start = m.index
        const end = devRange.lastIndex
        if (start > lastIndex) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex, start)))
        }
        const span = document.createElement('span')
        span.setAttribute('data-devanagari-wrapped', 'true')
        span.className = 'tiro-hindi'
        span.setAttribute('lang', 'hi')
        span.textContent = text.slice(start, end)
        frag.appendChild(span)
        lastIndex = end
      }
      if (lastIndex < text.length) {
        frag.appendChild(document.createTextNode(text.slice(lastIndex)))
      }
      if (frag.childNodes.length) textNode.parentNode?.replaceChild(frag, textNode)
    })
  }

  // helper to immediately apply translations and wrapping (used by click handler)
  const applyNow = async (selectedLang: 'en'|'hi'|'hinglish') => {
    try {
      localStorage.setItem('preferredLang', selectedLang)

      // fast path: use global helper
      const gl = (window as any).__i18n
      try {
        translateDocument(selectedLang as any)
      } catch (e) {
        // fallback to global or dynamic import
        try {
          const gl = (window as any).__i18n
          if (gl && typeof gl.translateDocument === 'function') gl.translateDocument(selectedLang)
          else {
            const m = await import('../lib/i18n')
            try { m.translateDocument(selectedLang as any) } catch (e) {}
          }
        } catch (e) {}
      }

      // Force-apply any nodes that might not have been picked up by translateDocument
      try {
        const gl = (window as any).__i18n
        document.querySelectorAll('[data-i18n]').forEach((n) => {
          const key = (n as HTMLElement).getAttribute('data-i18n')
          if (!key) return
          const val = gl && typeof gl.t === 'function' ? gl.t(key, selectedLang) : t(key, selectedLang as any)

          if (n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) {
            n.placeholder = val
            return
          }

          const attr = (n as HTMLElement).getAttribute('data-i18n-attr')
          if (attr) {
            ;(n as HTMLElement).setAttribute(attr, val)
            if (n instanceof HTMLElement && n.childElementCount === 0) n.textContent = val
            return
          }

          if (n instanceof HTMLElement) n.textContent = val
        })
      } catch (e) {}

      // re-wrap Devanagari runs
      try { unwrapDevanagari(); wrapDevanagari(document.body) } catch (e) {}

      // notify other listeners
      try { window.dispatchEvent(new CustomEvent('preferredLangChange', { detail: selectedLang })) } catch (e) {}
    } catch (e) {}
  }

  // Add Hinglish support
  const langOptions = [
    { code: "en", label: "EN", title: "English" },
    { code: "hi", label: "HI", title: "हिन्दी" },
    { code: "hinglish", label: "HING", title: "Hinglish" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return

    // persist preference
    localStorage.setItem("preferredLang", lang)

    // apply translations first (ensure DOM updated), then notify components
    const applyTranslations = async () => {
      try {
        const gl = (window as any).__i18n
        const applyFromGlobal = () => {
          try {
            const g = (window as any).__i18n
            if (g && typeof g.translateDocument === 'function') {
              g.translateDocument(lang as any)
              return true
            }
          } catch (e) {}
          return false
        }

        if (applyFromGlobal()) {
          // re-wrap after translations
          setTimeout(() => { try { wrapDevanagari(document.body) } catch (e) {} }, 40)
          return
        }

        // listen for i18n ready and apply when available
        let done = false
        const onReady = () => {
          try { if (!done && applyFromGlobal()) { done = true; setTimeout(() => { try { wrapDevanagari(document.body) } catch (e) {} }, 40) } } catch (e) {}
          try { window.removeEventListener('i18n:ready', onReady) } catch (e) {}
        }
        try { window.addEventListener('i18n:ready', onReady) } catch (e) {}

        // No dynamic import here to avoid HMR module factory issues. If not attached yet, the 'i18n:ready' listener will handle it; otherwise translations may apply on next navigation or reload.
      } catch (e) {
        // swallow to avoid HMR crash
      }
    }

    applyTranslations().then(() => {
      // notify other components to update (they may re-render using t(key, lang) too)
      try { window.dispatchEvent(new CustomEvent("preferredLangChange", { detail: lang })) } catch (e) {}
    })

    // Apply lang attribute and classes for styling/behavior
    const root = document.documentElement

    // Cleanup wrappers from previous mode
    const unwrapDevanagari = () => {
      document.querySelectorAll('span[data-devanagari-wrapped="true"]').forEach((el) => {
        const parent = el.parentNode
        if (!parent) return
        parent.replaceChild(document.createTextNode(el.textContent || ''), el)
      })
    }

    const wrapDevanagari = (rootEl: ParentNode) => {
      const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null)
      const nodes: Text[] = []
      let node: Node | null
      while ((node = walker.nextNode())) {
        nodes.push(node as Text)
      }

      const devRange = /[\u0900-\u097F]+/g

      nodes.forEach((textNode) => {
        const parent = textNode.parentElement
        if (!parent) return
        // Skip scripts/styles and common form/markup containers
        if (parent.closest('script, style, textarea, code, pre, input, svg')) return
        // Skip already wrapped content
        if (parent.closest('[data-devanagari-wrapped="true"]')) return

        const text = textNode.nodeValue || ''
        if (!devRange.test(text)) return

        // create a document fragment and rebuild node with wraps
        const frag = document.createDocumentFragment()
        let lastIndex = 0
        devRange.lastIndex = 0
        let m
        while ((m = devRange.exec(text)) !== null) {
          const start = m.index
          const end = devRange.lastIndex
          if (start > lastIndex) {
            frag.appendChild(document.createTextNode(text.slice(lastIndex, start)))
          }
          const span = document.createElement('span')
          span.setAttribute('data-devanagari-wrapped', 'true')
          span.className = 'tiro-hindi'
          span.setAttribute('lang', 'hi')
          span.textContent = text.slice(start, end)
          frag.appendChild(span)
          lastIndex = end
        }
        if (lastIndex < text.length) {
          frag.appendChild(document.createTextNode(text.slice(lastIndex)))
        }
        if (frag.childNodes.length) textNode.parentNode?.replaceChild(frag, textNode)
      })
    }

    // Reset any previous styling
    root.classList.remove('tiro-hindi', 'hinglish-mode')

    if (lang === 'en') {
      root.setAttribute('lang', 'en')
      unwrapDevanagari()
    } else if (lang === 'hi') {
      root.setAttribute('lang', 'hi')
      // For Hindi mode, wrap only Devanagari runs so Latin text keeps its intended fonts.
      root.classList.remove('hinglish-mode')
      // first unwrap previous runs then wrap again
      unwrapDevanagari()
      wrapDevanagari(document.body)
      // ensure newly-translated nodes are wrapped after microtask
      setTimeout(() => wrapDevanagari(document.body), 50)
    } else if (lang === 'hinglish') {
      // use hindi lang for proper rendering; use hinglish mode to wrap only Devanagari runs
      root.setAttribute('lang', 'hi')
      root.classList.add('hinglish-mode')
      // first unwrap previous runs then wrap again
      unwrapDevanagari()
      wrapDevanagari(document.body)
      // ensure newly-translated nodes are wrapped after microtask
      setTimeout(() => wrapDevanagari(document.body), 50)
    }
  }, [lang])


  // current short label for active language (used for badge)
  const currentLabel = langOptions.find(opt => opt.code === lang)?.label || lang.toUpperCase();

  const node = (
    <div
      className={`
        fixed bottom-4 right-4 md:bottom-5 md:right-5 z-50
        flex flex-col items-center gap-2
        rounded-xl
        backdrop-blur-xl
        bg-white/40 dark:bg-black/40

        transition-all duration-500 ease-out
     px-2 py-2 shadow-md
      `}
    >
      {/* LANGUAGE SELECTOR (single menu button for all sizes) */}
      <div className="relative" ref={langMenuRef}>
        <button
          onClick={() => setLangMenuOpen((s) => !s)}
          onMouseEnter={() => { setHoverTarget('lang'); setHoverText(langOptions.find(o => o.code === lang)?.title || lang) }}
          onMouseLeave={() => { setHoverTarget(null); setHoverText(null) }}
          onFocus={() => { setHoverTarget('lang'); setHoverText(langOptions.find(o => o.code === lang)?.title || lang) }}
          onBlur={() => { setHoverTarget(null); setHoverText(null) }}
          aria-haspopup="true"
          aria-expanded={langMenuOpen}
          className="relative w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 text-sm font-medium border bg-white/30 dark:bg-white/5 border-stone-200 dark:border-white/10"
          title={`Language: ${lang}`}
        >
          {/* Globe icon */}
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="9" />
            <path d="M2 12h20" />
            <path d="M12 3v18" />
            <path d="M4.93 4.93l14.14 14.14" />
            <path d="M19.07 4.93L4.93 19.07" />
          </svg>
          <span className="sr-only">Language: {lang}</span>
        </button>
      {/* small badge with current lang label */}
          <span className="absolute -top-1 -right-1 text-[10px] leading-none px-1 rounded-full bg-white/90 dark:bg-stone-900 text-stone-900 dark:text-white border border-stone-200 dark:border-white/20">
            {currentLabel}
          </span>
        {hoverTarget === 'lang' && hoverText && (
          <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap px-3 py-1 rounded-md bg-stone-900 text-white text-xs shadow-md" aria-hidden>
            {hoverText}
          </span>
        )}

        <AnimatePresence>
          {langMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute bottom-full -right-1 pb-1 mb-2 flex flex-col gap-2 z-[9999]"
            >
              {langOptions.map((opt, idx) => (
                <div key={opt.code} className="relative">
                  <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.18, delay: idx * 0.04 }}
                    onClick={() => { setLang(opt.code); applyNow(opt.code as 'en'|'hi'|'hinglish'); setLangMenuOpen(false) }}
                    onMouseEnter={() => { setHoverTarget(opt.code); setHoverText(opt.title) }}
                    onMouseLeave={() => { setHoverTarget(null); setHoverText(null) }}
                    onFocus={() => { setHoverTarget(opt.code); setHoverText(opt.title) }}
                    onBlur={() => { setHoverTarget(null); setHoverText(null) }}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 text-sm font-medium border ${lang === opt.code ? "bg-white text-stone-900 border-stone-200 dark:bg-stone-900 dark:text-white dark:border-white/20 scale-105 ring-1" : "bg-white/30 dark:bg-white/5 border-stone-200 dark:border-white/10"}`}
                    aria-label={`Select ${opt.title}`}
                    title={opt.title}
                  >
                    {opt.code === 'en' ? <span className="text-sm font-medium">E</span> : (opt.code === 'hi' ? <span className="tiro-hindi text-sm font-medium">ह</span> : <span className="text-sm font-medium">H</span>)}
                  </motion.button>

                  {hoverTarget === opt.code && hoverText && (
                    <span className="pointer-events-none absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap px-3 py-1 rounded-md bg-stone-900 text-white text-xs shadow-md" aria-hidden>
                      {hoverText}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* THEME TOGGLE */}
      <button
        onClick={(e) => toggleTheme(e)}
        className="
          w-8 h-8
          flex items-center justify-center
          rounded-xl
          transition-all duration-200
          hover:scale-110
          hover:bg-black/5 dark:hover:bg-white/10
          active:scale-95
          border border-stone-200 dark:border-white/20 
        "
        aria-label="Toggle theme"
      >
        {isDark ? (
          <svg
            width="18"
            height="18"
            fill="currentColor"
            className="text-teal-300 drop-shadow-[0_0_6px_rgba(94,234,212,0.8)]"
          >
            <circle cx="9" cy="9" r="4" />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-stone-800"
          >
            <path d="M10 2a6 6 0 1 0 6 6A5 5 0 0 1 10 2z" />
          </svg>
        )}
      </button>


    </div>
  );

  if (typeof document === "undefined") return null;
  return createPortal(node, document.body);
}