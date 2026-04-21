"use client"
import Link from "next/link"
import { useEffect, useRef } from "react"
import PageDoodles from "@/components/PageDoodles"

const phases = [
  {
    number: "01",
    title: "Discovery",
    subtitle: "Before a single pixel.",
    duration: "Day 1–2",
    color: "teal",
    description:
      "Every project starts with listening. We map your goals, constraints, audience, and what success actually looks like — not what sounds good in a brief.",
    steps: [
      "Intake form or kickoff call (30–45 min)",
      "Goal + success metric alignment",
      "Audience and competitor audit",
      "Scope confirmation and timeline lock",
    ],
    output: "Project brief + timeline PDF",
    icon: "◎",
  },
  {
    number: "02",
    title: "Strategy",
    subtitle: "The thinking before the doing.",
    duration: "Day 2–3",
    color: "stone",
    description:
      "Structure before aesthetics. Information architecture, user flows, and content hierarchy get decided here — so design decisions have a reason behind them.",
    steps: [
      "Sitemap or screen inventory",
      "User flow diagrams",
      "Content outline + copy placeholders",
      "Technical stack confirmation",
    ],
    output: "Wireframe skeletons or IA map",
    icon: "◈",
  },
  {
    number: "03",
    title: "Design",
    subtitle: "Where craft happens.",
    duration: "Day 3–8",
    color: "teal",
    description:
      "High-fidelity screens that balance beauty with usability. Each component is designed with both the viewport and the developer in mind — clean to look at, clean to build.",
    steps: [
      "Moodboard and direction alignment",
      "Component system setup",
      "Screen-by-screen design in Figma",
      "Responsive breakpoint coverage",
    ],
    output: "Figma file with all screens",
    icon: "◇",
  },
  {
    number: "04",
    title: "Revisions",
    subtitle: "Feedback as fuel.",
    duration: "Varies by plan",
    color: "stone",
    description:
      "Revision rounds are structured, not open-ended. You compile all feedback into a single batch — I incorporate everything at once. This keeps the project sharp and on schedule.",
    steps: [
      "Loom walkthrough of deliverable",
      "Your consolidated feedback batch",
      "Changes implemented in 24–48 hrs",
      "Sign-off confirmation before next phase",
    ],
    output: "Revised + approved deliverable",
    icon: "↺",
  },
  {
    number: "05",
    title: "Build",
    subtitle: "Pixels to production.",
    duration: "Day 6–18 (dev projects)",
    color: "teal",
    description:
      "For development projects: approved designs become clean, documented code. Semantic HTML, accessible markup, optimised assets — built once, maintained easily.",
    steps: [
      "Component scaffolding from Figma",
      "Responsive implementation across breakpoints",
      "Performance and accessibility audit",
      "API or CMS wiring (if in scope)",
    ],
    output: "GitHub repo or ZIP archive",
    icon: "⌥",
  },
  {
    number: "06",
    title: "Delivery",
    subtitle: "Launch, not goodbye.",
    duration: "Final day",
    color: "stone",
    description:
      "Final QA, deployment assistance (Premium plans), and a clean handoff package. You leave with everything you need to maintain, update, or hand to another developer.",
    steps: [
      "Final QA across browsers + devices",
      "Deploy assist (Premium plans)",
      "Handoff package: files, docs, passwords",
      "30-day post-launch query window",
    ],
    output: "Live project + full handoff",
    icon: "↗",
  },
]

const principles = [
  {
    label: "One project at a time",
    body: "Your work doesn't compete for attention with five other active clients. When we're live, you have my focused output.",
  },
  {
    label: "Async by default",
    body: "No mandatory calls unless you prefer them. Updates arrive in your inbox. You reply when it works for you.",
  },
  {
    label: "Scope in writing",
    body: "Everything agreed on is documented before payment. Scope creep has nowhere to hide when the brief is clear.",
  },
  {
    label: "Batched revisions",
    body: "Feedback rounds are consolidated, not drip-fed. This protects your time and keeps the project moving linearly.",
  },
]

