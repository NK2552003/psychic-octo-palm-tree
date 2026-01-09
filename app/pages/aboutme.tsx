"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"


export default function AboutPage() {
  const titleRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const quotesRef = useRef<HTMLDivElement>(null)
  const worksRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
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
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative overflow-hidden">

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
