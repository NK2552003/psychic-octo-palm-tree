"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { t, type LangCode } from '@/lib/i18n'


export default function SkillsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLElement | null>(null)
  const smallTitleRef = useRef<HTMLElement | null>(null)
  const arsenalRef = useRef<HTMLElement | null>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const doodlesRef = useRef<HTMLDivElement>(null)
  const [lang, setLang] = useState<LangCode>(typeof window !== 'undefined' ? ((localStorage.getItem('preferredLang') as LangCode) || 'en') : 'en')

  useEffect(() => {
    const onPref = (e: any) => setLang(((e && e.detail) as LangCode) || ((localStorage.getItem('preferredLang') as LangCode) || 'en'))
    window.addEventListener('preferredLangChange', onPref)
    window.addEventListener('storage', onPref)
    return () => {
      window.removeEventListener('preferredLangChange', onPref)
      window.removeEventListener('storage', onPref)
    }
  }, [])

  const splitGraphemes = (s: string) => {
    try {
      const Seg = (Intl as any).Segmenter
      if (typeof Seg === 'function') return Array.from(new Seg(undefined, { granularity: 'grapheme' }).segment(s), (seg: any) => seg.segment)
    } catch (e) {}
    return Array.from(s)
  }

  const leftSizes = ["clamp(10rem, 35vw, 35rem)", "clamp(9rem, 30vw, 30rem)", "clamp(11rem, 38vw, 38rem)"]
  const rightSizes = ["clamp(10rem, 34vw, 34rem)", "clamp(9rem, 31vw, 31rem)", "clamp(10.5rem, 36vw, 36rem)", "clamp(9rem, 30vw, 30rem)", "clamp(8rem, 27vw, 27rem)", "clamp(9rem, 30vw, 30rem)", "clamp(8rem, 27vw, 27rem)"]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-title-letter", {
        opacity: 0,
        y: 50,
        rotation: "random(-15, 15)",
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.08,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Arsenal letters animation — runs when the arsenal container is in view
      gsap.fromTo(
        ".arsenal-letter",
        { opacity: 0, y: 80, scale: 0.9, rotation: "random(-8, 8)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
          stagger: 0.06,
          scrollTrigger: {
            trigger: arsenalRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      )


      // Small 'Skills' badge: reveal only when it scrolls into view
      if (smallTitleRef.current) {
        gsap.fromTo(
          smallTitleRef.current,
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: smallTitleRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

 
  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8"
    >
      <span
          ref={smallTitleRef}
          id="skills"
          data-i18n="skills.badge"
          className="inline-block rounded-full border-2 px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all opacity-0 hover:scale-105 hover:bg-black hover:text-white"
        >
            Skills
        </span>
        <div
          className="relative left-0 right-0 top-8 sm:top-4 md:top-0 z-0 flex items-start justify-center pointer-events-none"
        >
          <div
            className="leading-none tracking-tighter flex items-start justify-center"
            style={{
              transform: "scaleX(0.3)",
              fontFamily: "var(--font-bebas), sans-serif",
              fontWeight: "700",
            }}
          >
            <span ref={titleRef} className="skill-title-wrap flex">
              {(() => {
                const left = t('skills.title.left', lang) || ''
                return splitGraphemes(left).map((ch, i) => (
                  <span key={`skill-left-${i}`} className="skill-title-letter inline-block" style={{ fontSize: leftSizes[i] ?? 'clamp(9rem, 30vw, 30rem)' }}>{ch}</span>
                ))
              })()}
            </span>

            <span style={{ fontSize: "clamp(5rem, 16vw, 16rem)" }}></span>

            <span ref={arsenalRef} className="arsenal-wrap flex">
              {(() => {
                const right = t('skills.title.right', lang) || ''
                return splitGraphemes(right).map((ch, i) => (
                  <span key={`arsenal-${i}`} className="arsenal-letter inline-block opacity-0" style={{ fontSize: rightSizes[i] ?? 'clamp(9rem, 30vw, 30rem)' }}>{ch}</span>
                ))
              })()}
            </span>
          </div>
        </div>

      </div>
  )
}
