"use client"

import { useEffect, useRef, useState, useSyncExternalStore } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useParallax } from "@/lib/useParallax"
import { isMobile } from "@/lib/deviceDetection"
import { MoveUpRight, ArrowUpRight } from "lucide-react"
import { TrophyIcon, AwardMedalIcon, AstonishingAwardIcon } from "@/components/icons"
import { t, type LangCode } from '@/lib/i18n'
import TransitionLink from "@/components/TransitionLink"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

function getLanguage(): LangCode {
  try {
    const lang = localStorage.getItem("preferredLang")
    return lang === "hi" || lang === "hinglish" ? lang : "en"
  } catch {
    return "en"
  }
}

function subscribeLanguage(onChange: () => void) {
  window.addEventListener("preferredLangChange", onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener("preferredLangChange", onChange)
    window.removeEventListener("storage", onChange)
  }
}

const sections = [
  { id: "hero" },
  { id: "about" },
  { id: "skills" },
  { id: "projects" },
  { id: "photography" },
  { id: "qualifications" },
  { id: "contact" },
]

const socials = [
  { name: "Github",    url: "https://github.com/nk2552003" },
  { name: "LinkedIn",  url: "https://www.linkedin.com/in/nk2552003/" },
  { name: "Instagram", url: "https://www.instagram.com/natur_hacks/" },
  { name: "Uiverse",   url: "https://uiverse.io/profile/NK2552003" },
]

const ATELIER_LETTERS = Array.from("ATELIER DE CRÉATION")

