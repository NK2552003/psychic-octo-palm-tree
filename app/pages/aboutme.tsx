"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const quotesRef = useRef<HTMLDivElement>(null)
  const worksRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const doodlesRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate About Me badge when it scrolls into view
      if (aboutRef.current) {
        gsap.fromTo(
          aboutRef.current,
          { opacity: 0, y: 8, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        )
      }
      // Animate title letters when in view
      gsap.from(".title-letter", {
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate quotes when in view
      gsap.from(".quote-item", {
        opacity: 0,
        x: (i) => (i % 2 === 0 ? -50 : 50),
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: quotesRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      // Animate works section when in view
      if (worksRef.current) {
        gsap.from(worksRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: worksRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
      }

      // Animate name when in view
      if (nameRef.current) {
        gsap.from(nameRef.current, {
          opacity: 0,
          x: 50,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: nameRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })
      }

      // Skip doodle animations on small screens for performance
      const _isSmall = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width:640px)").matches
      if (!_isSmall) {
        gsap.from(".doodle-path", {
          strokeDashoffset: 1000,
          duration: 1.5,
          ease: "power2.inOut",
          stagger: 0.08,
          scrollTrigger: {
            trigger: doodlesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        })

        // Float animation for doodles
        gsap.to(".doodle-float", {
          y: "random(-12, 12)",
          x: "random(-5, 5)",
          duration: "random(2, 3.5)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: 1,
            from: "random",
          },
        })

        // Wobble rotation for doodles
        gsap.to(".doodle-wobble", {
          rotation: "random(-8, 8)",
          duration: "random(2.5, 4)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: 1.5,
            from: "random",
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div ref={doodlesRef} className="about-doodles absolute inset-0 pointer-events-none z-[5]" aria-hidden="true">
        {/* Hobby Doodle 1: Paint palette (Art) - top left */}
        <svg className="absolute left-[2%] top-[6%] w-28 h-10 doodle-float opacity-30 hidden sm:block" viewBox="0 0 140 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <ellipse className="doodle-path" cx="55" cy="25" rx="45" ry="18" />
          <circle className="doodle-path" cx="40" cy="20" r="3" fill="currentColor" />
          <circle className="doodle-path" cx="60" cy="14" r="3" fill="currentColor" />
          <circle className="doodle-path" cx="72" cy="26" r="3" fill="currentColor" />
          <rect className="doodle-path" x="95" y="18" width="30" height="6" rx="3" opacity="0.6" />
        </svg>

        {/* Hobby Doodle 2: Music note - top right */}
        <svg className="absolute right-[3%] top-[10%] w-32 h-20 doodle-float opacity-28 hidden md:block" viewBox="0 0 150 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: 1000 }}>
          <path className="doodle-path" d="M40 20 L40 60" strokeWidth="3" />
          <circle className="doodle-path" cx="40" cy="68" r="6" fill="currentColor" />
          <path className="doodle-path" d="M40 20 Q80 10, 110 20 L110 58 Q80 50, 40 60" strokeWidth="2" />
        </svg>

        {/* Hobby Doodle 3: Dumbbell (Gym) - left between quotes */}
        <svg className="absolute left-[2%] top-[47%] w-24 h-28 doodle-wobble opacity-35 hidden lg:block" viewBox="0 0 120 140" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="6" y="56" width="18" height="28" rx="3" />
          <rect className="doodle-path" x="96" y="56" width="18" height="28" rx="3" />
          <rect className="doodle-path" x="30" y="66" width="60" height="12" rx="6" />
          <circle className="doodle-path" cx="18" cy="70" r="8" opacity="0.6" />
          <circle className="doodle-path" cx="102" cy="70" r="8" opacity="0.6" />
        </svg>

        {/* Hobby Doodle 4: Running shoe footprint - right middle */}
        <svg className="absolute right-[3%] top-[44%] w-26 h-28 doodle-float opacity-32 hidden lg:block" viewBox="0 0 120 140" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <path className="doodle-path" d="M20 110 Q35 95, 50 100 Q70 106, 90 90 Q100 80, 95 60 Q88 40, 70 38 Q52 36, 35 48 Q22 58, 18 74 Z" />
          <circle className="doodle-path" cx="28" cy="84" r="2.5" />
          <circle className="doodle-path" cx="42" cy="72" r="2.5" />
          <circle className="doodle-path" cx="58" cy="64" r="2.5" />
        </svg>

        {/* Hobby Doodle 5: Sketchbook / pencil (Art) - left bottom */}
        <svg className="absolute left-[2%] bottom-[30%] w-32 h-12 doodle-wobble opacity-33 hidden md:block" viewBox="0 0 160 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="8" y="12" width="110" height="36" rx="4" />
          <path className="doodle-path" d="M123 18 L150 42" strokeWidth="3" />
          <rect className="doodle-path" x="126" y="10" width="20" height="8" rx="2" opacity="0.6" />
        </svg>

        {/* Hobby Doodle 6: Camera (Photography) - right bottom */}
        <svg className="absolute right-[2%] bottom-[28%] w-24 h-24 doodle-wobble opacity-35 hidden md:block" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="18" y="26" width="84" height="60" rx="8" />
          <circle className="doodle-path" cx="60" cy="56" r="20" />
          <rect className="doodle-path" x="28" y="34" width="18" height="12" rx="3" opacity="0.6" />
        </svg>

        {/* Hobby Doodle 7: Cassette/stylized speaker (Music) - top center-right */}
        <svg className="absolute left-[58%] top-[4%] w-18 h-10 doodle-float opacity-30 hidden sm:block" viewBox="0 0 80 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="8" y="8" width="64" height="30" rx="4" />
          <circle className="doodle-path" cx="28" cy="23" r="6" />
          <circle className="doodle-path" cx="52" cy="23" r="6" />
        </svg>

        {/* Hobby Doodle 8: Bicycle wheel (Cycling) - bottom center right */}
        <svg className="absolute left-[70%] bottom-[20%] w-28 h-28 doodle-float opacity-32 hidden lg:block" viewBox="0 0 140 140" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: 1000 }}>
          <circle className="doodle-path" cx="70" cy="70" r="40" />
          <line className="doodle-path" x1="70" y1="30" x2="70" y2="110" />
          <line className="doodle-path" x1="30" y1="70" x2="110" y2="70" />
        </svg>

        {/* Hobby Doodle 9: Checklist (planning/reading) - bottom left corner */}
        <svg className="absolute left-[4%] bottom-[10%] w-22 h-26 doodle-wobble opacity-33 hidden md:block" viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="10" y="10" width="12" height="12" rx="2" />
          <line className="doodle-path" x1="30" y1="16" x2="80" y2="16" strokeWidth="2" />
          <rect className="doodle-path" x="10" y="35" width="12" height="12" rx="2" />
          <line className="doodle-path" x1="30" y1="41" x2="80" y2="41" strokeWidth="2" />
          <rect className="doodle-path" x="10" y="60" width="12" height="12" rx="2" />
          <line className="doodle-path" x1="30" y1="66" x2="80" y2="66" strokeWidth="2" />
          <polyline className="doodle-path" points="12,15 15,18 20,13" strokeWidth="2.5" />
        </svg>

        {/* Hobby Doodle 10: Footsteps (Walking) - middle right */}
        <svg className="absolute right-[14%] top-[60%] w-28 h-22 doodle-float opacity-30 hidden lg:block" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <ellipse className="doodle-path" cx="30" cy="70" rx="8" ry="4" />
          <ellipse className="doodle-path" cx="60" cy="60" rx="10" ry="5" />
          <ellipse className="doodle-path" cx="90" cy="50" rx="7" ry="3.5" />
          <ellipse className="doodle-path" cx="120" cy="40" rx="5" ry="2.5" />
        </svg>

        {/* Hobby Doodle 11: Yoga mat (wellness) - bottom center left */}
        <svg className="absolute left-[36%] bottom-[6%] w-28 h-10 doodle-wobble opacity-32 hidden sm:block" viewBox="0 0 140 50" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="20" y="12" width="100" height="24" rx="12" />
          <line className="doodle-path" x1="32" y1="25" x2="108" y2="25" strokeWidth="1.5" opacity="0.6" />
        </svg>

        {/* Hobby Doodle 12: Guitar head (Music) - right middle-top */}
        <svg className="absolute right-[12%] top-[24%] w-24 h-28 doodle-float opacity-33 hidden lg:block" viewBox="0 0 120 140" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="10" y="62" width="40" height="60" rx="20" />
          <line className="doodle-path" x1="50" y1="70" x2="92" y2="30" />
          <circle className="doodle-path" cx="28" cy="90" r="6" />
        </svg>

        {/* Hobby Doodle 13: Mountain (hiking) - top left-center */}
        <svg className="absolute left-[18%] top-[3%] w-26 h-26 doodle-wobble opacity-28 hidden md:block" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: 1000 }}>
          <path className="doodle-path" d="M15 95 L45 40 L70 75 L95 30 L105 95 Z" />
          <line className="doodle-path" x1="10" y1="100" x2="110" y2="100" strokeWidth="1.5" opacity="0.6" />
        </svg>

        {/* Hobby Doodle 14: Vinyl record (music) - left middle-top */}
        <svg className="absolute left-[6%] top-[28%] w-20 h-24 doodle-float opacity-30 hidden lg:block" viewBox="0 0 90 110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <circle className="doodle-path" cx="45" cy="40" r="24" />
          <circle className="doodle-path" cx="45" cy="40" r="6" fill="currentColor" />
        </svg>

        {/* Hobby Doodle 15: Book stack (reading) - bottom right */}
        <svg className="absolute right-[6%] bottom-[9%] w-26 h-24 doodle-wobble opacity-30 hidden md:block" viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="14" y="18" width="92" height="18" rx="3" />
          <rect className="doodle-path" x="10" y="44" width="92" height="18" rx="3" />
          <rect className="doodle-path" x="6" y="70" width="92" height="18" rx="3" />
        </svg>

        {/* Hobby Doodle 16: Phone (socials) - center area visible on mobile */}
        <svg className="absolute left-[25%] top-[15%] w-20 h-32 doodle-float opacity-28 sm:w-24 sm:h-36 sm:left-[25%]" viewBox="0 0 100 160" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="10" y="10" width="80" height="140" rx="8" />
          <rect className="doodle-path" x="20" y="40" width="60" height="16" rx="4" />
          <rect className="doodle-path" x="20" y="70" width="60" height="20" rx="6" opacity="0.6" />
        </svg>

        {/* Hobby Doodle 17: Headphones (music) - center top */}
        <svg className="absolute left-[65%] top-[12%] w-28 h-20 doodle-wobble opacity-30 hidden sm:block md:w-32 md:h-24" viewBox="0 0 140 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: 1000 }}>
          <path className="doodle-path" d="M30 55 Q30 20, 70 20 Q110 20, 110 55" strokeWidth="3" />
          <rect className="doodle-path" x="18" y="55" width="20" height="28" rx="8" />
          <rect className="doodle-path" x="102" y="55" width="20" height="28" rx="8" />
        </svg>

        {/* Hobby Doodle 18: Notebook (writing) - center */}
        <svg className="absolute left-[12%] top-[65%] w-28 h-10 doodle-float opacity-32 sm:w-32 sm:h-12 sm:left-[40%] sm:top-[35%]" viewBox="0 0 160 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="8" y="15" width="120" height="30" rx="6" />
          <line className="doodle-path" x1="20" y1="30" x2="55" y2="30" strokeWidth="2" opacity="0.5" />
        </svg>

        {/* Hobby Doodle 19: Music equalizer bars - center right */}
        <svg className="absolute left-[58%] top-[50%] w-24 h-20 doodle-wobble opacity-30 sm:w-28 sm:h-24" viewBox="0 0 130 110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="20" y="70" width="6" height="30" />
          <rect className="doodle-path" x="40" y="50" width="6" height="50" />
          <rect className="doodle-path" x="60" y="30" width="6" height="70" />
          <rect className="doodle-path" x="80" y="60" width="6" height="40" />
        </svg>

        {/* Hobby Doodle 20: Paintbrush (art) - center left */}
        <svg className="absolute left-[15%] top-[48%] w-30 h-12 doodle-wobble opacity-30 hidden md:block" viewBox="0 0 140 60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="8" y="8" width="38" height="28" rx="4" opacity="0.6" />
          <path className="doodle-path" d="M84 10 L120 46" strokeWidth="3" />
          <circle className="doodle-path" cx="126" cy="52" r="3" opacity="0.6" />
        </svg>

        {/* Hobby Doodle 21: Tennis racket (sport) - center bottom right */}
        <svg className="absolute left-[50%] bottom-[15%] w-26 h-26 doodle-float opacity-28 hidden md:block" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: 1000 }}>
          <circle className="doodle-path" cx="40" cy="40" r="18" />
          <line className="doodle-path" x1="40" y1="58" x2="74" y2="100" />
          <rect className="doodle-path" x="68" y="92" width="12" height="8" rx="2" opacity="0.6" />
        </svg>

        {/* Hobby Doodle 22: Keyboard keys (coding) - center middle left */}
        <svg className="absolute left-[22%] top-[56%] w-28 h-10 doodle-float opacity-32 hidden md:block" viewBox="0 0 140 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="8" y="15" width="124" height="20" rx="6" />
          <line className="doodle-path" x1="14" y1="25" x2="126" y2="25" strokeWidth="1" opacity="0.6" />
          <rect className="doodle-path" x="18" y="18" width="12" height="8" rx="2" />
          <rect className="doodle-path" x="36" y="18" width="12" height="8" rx="2" />
        </svg>

        {/* Hobby Doodle 23: Microphone (podcast/singing) - center top right */}
        <svg className="absolute left-[72%] top-[32%] w-20 h-20 doodle-wobble opacity-30 hidden md:block" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <rect className="doodle-path" x="40" y="20" width="20" height="40" rx="10" />
          <line className="doodle-path" x1="50" y1="60" x2="50" y2="80" />
          <line className="doodle-path" x1="36" y1="78" x2="64" y2="78" />
        </svg>

        {/* Hobby Doodle 24: Mandala / geometric (art) - center bottom left */}
        <svg className="absolute left-[28%] bottom-[12%] w-24 h-24 doodle-wobble opacity-32 hidden md:block" viewBox="0 0 110 110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: 1000 }}>
          <circle className="doodle-path" cx="55" cy="55" r="40" />
          <polygon className="doodle-path" points="55,35 70,70 40,70" opacity="0.6" />
          <circle className="doodle-path" cx="55" cy="55" r="8" />
        </svg>
      </div>

      {/* Main Container */}
      <div className="relative max-w-auto mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <span
          ref={aboutRef}
          id="about"
          className="inline-block rounded-full border-2 px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all opacity-0 hover:scale-105 hover:bg-black hover:text-white"
        >
            About Me
          </span>
        <div
          ref={titleRef}
          className="absolute left-0 right-0 top-8 sm:top-4 md:top-0 z-0 flex items-start justify-center pointer-events-none"
        >

          <div
            className="leading-none tracking-tighter flex items-start justify-center"
            style={{
              transform: "scaleX(0.3)",
              fontFamily: "var(--font-bebas), sans-serif",
              fontWeight: "700",
            }}
          >
            <span className="title-letter" style={{ fontSize: "clamp(10rem, 35vw, 35rem)" }}>
              C
            </span>
            <span className="title-letter" style={{ fontSize: "clamp(9rem, 30vw, 30rem)" }}>
              R
            </span>
            <span className="title-letter" style={{ fontSize: "clamp(11rem, 38vw, 38rem)" }}>
              E
            </span>
            <span className="title-letter" style={{ fontSize: "clamp(8.5rem, 28vw, 28rem)" }}>
              A
            </span>
            <span className="title-letter" style={{ fontSize: "clamp(10rem, 34vw, 34rem)" }}>
              T
            </span>
            <span className="title-letter" style={{ fontSize: "clamp(9rem, 31vw, 31rem)" }}>
              I
            </span>
            <span className="title-letter" style={{ fontSize: "clamp(10.5rem, 36vw, 36rem)" }}>
              V
            </span>
            <span className="title-letter" style={{ fontSize: "clamp(9rem, 30vw, 30rem)" }}>
              E
            </span>
            <span className="title-letter mx-2" style={{ fontSize: "clamp(5rem, 16vw, 16rem)" }}></span>
            <span className="title-letter" style={{ fontSize: "clamp(10.5rem, 36vw, 36rem)" }}>
              D
            </span>
            <span className="title-letter" style={{ fontSize: "clamp(9rem, 30vw, 30rem)" }}>
              E
            </span>
            <span className="title-letter" style={{ fontSize: "clamp(8rem, 27vw, 27rem)" }}>
              V
            </span>
            <span className="title-letter hidden md:block" style={{ fontSize: "clamp(10rem, 34vw, 34rem)" }}>
              O
            </span>
            <span className="title-letter hidden md:block" style={{ fontSize: "clamp(8.5rem, 29vw, 29rem)" }}>
              P
            </span>
          </div>
        </div>

        {/* Center Image */}
        <div
          ref={imageRef}
          className="relative z-10 flex justify-center items-center min-h-[150px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] pt-8 sm:pt-16 md:pt-20"
        ></div>

        <div ref={quotesRef} className="relative z-20">
          {/* Left Quote */}
          <div className="quote-item absolute left-4 sm:left-8 md:left-16 top-[200px] sm:top-[250px] md:top-[300px] max-w-[200px] sm:max-w-[240px]">
            <p className="text-xs sm:text-sm md:text-base leading-relaxed hero-jelly">"Code is poetry written</p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed hero-jelly">in logic and translated</p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed hero-jelly">into possibility."</p>
          </div>

          {/* Right Top Quote */}
          <div className="quote-item absolute right-4 sm:right-8 md:right-16 top-[180px] sm:top-[220px] md:top-[260px] max-w-[200px] sm:max-w-[280px]">
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-right hero-jelly">
              "Passionate about crafting
            </p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-right hero-jelly">
              experiences that blend
            </p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-right hero-jelly">
              design with functionality."
            </p>
          </div>

          {/* Center Bottom Quote */}
          <div className="quote-item absolute left-1/2 -translate-x-1/2 bottom-[-160px] sm:bottom-[-150px] max-w-[280px] sm:max-w-[340px]">
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-center hero-jelly">
              "Every pixel, every line
            </p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-center hero-jelly">
              of code is an opportunity
            </p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-center hero-jelly">
              to create something
            </p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-center hero-jelly">
              extraordinary and push
            </p>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-center hero-jelly">
              the boundaries of design."
            </p>
          </div>
        </div>

        <div className="relative z-30 mt-[280px] sm:mt-[320px] md:mt-[400px] border-t border-b border-stone-800 dark:border-teal-700/50 py-8 ">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Skills/Specialties */}
            <div className="col-span-1">
              <h3 className="text-xs sm:text-sm font-bold tracking-wider mb-4 uppercase hero-jelly">Specialties</h3>
              <ul className="space-y-2 text-xs sm:text-sm ">
                <li className="hero-jelly">Full-Stack Development</li>
                <li className="hero-jelly">UI/UX Design & Animation</li>
                <li className="hero-jelly">Creative Problem Solving</li>
              </ul>
            </div>

            {/* Center Column */}
            <div className="col-span-1 flex justify-center items-center hidden lg:block">
              <div className="flex flex-col items-center gap-2">
                <div className="text-[#B8392D] font-black text-3xl sm:text-4xl md:text-5xl hero-jelly">BUILDING</div>
                <div className="text-[#B8392D] font-black text-3xl sm:text-4xl md:text-5xl hero-jelly">THE FUTURE</div>
              </div>
            </div>

            {/* Name */}
            <div className="col-span-1 flex flex-col items-end md:justify-end">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-right hero-jelly">
                TURNING
              </h1>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-right hero-jelly">IDEAS</h1>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-right hero-jelly">
                INTO REALITY
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
