"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { MoveUpRight } from "lucide-react"
const sections = [
  {label: "Home", id: "hero"},
  { label: "About Me", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Photography", id: "photography" },
  { label: "Experience", id: "qualifications" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

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
          <p>© 2025 Nitish's Portfolio</p>
          <p>All rights reserved.</p>
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
              }
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
                {sections.map(({ label, id }) => (
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
                        {label}
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
      <div className="my-14 h-[3px] bg-stone-300 dark:bg-[#06403b] footer-line" />

      {/* Bottom */}
      <div className="relative flex flex-row items-start sm:items-end justify-between gap-10 footer-fade">
        {/* Star */}
        <div className="text-[13vw] font-bold leading-none hidden md:block">*</div>

        {/* Signature Brand */}
        <div
          className=""
        >
          <svg
            className="signature-svg"
            viewBox="0 0 160 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path className="signature-path letter-n1" d="M2 45C3 39 12 23 20 14C18 37 22 43 25 43C28 43 33 31 43 5" />
            <path className="signature-path letter-i1" d="M4 23C3 24 0 30 2 29C4 28 6 26 8 25" transform="translate(40,0)" />
            <path className="signature-path letter-t" d="M1 16C7 14 16 14 23 16C12 14 16 10 18 6C10 17 0 37 2 37C3 37 9 29 14 25" transform="translate(42,0)" />
            <path className="signature-path letter-i2" d="M4 23C3 24 0 30 2 29C4 28 6 26 8 25" transform="translate(54,0)" />
            <path className="signature-path letter-s" d="M9 23C8 22 6 24 6 29C6 34 1 35 1 33C1 31 4 32 13 25" transform="translate(56,0)" />
            <path className="signature-path letter-h" d="M15 6C9 16 6 21 1 29C2 27 7 24 9 24C10 24 8 27 10 28C11 28 16 25 16 25" transform="translate(64,0)" />
            <path className="signature-path letter-k" d="M31 6C21 19 15 29 6 46C23 13 40 12 53 10C65 8 51 20 51 20C81 -7 -1 24 1 38C2 45 37 36 37 36" transform="translate(78,0)" />
            <path className="signature-path letter-u" d="M4 23C3 23 1 27 1 28C2 29 8 23 8 23C8 23 5 27 6 28C7 29 11 25 12 24" transform="translate(114,0)" />
            <path className="signature-path letter-m" d="M4 24L1 29C4 26 7 23 9 22C7 25 6 28 7 28C7 28 8 28 13 25C12 26 11 27 12 27C12 28 13 27 17 25" transform="translate(122,0)" />
            <path className="signature-path letter-a" d="M6 25C6 21 2 26 1 28C1 31 8 23 8 23C4 27 3 31 4 31C5 31 12 25 12 25" transform="translate(136,0)" />
            <path className="signature-path letter-r" d="M4 23L1 30C7 23 12 20 11 24" transform="translate(146,0)" />
          </svg>
        </div>
      </div>
    </footer>
  )
}
