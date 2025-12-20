"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { MoveUpRight } from "lucide-react"

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
          <p>(312) 555-2468</p>
          <p>© 2025 Nitish's Portfolio</p>
          <p>All rights reserved.</p>
        </div>

        {/* Center Social */}
        <div className="flex flex-col items-start lg:items-center space-y-6 footer-fade">
          {["Github", "LinkedIn", "Instagram"].map((item, idx) => (
            <a
              key={item}
              href="#"
              className="group relative text-4xl sm:text-5xl font-semibold tracking-tight"
            >
              <span className="flex items-center gap-3">
                {item}
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
        <div className="grid gap-8 text-sm footer-fade justify-end items-end hidden md:block ">
          <div>
            <p className="mb-4 text-end ">Navigation</p>
            <ul className="space-y-2 flex flex-col justify-end items-end">
              {[
                "Home",
                "About",
                "Skills",
                "Qualifications",
                "Projects",
                "Contact",
              ].map((nav) => (
                <li key={nav}>
                  <a
                    href="#"
                    className="transition-colors transition-transform duration-200 ease-out inline-block hover:text-teal-700 dark:hover:text-teal-300 hover:translate-x-1 focus:outline-none focus:underline"
                  >
                    {nav}
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
        <div className="text-[13vw] font-bold leading-none">*</div>

        {/* Brand */}
        <div className="text-[18vw] sm:text-[14vw] leading-none font-serif">
  Nîtiśh

        </div>
      </div>
    </footer>
  )
}
