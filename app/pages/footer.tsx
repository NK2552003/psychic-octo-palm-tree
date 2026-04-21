"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import gsap from "gsap"
import { MoveUpRight, ArrowUpRight } from "lucide-react"
import { t, type LangCode } from '@/lib/i18n'
import { toast } from "sonner"
import Signature from "@/components/signature"

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

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()
  const normalizedPath = (pathname || "/").replace(/\/+$/, "") || "/"
  const isLandingPage = normalizedPath === "/"
  const footerRef = useRef<HTMLDivElement>(null)
  const marqueRef = useRef<HTMLDivElement>(null)
  const [lang, setLang] = useState<LangCode>(
    typeof window !== "undefined"
      ? ((localStorage.getItem("preferredLang") as LangCode) || "en")
      : "en"
  )
  const [year] = useState(new Date().getFullYear())

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

  /* ── Lang sync ── */
  useEffect(() => {
    const onPref = (e: any) =>
      setLang(((e && e.detail) as LangCode) || ((localStorage.getItem("preferredLang") as LangCode) || "en"))
    window.addEventListener("preferredLangChange", onPref)
    window.addEventListener("storage", onPref)
    return () => {
      window.removeEventListener("preferredLangChange", onPref)
      window.removeEventListener("storage", onPref)
    }
  }, [])

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

  const handleBackHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }
    router.push("/")
  }

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-stone-200 dark:bg-[#042f2e] text-stone-800 dark:text-stone-100"
    >

      {/* ── Noise texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06] z-0"
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

            <div className="space-y-1">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500 dark:text-teal-600 mb-3">
                Recognition
              </p>
              <a
                href="https://wdawards.com/web/an-interactive-dev-portfolio"
                onClick={(e) => {
                  e.preventDefault()
                  try { window.open("https://wdawards.com/web/an-interactive-dev-portfolio", "_blank", "noopener") } catch {}
                  try {
                    toast(t("wdawards.toast.title"), {
                      description: t("wdawards.toast.desc"),
                      action: { label: t("wdawards.action"), onClick: () => { try { window.open("https://wdawards.com/web/an-interactive-dev-portfolio", "_blank", "noopener") } catch {} } },
                    })
                  } catch {}
                }}
                className="group inline-flex items-center gap-2 text-base font-medium hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-200"
              >
                {t("footer.wdawards")}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="space-y-1 text-xs text-stone-500 dark:text-white/80">
              <a href="/cookies" className="block hover:text-stone-700 dark:hover:text-white transition-colors duration-150">
                Cookie Policy
              </a>
              <a href="/privacy" className="block hover:text-stone-700 dark:hover:text-white transition-colors duration-150">
                Privacy Policy
              </a>
              <a href="/process" className="block hover:text-stone-700 dark:hover:text-white transition-colors duration-150">
                How I Work
              </a>
              <a href="/pricing" className="block hover:text-stone-700 dark:hover:text-white transition-colors duration-150">
                Pricing
              </a>
              {!isLandingPage && (
                <a
                  href="/"
                  onClick={handleBackHome}
                  className="block pt-1 text-sm font-medium text-stone-700 dark:text-stone-200 hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-150"
                >
                  ← Back to Home
                </a>
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

    </footer>
  )
}