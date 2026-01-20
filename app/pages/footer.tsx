"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { MoveUpRight } from "lucide-react"
import { t, type LangCode } from '@/lib/i18n'
import { toast } from "sonner"
const sections = [
  { id: "hero" },
  { id: "about" },
  { id: "skills" },
  { id: "projects" },
  { id: "photography" },
  { id: "qualifications" },
  { id: "contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const [lang, setLang] = useState<LangCode>(typeof window !== 'undefined' ? ((localStorage.getItem('preferredLang') as LangCode) || 'en') : 'en')

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(".footer-fade", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.12,
      })

      gsap.from(".footer-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "power3.out",
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const onPref = (e: any) => setLang(((e && e.detail) as LangCode) || ((localStorage.getItem('preferredLang') as LangCode) || 'en'))
    window.addEventListener('preferredLangChange', onPref)
    window.addEventListener('storage', onPref)
    return () => {
      window.removeEventListener('preferredLangChange', onPref)
      window.removeEventListener('storage', onPref)
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 overflow-hidden bg-stone-200 dark:bg-[#042f2e]"
    >
      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 footer-fade">
        {/* Left */}
        <div className="space-y-4 text-sm">
          <p className="text-lg md:text-xl">nk2552003@gmail.com</p>
          <p data-i18n="footer.copyright">© 2026 Nitish's Portfolio</p>
          <p data-i18n="footer.all_rights">All rights reserved.</p>
          <p><a href="/cookies" data-i18n="footer.cookie_policy" className="underline">Cookie Policy</a></p>
          <p>
            <a
              href="https://wdawards.com/web/an-interactive-dev-portfolio"
              onClick={(e) => {
                e.preventDefault()
                try { window.open('https://wdawards.com/web/an-interactive-dev-portfolio', '_blank', 'noopener') } catch (err) {}
                try {
                  toast(t('wdawards.toast.title'), {
                    description: t('wdawards.toast.desc'),
                    action: { label: t('wdawards.action'), onClick: () => { try { window.open('https://wdawards.com/web/an-interactive-dev-portfolio', '_blank', 'noopener') } catch (e) {} } }
                  })
                } catch (err) {}
              }}
              className="underline"
            >
              {t('footer.wdawards')}
            </a>
          </p>
        </div>

        {/* Center Social */}
        <div className="flex flex-col items-start lg:items-center space-y-6 footer-fade">
        {[
              {
                name: "Github",
                url: "https://github.com/nk2552003"
              },
              {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/nk2552003/"
              },
              {
                name: "Instagram",
                url: "https://www.instagram.com/natur_hacks/"
              },
              {
                name: "Uiverse",
                url: "https://uiverse.io/profile/NK2552003"
              },
            ].map((item, idx) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-4xl sm:text-5xl font-semibold tracking-tight"
              >
                <span className="flex items-center gap-3">
                  {item.name}
                  {idx === 0 ? (
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-teal-700/80 bg-stone-700 border border-stone-700 dark:border-white/20 text-white transition-transform transition-colors duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
                      <MoveUpRight className="w-4 h-4" />
                    </span>
                  ) : (
                    <span className="inline-block text-2xl transition-transform transition-colors duration-200 ease-out group-hover:translate-x-1 group-hover:-translate-y-1">
                      <MoveUpRight />
                    </span>
                  )}
                </span>
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-stone-700 dark:bg-teal-600/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out origin-left" />
              </a>
            ))}
        </div>

        {/* Right */}
<div className="grid gap-8 text-sm footer-fade justify-end items-end hidden md:block">
 <div>
              <ul className="space-y-4 text-lg text-end">
                {sections.map(({ id }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(id);
                        if (el) {
                          const rect = el.getBoundingClientRect();
                          const targetY = window.scrollY + rect.top - 12;
                          window.scrollTo({ top: targetY, behavior: "smooth" });
                          history.replaceState(null, "", `#${id}`);
                        } else {
                          const routeMap: Record<string, string> = {
                            home: "/hero",
                            about: "/aboutme",
                            skills: "/skills",
                            projects: "/projects",
                            photography: "/photography",
                            experience: "/qualifications",
                            contact: "/contact",
                          };
                          const path = routeMap[id] ?? "/";
                          window.location.href = `${path}#${id}`;
                        }
                      }}
                      className="group relative inline-flex items-center hero-jelly cursor-pointer transition-all duration-300 ease-out hover:translate-x-2 active:scale-95 text-end"
                    >
                      <span className="relative">
                        {t(`nav.${id === 'hero' ? 'home' : id === 'qualifications' ? 'experience' : id}`, lang)}
                        <span className="pointer-events-none absolute right-0 -bottom-1 h-[2px] w-full bg-stone-800 dark:bg-teal-300 origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
</div>

      </div>

      {/* Divider */}
      <div className="mt-12 h-[3px] bg-stone-300 dark:bg-[#06403b] footer-line" />

    </footer>
  )
}
