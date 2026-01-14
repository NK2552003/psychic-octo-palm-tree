"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { createPortal } from "react-dom";

export default function FloatingControls({
  toggleTheme,
  isDark,
}: { toggleTheme: (e: MouseEvent<HTMLButtonElement>) => void; isDark: boolean }) {

  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("preferredLang") || "en";
  });

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
    window.dispatchEvent(new CustomEvent("preferredLangChange", { detail: lang }))

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


  const node = (
    <div
      className={`
        fixed bottom-4 right-4 md:bottom-5 md:right-5 z-50
        flex items-center
        rounded-xl
        backdrop-blur-xl
        bg-white/40 dark:bg-black/40

        transition-all duration-500 ease-out
     px-2 py-2 gap-2 shadow-md
      `}
    >
      {/* LANGUAGE SELECTOR */}
      <div className="flex items-center gap-1 px-1 z-100">
        {langOptions.map(opt => (
          <button
            key={opt.code}
            onClick={() => setLang(opt.code)}
            className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 text-sm font-medium border ${lang === opt.code ? "bg-white text-stone-900 border-stone-200 dark:bg-stone-900 dark:text-white dark:border-white/20 scale-105 ring-2 ring-teal-300/40" : "bg-white/30 dark:bg-white/5 border-stone-200 dark:border-white/10"}`}
            aria-label={`Select ${opt.title}`}
            title={opt.title}
          >
            {opt.label}
          </button>
        ))}
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