const tools = [
  { name: "Figma", category: "Design" },
  { name: "VS Code", category: "Development" },
  { name: "Next.js", category: "Development" },
  { name: "Tailwind CSS", category: "Development" },
  { name: "GSAP", category: "Animation" },
  { name: "Framer Motion", category: "Animation" },
  { name: "GitHub", category: "Version Control" },
  { name: "Vercel", category: "Deployment" },
  { name: "Notion", category: "Communication" },
  { name: "Loom", category: "Communication" },
  { name: "Razorpay", category: "Payments" },
  { name: "Whimsical", category: "Diagramming" },
]

export default function ProcessPage() {
  const heroRef = useRef<HTMLElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroEyebrowRef = useRef<HTMLParagraphElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const phasesRef = useRef<HTMLElement>(null)
  const principlesRef = useRef<HTMLElement>(null)
  const toolsRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const resetLayoutSizing = () => {
      document.body.style.height = ""
      document.body.style.overflowY = ""
      document.documentElement.style.overflowY = ""
    }
    resetLayoutSizing()
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }
    const rafId = requestAnimationFrame(resetLayoutSizing)
    return () => {
      cancelAnimationFrame(rafId)
      resetLayoutSizing()
    }
  }, [])

  useEffect(() => {
    let gsap: any
    let ScrollTrigger: any
    let ctx: any

    const loadGSAP = async () => {
      const gsapModule = await import("gsap")
      const stModule = await import("gsap/ScrollTrigger")
      gsap = gsapModule.gsap || gsapModule.default
      ScrollTrigger = stModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // ── HERO ──
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } })
        heroTl
          .fromTo(
            heroEyebrowRef.current,
            { opacity: 0, y: 30, letterSpacing: "0.6em" },
            { opacity: 1, y: 0, letterSpacing: "0.32em", duration: 1 }
          )
          .fromTo(
            heroTitleRef.current,
            { opacity: 0, y: 60, skewY: 3 },
            { opacity: 1, y: 0, skewY: 0, duration: 1.1 },
            "-=0.6"
          )

        if (heroBgRef.current) {
          gsap.to(heroBgRef.current, {
            y: 120,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          })
        }

        // ── PHASE CARDS ──
        if (phasesRef.current) {
          const cards = phasesRef.current.querySelectorAll(".phase-card-anim")
          gsap.fromTo(
            cards,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.13,
              ease: "power3.out",
              scrollTrigger: {
                trigger: phasesRef.current,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          )

          const border = phasesRef.current.querySelector(".phases-border-anim")
          if (border) {
            gsap.fromTo(
              border,
              { borderColor: "rgba(120,113,108,0)" },
              {
                borderColor: "rgba(120,113,108,0.25)",
                duration: 0.3,
                delay: 0.85 + 0.13 * 5,
                ease: "none",
                scrollTrigger: {
                  trigger: phasesRef.current,
                  start: "top 78%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          }
        }

        // ── PRINCIPLES ──
        if (principlesRef.current) {
          const items = principlesRef.current.querySelectorAll(".principle-anim")
          gsap.fromTo(
            items,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: principlesRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          )
          const border = principlesRef.current.querySelector(".principles-border-anim")
          if (border) {
            gsap.fromTo(
              border,
              { borderColor: "rgba(120,113,108,0)" },
              {
                borderColor: "rgba(120,113,108,0.25)",
                duration: 0.3,
                delay: 0.7 + 0.1 * 3,
                ease: "none",
                scrollTrigger: {
                  trigger: principlesRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          }
        }

        // ── TOOLS ──
        if (toolsRef.current) {
          const chips = toolsRef.current.querySelectorAll(".tool-chip-anim")
          gsap.fromTo(
            chips,
            { opacity: 0, scale: 0.85, y: 20 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.04,
              ease: "back.out(1.4)",
              scrollTrigger: {
                trigger: toolsRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }

        // ── CTA ──
        if (ctaRef.current) {
          gsap.fromTo(
            ctaRef.current.querySelector(".cta-inner-anim"),
            { opacity: 0, scale: 0.96, y: 30 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ctaRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }
      })
    }

    loadGSAP()
    return () => { if (ctx) ctx.revert() }
  }, [])

  return (
    <div className="relative overflow-x-hidden text-[#2a2a2a] dark:text-[#d6cfc7] min-h-screen">
      {/* Grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[999] opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
        }}
      />

      <PageDoodles iconCount={20} dotCount={12} />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] px-4 pb-16 pt-20 sm:pb-20 sm:pt-24 text-center flex flex-col items-center"
      >
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute -left-20 -top-32 h-[520px] w-[520px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(79,209,184,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-[1360px] mx-auto">
          <div className="flex justify-start mb-8 sm:mb-11">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[0.75rem] tracking-[0.28em] text-stone-700 dark:text-[#4fd1b8] opacity-80 hover:opacity-100 transition-opacity no-underline"
            >
              <span>←</span>
              <span>BACK TO HOME</span>
            </Link>
          </div>

          <p
            ref={heroEyebrowRef}
            className="mb-4 text-[0.8rem] tracking-[0.32em] text-stone-700 dark:text-[#4fd1b8] opacity-0 translate-y-6"
          >
            HOW WORK GETS DONE
          </p>

          <h1
            ref={heroTitleRef}
            className="font-display text-[clamp(3rem,10vw,9.5rem)] leading-[0.93] tracking-[0.04em] text-stone-700 dark:text-[#80e8d4] opacity-0 translate-y-6"
          >
            THE{" "}
            <span className="font-['Playfair_Display'] italic text-[0.9em] text-black dark:text-[#ede9e3]">
              process.
            </span>
            <br />
            STEP BY STEP.
          </h1>

          <p className="mt-6 sm:mt-8 mx-auto max-w-[560px] text-[0.95rem] sm:text-[1rem] font-light leading-[1.75] text-[#3a3a3a] dark:text-[rgba(214,207,199,0.78)]">
            A repeatable, transparent workflow that keeps projects on schedule, on brief, and free of surprises — from first message to final delivery.
          </p>
        </div>
      </section>

      {/* ── PHASES GRID ── */}
      <section
        ref={phasesRef}
        className="border-b border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] px-4 py-14 sm:py-[4.5rem]"
      >
        <div className="max-w-[1360px] mx-auto">
          <p className="mb-3 text-[0.75rem] tracking-[0.3em] text-stone-700 dark:text-[#4fd1b8] opacity-90">
            THE WORKFLOW
          </p>
          <h2 className="mb-10 sm:mb-12 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.93] tracking-[0.04em] text-black dark:text-[#ede9e3]">
            SIX{" "}
            <span className="font-['Playfair_Display'] italic">phases,</span> ONE DIRECTION.
          </h2>

          {/* 1-col mobile → 2-col tablet → 3-col desktop */}
          <div
            className="phases-border-anim grid gap-px rounded-[1.5rem] overflow-hidden border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)]
              grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {phases.map((phase) => (
              <div
                key={phase.number}
                className={`phase-card-anim opacity-0 translate-y-6 flex flex-col p-6 sm:p-9 transition-colors duration-200 ${
                  phase.color === "teal"
                    ? "bg-[#e8f5f3] dark:bg-[#081e1b] hover:bg-[#dbefec] dark:hover:bg-[#0d2320]"
                    : "bg-[#f8f8f8] dark:bg-[#050f0d] hover:bg-[#efefef] dark:hover:bg-[#0a1e1b]"
                }`}
              >
                {/* Phase header */}
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <p className="text-[0.7rem] tracking-[0.28em] text-stone-700 dark:text-[#4fd1b8] opacity-70 mb-1">
                      {phase.number} / 06
                    </p>
                    <p className="text-[0.72rem] tracking-[0.18em] text-stone-700 dark:text-[#4fd1b8] opacity-60">
                      {phase.duration}
                    </p>
                  </div>
                  <span className="text-[2rem] text-stone-700 dark:text-[#4fd1b8] opacity-40 leading-none">
                    {phase.icon}
                  </span>
                </div>

                <h3 className="mb-1 font-display text-[clamp(1.6rem,4vw,2.5rem)] leading-none tracking-[0.03em] text-black dark:text-[#ede9e3]">
                  {phase.title.toUpperCase()}
                </h3>
                <p className="mb-4 text-[0.8rem] font-['Playfair_Display'] italic text-stone-700 dark:text-[#4fd1b8] opacity-80">
                  {phase.subtitle}
                </p>

                <p className="mb-5 text-[0.9rem] font-light leading-[1.7] text-[#333333] dark:text-[rgba(214,207,199,0.78)]">
                  {phase.description}
                </p>

                <hr className="mb-5 border-[rgba(120,113,108,0.2)] dark:border-[rgba(79,209,184,0.12)]" />

                <ul className="mb-auto flex flex-col gap-[0.6rem]">
                  {phase.steps.map((step) => (
                    <li key={step} className="flex items-start gap-[0.6rem] text-[0.85rem] leading-[1.55] text-[#1a1a1a] dark:text-[#d6cfc7]">
                      <span className="mt-[6px] h-[4px] w-[4px] shrink-0 rounded-full bg-stone-700 dark:bg-[#4fd1b8] opacity-70" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                {/* Output badge */}
                <div className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-[rgba(120,113,108,0.3)] dark:border-[rgba(79,209,184,0.2)] px-4 py-[0.4rem]">
                  <span className="text-[0.6rem] tracking-[0.18em] text-stone-700 dark:text-[#4fd1b8] opacity-80">OUTPUT</span>
                  <span className="text-[0.75rem] text-[#1a1a1a] dark:text-[#ede9e3] font-medium">{phase.output}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section
        ref={principlesRef}
        className="border-b border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] px-4 py-14 sm:py-[4.5rem]"
      >
        <div className="max-w-[1360px] mx-auto">
          <p className="mb-3 text-[0.75rem] tracking-[0.3em] text-stone-700 dark:text-[#4fd1b8] opacity-90">
            HOW I WORK
          </p>
          <h2 className="mb-10 sm:mb-12 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.93] tracking-[0.04em] text-black dark:text-[#ede9e3]">
            WORKING{" "}
            <span className="font-['Playfair_Display'] italic">principles.</span>
          </h2>

          {/* 1-col mobile → 2-col md+ */}
          <div
            className="principles-border-anim grid gap-px rounded-[1.5rem] overflow-hidden border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)]
              grid-cols-1 md:grid-cols-2"
          >
            {principles.map((p, i) => (
              <div
                key={p.label}
                className="principle-anim opacity-0 bg-[#f8f8f8] dark:bg-[#050f0d] p-7 sm:p-10 hover:bg-[#efefef] dark:hover:bg-[#0a1e1b] transition-colors duration-200"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-[1.1rem] text-stone-700 dark:text-[#4fd1b8] font-display shrink-0">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <h3 className="text-[1rem] sm:text-[1.05rem] font-semibold tracking-[0.02em] text-black dark:text-[#ede9e3]">
                    {p.label}
                  </h3>
                </div>
                <p className="text-[0.92rem] font-light leading-[1.75] text-[#333333] dark:text-[rgba(214,207,199,0.78)] pl-9">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section
        ref={toolsRef}
        className="border-b border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] px-4 py-14 sm:py-[4.5rem]"
      >
        <div className="max-w-[1360px] mx-auto">
          <p className="mb-3 text-[0.75rem] tracking-[0.3em] text-stone-700 dark:text-[#4fd1b8] opacity-90">
            TOOLKIT
          </p>
          <h2 className="mb-10 sm:mb-12 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.93] tracking-[0.04em] text-black dark:text-[#ede9e3]">
            TOOLS I{" "}
            <span className="font-['Playfair_Display'] italic">trust.</span>
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="tool-chip-anim opacity-0 group flex items-center gap-[0.5rem] rounded-full border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] bg-[#f8f8f8] dark:bg-[#050f0d] px-4 sm:px-5 py-[0.45rem] sm:py-[0.55rem] hover:bg-stone-800 dark:hover:bg-[#4fd1b8] transition-all duration-200 cursor-default"
              >
                <span className="text-[0.62rem] sm:text-[0.68rem] tracking-[0.18em] text-stone-700 dark:text-[#4fd1b8] group-hover:text-stone-200 dark:group-hover:text-[#030a08] transition-colors duration-200">
                  {tool.category.toUpperCase()}
                </span>
                <span className="h-[3px] w-[3px] rounded-full bg-stone-400 dark:bg-[#4fd1b8] opacity-40 group-hover:opacity-80" />
                <span className="text-[0.82rem] sm:text-[0.88rem] font-medium text-black dark:text-[#ede9e3] group-hover:text-stone-100 dark:group-hover:text-[#030a08] transition-colors duration-200">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE STRIP ── */}
      <section className="border-b border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] px-4 py-14 sm:py-[4.5rem] overflow-hidden">
        <div className="max-w-[1360px] mx-auto">
          <p className="mb-3 text-[0.75rem] tracking-[0.3em] text-stone-700 dark:text-[#4fd1b8] opacity-90">
            TYPICAL TIMELINES
          </p>
          <h2 className="mb-10 sm:mb-12 font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.93] tracking-[0.04em] text-black dark:text-[#ede9e3]">
            FROM BRIEF{" "}
            <span className="font-['Playfair_Display'] italic">to</span> LIVE.
          </h2>

          {/* 1-col mobile → 3-col lg+ */}
          <div
            className="grid gap-px rounded-[1.5rem] overflow-hidden border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)]
              grid-cols-1 lg:grid-cols-3"
          >
            {[
              { type: "UI/UX Design", range: "2–10 days", note: "Depends on plan tier", accent: true },
              { type: "Portfolio / Landing Page", range: "4–12 days", note: "Includes rounds of revision", accent: false },
              { type: "Frontend Build", range: "5–18 days", note: "Scope and complexity-dependent", accent: true },
            ].map((item) => (
              <div
                key={item.type}
                className={`flex flex-col justify-between p-7 sm:p-9 transition-colors duration-200 ${
                  item.accent
                    ? "bg-[#e8f5f3] dark:bg-[#081e1b] hover:bg-[#dbefec] dark:hover:bg-[#0d2320]"
                    : "bg-[#f8f8f8] dark:bg-[#050f0d] hover:bg-[#efefef] dark:hover:bg-[#0a1e1b]"
                }`}
              >
                <p className="mb-3 text-[0.78rem] tracking-[0.18em] text-stone-700 dark:text-[#4fd1b8] opacity-80">
                  {item.type.toUpperCase()}
                </p>
                <p className="font-display text-[clamp(2.2rem,8vw,3.5rem)] leading-none tracking-[0.02em] text-black dark:text-[#ede9e3]">
                  {item.range}
                </p>
                <p className="mt-3 text-[0.82rem] font-light text-[#444444] dark:text-[rgba(214,207,199,0.78)]">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="px-4 pb-20 sm:pb-24 pt-14 sm:pt-16">
        <div className="max-w-[1360px] mx-auto">
          <div className="cta-inner-anim opacity-0 translate-y-6 relative overflow-hidden rounded-[1.5rem] border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] bg-[#f8f8f8] dark:bg-[#050f0d] p-7 sm:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
            <div
              className="pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(79,209,184,0.06) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10">
              <h3 className="mb-2 font-display text-[clamp(1.5rem,5vw,2.25rem)] leading-none tracking-[0.04em] text-black dark:text-[#ede9e3]">
                READY TO START?
              </h3>
              <p className="max-w-[500px] text-[0.92rem] sm:text-[0.95rem] font-light leading-[1.65] text-[#333333] dark:text-[rgba(214,207,199,0.78)]">
                You now know exactly how it works. The next step is a single form — take two minutes, describe your project, and I'll reply within 24 hours.
              </p>
            </div>
            <div className="relative z-10 flex flex-col xs:flex-row flex-wrap gap-3 sm:gap-4">
              <Link
                href="/pricing"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[rgba(120,113,108,0.35)] dark:border-[rgba(79,209,184,0.18)] px-7 sm:px-8 py-[0.85rem] sm:py-[0.9rem] text-[0.82rem] font-bold tracking-[0.12em] text-stone-800 dark:text-[#4fd1b8] no-underline transition-colors hover:bg-stone-100 dark:hover:bg-[#081e1b]"
              >
                SEE PRICING ↗
              </Link>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-stone-800 dark:bg-[#4fd1b8] px-7 sm:px-9 py-[0.85rem] sm:py-[0.9rem] text-[0.82rem] font-bold tracking-[0.12em] text-stone-100 dark:text-[#030a08] no-underline transition-colors hover:bg-stone-900 dark:hover:bg-[#80e8d4]"
              >
                START A PROJECT ↗
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}