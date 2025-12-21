"use client"

import Header from "@/components/Header"
import HeroLeft from "@/components/HeroLeft"
import HeroRight from "@/components/HeroRight"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [time, setTime] = useState("")
  const [showScrollCue, setShowScrollCue] = useState(true)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      setTime(formatted)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.3
      setShowScrollCue(window.scrollY < threshold)
    }

    onScroll() // run once on mount
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.6,
      behavior: "smooth",
    })
  }

  return (
    <section id="hero" className="relative md:h-[900px] mb-20 md:mb-0 flex flex-col overflow-hidden">
      {/* HEADER */}
      <Header time={time} />

      {/* HERO */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div
          className="
            w-full
            max-w-7xl
            grid
            grid-cols-1
            md:grid-cols-2
            gap-16
            lg:gap-24
            items-center
          "
        >
          <HeroLeft />
          <HeroRight />
        </div>
      </main>

      {/* SCROLL DOWN INDICATOR */}
      <div
        className={`
          pointer-events-none
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          hidden
          lg:flex
          flex-col
          items-center
          gap-2
          transition-all
          duration-500
          ease-out
          ${
            showScrollCue
              ? "opacity-90 translate-y-0"
              : "opacity-0 translate-y-4"
          }
        `}
      >
        <span className="hero-jelly text-[11px] tracking-[0.35em] font-medium text-stone-700 dark:text-teal-300">
          SCROLL
        </span>
 <button
          onClick={scrollDown}
          aria-label="Scroll down"
          className="transition-opacity
          duration-300
          ease-in-out
            pointer-events-auto
            relative
            group
            cursor-pointer
            focus:outline-none
            p-5
          "
        >
        <div className="scroll-arrow relative">
          {/* glow */}
          <span className="absolute inset-0 rounded-full blur-md bg-stone-400/30 dark:bg-teal-300/30" />

          <svg
            width="20"
            height="32"
            viewBox="0 0 24 36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="relative text-stone-800 dark:text-teal-300"
          >
            <line x1="12" y1="4" x2="12" y2="28" />
            <polyline points="6 22 12 28 18 22" />
          </svg>
        </div>
        </button>
      </div>
    </section>
  )
}
