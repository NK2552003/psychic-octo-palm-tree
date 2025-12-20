"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SkillsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLElement | null>(null)
  const smallTitleRef = useRef<HTMLElement | null>(null)
  const arsenalRef = useRef<HTMLElement | null>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const doodlesRef = useRef<HTMLDivElement>(null)

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

      gsap.from(".skill-doodle-path", {
        strokeDashoffset: 1000,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger: doodlesRef.current,
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

      gsap.to(".skill-doodle-float", {
        y: "random(-15, 15)",
        x: "random(-8, 8)",
        rotation: "random(-5, 5)",
        duration: "random(2.5, 4)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 1.5,
          from: "random",
        },
      })

      gsap.to(".skill-doodle-wobble", {
        rotation: "random(-12, 12)",
        scale: "random(0.95, 1.05)",
        duration: "random(3, 4.5)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 2,
          from: "random",
        },
      })

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
      <div ref={doodlesRef} className="skill-doodles absolute inset-0 pointer-events-none z-[5]" aria-hidden="true">
        {/* Code brackets - top left */}
        <svg
          className="absolute left-[3%] top-[8%] w-24 h-28 skill-doodle-float opacity-25 hidden md:block"
          viewBox="0 0 100 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ strokeDasharray: 1000 }}
        >
          <path className="skill-doodle-path" d="M70 20 L40 20 L25 60 L40 100 L70 100" />
          <path className="skill-doodle-path" d="M30 20 L10 20 L2 60 L10 100 L30 100" opacity="0.6" />
        </svg>

        {/* Terminal window - top right */}
        <svg
          className="absolute right-[4%] top-[12%] w-32 h-24 skill-doodle-wobble opacity-30 hidden lg:block"
          viewBox="0 0 160 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1000 }}
        >
          <rect className="skill-doodle-path" x="8" y="8" width="144" height="84" rx="6" />
          <line className="skill-doodle-path" x1="8" y1="24" x2="152" y2="24" />
          <circle className="skill-doodle-path" cx="20" cy="16" r="3" fill="currentColor" />
          <circle className="skill-doodle-path" cx="32" cy="16" r="3" fill="currentColor" />
          <circle className="skill-doodle-path" cx="44" cy="16" r="3" fill="currentColor" />
          <line className="skill-doodle-path" x1="20" y1="40" x2="35" y2="40" strokeWidth="2" />
          <line className="skill-doodle-path" x1="20" y1="52" x2="60" y2="52" strokeWidth="2" />
          <line className="skill-doodle-path" x1="20" y1="64" x2="45" y2="64" strokeWidth="2" />
          <rect className="skill-doodle-path" x="18" y="74" width="8" height="12" fill="currentColor" opacity="0.7" />
        </svg>

        {/* Coffee cup - left middle */}
        <svg
          className="absolute left-[5%] top-[45%] w-20 h-24 skill-doodle-float opacity-28 hidden lg:block"
          viewBox="0 0 100 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1000 }}
        >
          <path className="skill-doodle-path" d="M20 40 L20 85 C20 92 25 95 35 95 L65 95 C75 95 80 92 80 85 L80 40" />
          <line className="skill-doodle-path" x1="15" y1="40" x2="85" y2="40" />
          <path className="skill-doodle-path" d="M80 50 L90 50 C95 50 95 65 90 65 L80 65" />
          <path className="skill-doodle-path" d="M35 15 Q35 25, 40 30" opacity="0.5" />
          <path className="skill-doodle-path" d="M50 12 Q50 22, 55 27" opacity="0.5" />
          <path className="skill-doodle-path" d="M65 15 Q65 25, 70 30" opacity="0.5" />
        </svg>

        {/* Lightbulb - right middle */}
        <svg
          className="absolute right-[6%] top-[48%] w-20 h-28 skill-doodle-wobble opacity-32 hidden lg:block"
          viewBox="0 0 100 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1000 }}
        >
          <circle className="skill-doodle-path" cx="50" cy="35" r="20" />
          <path className="skill-doodle-path" d="M35 50 Q35 65, 40 75 L60 75 Q65 65, 65 50" />
          <line className="skill-doodle-path" x1="40" y1="75" x2="40" y2="85" />
          <line className="skill-doodle-path" x1="60" y1="75" x2="60" y2="85" />
          <line className="skill-doodle-path" x1="38" y1="85" x2="62" y2="85" />
          <line className="skill-doodle-path" x1="42" y1="90" x2="58" y2="90" />
          <line className="skill-doodle-path" x1="50" y1="12" x2="50" y2="18" opacity="0.6" />
          <line className="skill-doodle-path" x1="72" y1="20" x2="68" y2="24" opacity="0.6" />
          <line className="skill-doodle-path" x1="28" y1="20" x2="32" y2="24" opacity="0.6" />
        </svg>

        {/* Laptop - bottom left */}
        <svg
          className="absolute left-[8%] bottom-[15%] w-32 h-24 skill-doodle-float opacity-30 hidden md:block"
          viewBox="0 0 160 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1000 }}
        >
          <rect className="skill-doodle-path" x="30" y="10" width="100" height="60" rx="4" />
          <rect className="skill-doodle-path" x="35" y="15" width="90" height="50" rx="2" opacity="0.5" />
          <path className="skill-doodle-path" d="M10 70 L30 70 L30 70 L130 70 L130 70 L150 70 L145 82 L15 82 Z" />
          <line className="skill-doodle-path" x1="50" y1="30" x2="70" y2="30" strokeWidth="2" opacity="0.6" />
          <line className="skill-doodle-path" x1="50" y1="40" x2="90" y2="40" strokeWidth="2" opacity="0.6" />
          <line className="skill-doodle-path" x1="50" y1="50" x2="80" y2="50" strokeWidth="2" opacity="0.6" />
        </svg>

        {/* Rocket - bottom right */}
        <svg
          className="absolute right-[8%] bottom-[18%] w-24 h-32 skill-doodle-wobble opacity-28 hidden md:block"
          viewBox="0 0 100 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1000 }}
        >
          <path className="skill-doodle-path" d="M50 10 L60 50 L75 80 L50 75 L25 80 L40 50 Z" />
          <circle className="skill-doodle-path" cx="50" cy="35" r="8" />
          <path className="skill-doodle-path" d="M25 80 L15 95 L25 90 Z" />
          <path className="skill-doodle-path" d="M75 80 L85 95 L75 90 Z" />
          <path className="skill-doodle-path" d="M40 95 Q35 110, 35 120" opacity="0.5" />
          <path className="skill-doodle-path" d="M50 98 Q50 115, 50 125" opacity="0.5" />
          <path className="skill-doodle-path" d="M60 95 Q65 110, 65 120" opacity="0.5" />
        </svg>

        {/* Git branch - top center-left */}
        <svg
          className="absolute left-[22%] top-[6%] w-28 h-28 skill-doodle-float opacity-26 hidden lg:block"
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1000 }}
        >
          <circle className="skill-doodle-path" cx="30" cy="20" r="8" />
          <line className="skill-doodle-path" x1="30" y1="28" x2="30" y2="92" />
          <circle className="skill-doodle-path" cx="30" cy="100" r="8" />
          <path className="skill-doodle-path" d="M30 45 Q50 45, 70 50" />
          <line className="skill-doodle-path" x1="70" y1="50" x2="70" y2="72" />
          <circle className="skill-doodle-path" cx="70" cy="80" r="8" />
        </svg>

        {/* Mobile device */}
        <svg
          className="absolute left-[8%] top-[25%] w-16 h-24 skill-doodle-wobble opacity-25 sm:w-20 sm:h-28"
          viewBox="0 0 80 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1000 }}
        >
          <rect className="skill-doodle-path" x="10" y="10" width="60" height="100" rx="8" />
          <circle className="skill-doodle-path" cx="40" cy="18" r="2" />
          <rect className="skill-doodle-path" x="18" y="28" width="44" height="68" rx="2" opacity="0.5" />
          <circle className="skill-doodle-path" cx="40" cy="103" r="3" />
        </svg>

        {/* Star sparkles */}
        <svg
          className="absolute right-[25%] top-[20%] w-12 h-12 skill-doodle-float opacity-20"
          viewBox="0 0 60 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ strokeDasharray: 1000 }}
        >
          <path className="skill-doodle-path" d="M30 10 L32 25 L45 28 L32 32 L30 50 L28 32 L15 28 L28 25 Z" />
        </svg>

        <svg
          className="absolute left-[70%] top-[70%] w-10 h-10 skill-doodle-wobble opacity-22 hidden sm:block"
          viewBox="0 0 60 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ strokeDasharray: 1000 }}
        >
          <path className="skill-doodle-path" d="M30 10 L32 25 L45 28 L32 32 L30 50 L28 32 L15 28 L28 25 Z" />
        </svg>

        <svg
          className="absolute left-[15%] bottom-[35%] w-10 h-10 skill-doodle-float opacity-18 hidden md:block"
          viewBox="0 0 60 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ strokeDasharray: 1000 }}
        >
          <path className="skill-doodle-path" d="M30 10 L32 25 L45 28 L32 32 L30 50 L28 32 L15 28 L28 25 Z" />
        </svg>

        {/* Pencil - bottom center */}
        <svg
          className="absolute left-[45%] bottom-[8%] w-24 h-8 skill-doodle-float opacity-28 hidden sm:block"
          viewBox="0 0 120 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1000 }}
        >
          <path className="skill-doodle-path" d="M10 20 L95 20 L110 10 L115 20 L110 30 L95 20 Z" />
          <line className="skill-doodle-path" x1="10" y1="15" x2="10" y2="25" />
          <line className="skill-doodle-path" x1="95" y1="20" x2="20" y2="20" opacity="0.4" />
        </svg>
      </div>
      <span
          ref={smallTitleRef}
          className="inline-block rounded-full border-2 px-6 py-2 text-sm font-medium transition-all opacity-0 hover:scale-105 hover:bg-black hover:text-white"
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
              <span className="skill-title-letter inline-block" style={{ fontSize: "clamp(10rem, 35vw, 35rem)" }}>
                T
              </span>
              <span className="skill-title-letter inline-block" style={{ fontSize: "clamp(9rem, 30vw, 30rem)" }}>
                H
              </span>
              <span className="skill-title-letter inline-block" style={{ fontSize: "clamp(11rem, 38vw, 38rem)" }}>
                E
              </span>
            </span>

            <span style={{ fontSize: "clamp(5rem, 16vw, 16rem)" }}></span>

            <span ref={arsenalRef} className="arsenal-wrap flex">
              <span className="arsenal-letter inline-block opacity-0" style={{ fontSize: "clamp(10rem, 34vw, 34rem)" }}>
                A
              </span>
              <span className="arsenal-letter inline-block opacity-0" style={{ fontSize: "clamp(9rem, 31vw, 31rem)" }}>
                R
              </span>
              <span className="arsenal-letter inline-block opacity-0" style={{ fontSize: "clamp(10.5rem, 36vw, 36rem)" }}>
                S
              </span>
              <span className="arsenal-letter inline-block opacity-0" style={{ fontSize: "clamp(9rem, 30vw, 30rem)" }}>
                E
              </span>
              <span className="arsenal-letter inline-block opacity-0" style={{ fontSize: "clamp(10.5rem, 36vw, 36rem)" }}>
                N
              </span>
              <span className="arsenal-letter inline-block opacity-0" style={{ fontSize: "clamp(9rem, 30vw, 30rem)" }}>
                A
              </span>
              <span className="arsenal-letter inline-block opacity-0" style={{ fontSize: "clamp(8rem, 27vw, 27rem)" }}>
                L
              </span>
            </span>
          </div>
        </div>

      </div>
  )
}
