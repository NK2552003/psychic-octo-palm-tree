"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"


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