export default function Footer() {
  const pathname = usePathname()
  const normalizedPath = (pathname || "/").replace(/\/+$/, "") || "/"
  const isLandingPage = normalizedPath === "/"
  const footerRef = useRef<HTMLDivElement>(null)
  const marqueRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const atelierSectionRef = useRef<HTMLElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const lang = useSyncExternalStore(subscribeLanguage, getLanguage, (): LangCode => "en")
  const [year] = useState(new Date().getFullYear())

  // Initialize micro-parallax depth on footer elements (disabled on mobile)
  const parallaxEnabled = typeof window !== "undefined" ? !isMobile() : true
  useParallax(footerRef, parallaxEnabled)

  /* ── Parallax scroll effect ── */
  useEffect(() => {
    const footerEl = footerRef.current
    if (!footerEl) return

    const ctx = gsap.context(() => {
      // Letter-by-letter physical bottom-to-top reveal and top-to-bottom hide (no fade)
      const letters = footerEl.querySelectorAll(".atelier-letter")
      if (letters && letters.length > 0) {
        gsap.fromTo(
          letters,
          {
            y: "125%",
          },
          {
            y: "0%",
            duration: 0.55,
            stagger: 0.025,
            ease: "power3.out",
            scrollTrigger: {
              trigger: atelierSectionRef.current || footerEl,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      // Parallax for the typography container: glides smoothly into 88% reveal on last hit (end of scroll)
      if (textContainerRef.current) {
        gsap.fromTo(
          textContainerRef.current,
          { y: 12 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: footerEl,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.8,
            },
          }
        )
      }

      // Parallax for the noise texture layer
      gsap.fromTo(
        ".footer-noise-layer",
        { y: -25 },
        {
          y: 25,
          ease: "none",
          scrollTrigger: {
            trigger: footerEl,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  /* ── GSAP entrance ── */
  useEffect(() => {
    if (!footerRef.current) return

    const revealEls = footerRef.current.querySelectorAll(".f-reveal")
    const lineEls = footerRef.current.querySelectorAll(".f-line")

    if (!isLandingPage) {
      // Ensure footer never stays hidden when navigating away from home.
      gsap.set(revealEls, { clearProps: "all", opacity: 1, y: 0 })
      gsap.set(lineEls, { clearProps: "all", scaleX: 1 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(".f-reveal", {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.06,
      })
      gsap.fromTo(".f-line", {
        scaleX: 0,
        transformOrigin: "left",
      }, {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
      })
    }, footerRef)
    return () => ctx.revert()
  }, [isLandingPage])

  /* ── Marquee animation ── */
  useEffect(() => {
    if (!marqueRef.current) return

    const track = marqueRef.current.querySelector(".marquee-track")
    if (!track) return

    if (!isLandingPage) {
      gsap.set(track, { clearProps: "transform" })
      return
    }

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      })
    }, marqueRef)
    return () => ctx.revert()
  }, [isLandingPage])

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - 12, behavior: "smooth" })
      history.replaceState(null, "", `#${id}`)
      return
    }

    if (typeof window !== "undefined") {
      window.location.href = id === "hero" ? "/" : `/#${id}`
    }
  }

  return (
    <footer
      ref={footerRef}
      className="relative w-full"
    >
      {/* ── Top section: Half-cut typography emerging into the footer ── */}
      <section
        ref={atelierSectionRef}
        className="hidden lg:flex relative w-full items-start justify-center overflow-hidden bg-transparent select-none pointer-events-none -mb-[1px]"
        style={{
          ['--atelier-fs' as any]: 'clamp(4.5rem, 9.5vw, 13rem)',
          height: 'calc(var(--atelier-fs) * 0.695)',
        }}
      >
        <div
          ref={textContainerRef}
          className="relative flex items-center justify-center font-black uppercase tracking-[-0.01em] whitespace-nowrap leading-none w-full max-w-full px-4"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "var(--atelier-fs)",
            color: "var(--footer-bg-fill, #042f2e)",
            marginTop: "calc(var(--atelier-fs) * -0.04)",
          }}
        >
          {ATELIER_LETTERS.map((char, index) => (
            <span
              key={index}
              className="atelier-letter inline-block"
              style={{ willChange: "transform" }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </section>

      {/* ── Colored Footer Body ── */}
      <div className="relative overflow-hidden bg-stone-200 dark:bg-[#042f2e] text-stone-800 dark:text-stone-100">
        {/* ── Noise texture overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06] z-0 footer-noise-layer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

      {/* ── Marquee ── */}
      {isLandingPage && (
        <div ref={marqueRef} className="f-reveal border-b border-stone-300 dark:border-teal-900/60 overflow-hidden py-4 relative z-10">
          <div className="marquee-track flex gap-0 whitespace-nowrap w-max">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-6 px-8 text-xs font-mono uppercase tracking-[0.25em] text-stone-500 dark:text-teal-500/70"
              >
                Available for Freelance
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse" />
                Full-Stack Developer
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-teal-700" />
                Open to Collaboration
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 animate-pulse" />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Main body ── */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 pt-16 pb-12">

        

        {/* ── 3-col grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6">

          {/* Col 1 — identity */}
          <div className="md:col-span-4 space-y-6 f-reveal">
            <div className="space-y-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500 dark:text-teal-600 mb-3">
                Contact
              </p>
              <a
                href="mailto:nk2552003@gmail.com"
                className="group inline-flex items-center gap-2 text-base font-medium hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200"
              >
                nk2552003@gmail.com
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500 dark:text-teal-600 mb-2">
                Recognition
              </p>

              {/* Astonishing Awards — Project Of The Day */}
              <div className="space-y-1">
                <a
                  href="https://astonishingawards.com/nominee/nitish-portfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200"
                >
                  <div className="inline-flex items-center gap-2 text-base font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <AstonishingAwardIcon className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
                      Astonishing Awards
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                      <TrophyIcon className="w-3 h-3 text-amber-600 dark:text-amber-400 shrink-0" aria-hidden="true" />
                      Project Of The Day
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-xs text-stone-600 dark:text-teal-300/80 font-mono group-hover:text-teal-700 dark:group-hover:text-teal-200 transition-colors duration-200">
                    October 7, 2026 · Site of the Day selection
                  </p>
                </a>
              </div>

              {/* WD Awards — Nominee */}
              <div className="space-y-1 pt-0.5">
                <a
                  href="https://wdawards.com/web/an-interactive-dev-portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200"
                >
                  <div className="inline-flex items-center gap-2 text-base font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <AwardMedalIcon className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" aria-hidden="true" />
                      WD Awards
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-stone-300/60 dark:bg-teal-900/40 text-stone-600 dark:text-teal-300 border border-stone-400/30 dark:border-teal-700/30">
                      Nominee
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-xs text-stone-600 dark:text-teal-300/80 font-mono group-hover:text-teal-700 dark:group-hover:text-teal-200 transition-colors duration-200">
                    Portfolio category · January 2026
                  </p>
                </a>
              </div>
            </div>

            <div className="space-y-1 text-xs text-stone-500 dark:text-white/80">
              <TransitionLink href="/simple" className="block hover:text-stone-700 dark:hover:text-white transition-colors duration-150">Simple portfolio</TransitionLink>
              <TransitionLink href="/cookies" className="block hover:text-stone-700 dark:hover:text-white transition-colors duration-150">
                Cookie Policy
              </TransitionLink>
              <TransitionLink href="/privacy" className="block hover:text-stone-700 dark:hover:text-white transition-colors duration-150">
                Privacy Policy
              </TransitionLink>
              <TransitionLink href="/process" className="block hover:text-stone-700 dark:hover:text-white transition-colors duration-150">
                How I Work
              </TransitionLink>
              <TransitionLink href="/pricing" className="block hover:text-stone-700 dark:hover:text-white transition-colors duration-150">
                Pricing
              </TransitionLink>
              {!isLandingPage && (
                <TransitionLink
                  href="/"
                  className="block pt-1 text-sm font-medium text-stone-700 dark:text-stone-200 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-150"
                >
                  ← Back to Home
                </TransitionLink>
              )}
            </div>
          </div>

          {/* Col 2 — nav */}
          {isLandingPage && (
            <div className="hidden md:block md:col-span-3 f-reveal">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500 dark:text-teal-600 mb-6">
                Navigation
              </p>
              <ul className="space-y-3">
                {sections.map(({ id }) => (
                  <li key={id} className="overflow-hidden">
                    <a
                      href={`#${id}`}
                      onClick={scrollTo(id)}
                      className="group relative inline-flex items-center gap-2 text-sm font-medium cursor-pointer transition-all duration-300 ease-out hover:translate-x-1"
                    >
                      <span className="w-4 h-[1px] bg-stone-400 dark:bg-teal-700 group-hover:w-6 group-hover:bg-teal-600 dark:group-hover:bg-teal-400 transition-all duration-300 ease-out" />
                      <span className="hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200">
                        {t(`nav.${id === "hero" ? "home" : id === "qualifications" ? "experience" : id}`, lang)}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Col 3 — socials */}
          <div className={`${isLandingPage ? "md:col-span-5" : "md:col-span-8"} f-reveal`}>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500 dark:text-teal-600 mb-6">
              Social
            </p>
            <div className="space-y-2">
              {socials.map((item, idx) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-3 border-b border-stone-300/60 dark:border-teal-900/50 hover:border-teal-500 dark:hover:border-teal-500 transition-all duration-300 overflow-hidden"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-mono text-stone-400 dark:text-teal-700 w-5 tabular-nums">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xl sm:text-2xl font-semibold tracking-tight group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors duration-200">
                      {item.name}
                    </span>
                  </div>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full border border-stone-300 dark:border-teal-800 flex items-center justify-center group-hover:bg-teal-600 group-hover:border-teal-600 dark:group-hover:bg-teal-500 dark:group-hover:border-teal-500 transition-all duration-300">
                    <MoveUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 pb-8">
        <div className="f-line h-[1px] bg-stone-300 dark:bg-teal-900/70 mb-6" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-stone-500 dark:text-stone-100">
          <span data-i18n="footer.copyright">© {year} Nitish Kumar. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Built with Next.js & GSAP
          </span>
        </div>
      </div>

      </div>

    </footer>
  )
}