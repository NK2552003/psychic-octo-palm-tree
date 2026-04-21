"use client"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import PageDoodles from "@/components/PageDoodles"
import { ArrowLeft, ArrowUpRight } from "lucide-react";
const pricingCatalog = [
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    number: "01",
    description: "Wireframes, design systems, and polished screens for web and mobile ideas.",
    plans: [
      {
        key: "starter",
        name: "Starter",
        price: "INR 3,499",
        turnaround: "2–3 days",
        screens: "1 screen",
        items: ["1 focused screen", "Basic wireframe + visual", "1 revision round", "Figma source file"],
      },
      {
        key: "standard",
        name: "Standard",
        price: "INR 8,999",
        turnaround: "4–6 days",
        screens: "Up to 5 screens",
        items: ["Up to 5 screens", "User flow + responsive layout", "2 revision rounds", "Component documentation"],
      },
      {
        key: "premium",
        name: "Premium",
        price: "INR 14,999",
        turnaround: "7–10 days",
        screens: "Complete UI kit",
        items: ["Complete UI kit", "Reusable components", "Handoff-ready Figma file", "Design tokens", "3 revision rounds"],
        featured: true,
      },
    ],
    scaleItems: [
      { screens: "100+ Screens", price: "INR 49,999+", turnaround: "20–30 days", key: "scale-100" },
      { screens: "200+ Screens", price: "INR 89,999+", turnaround: "35–50 days", key: "scale-200" },
      { screens: "300+ Screens", price: "INR 1,29,999+", turnaround: "50–70 days", key: "scale-300" },
    ],
  },
  {
    title: "Portfolio Website",
    slug: "portfolio",
    number: "02",
    description: "Personal brand websites that showcase skills, projects, and your story clearly.",
    plans: [
      {
        key: "starter",
        name: "Starter",
        price: "INR 6,999",
        turnaround: "4–5 days",
        screens: "1-page",
        items: ["Single-page portfolio", "Contact form", "Mobile responsive", "Basic SEO tags"],
      },
      {
        key: "standard",
        name: "Standard",
        price: "INR 12,999",
        turnaround: "6–8 days",
        screens: "Multi-section",
        items: ["Multi-section portfolio", "Project detail layouts", "Basic animations", "Blog section"],
      },
      {
        key: "premium",
        name: "Premium",
        price: "INR 18,999",
        turnaround: "9–12 days",
        screens: "Full brand site",
        items: ["Premium UI polish", "SEO setup + sitemap", "Deploy + launch support", "Performance audit", "CMS integration"],
        featured: true,
      },
    ],
    scaleItems: [],
  },
  {
    title: "Landing Page",
    slug: "landing-page",
    number: "03",
    description: "Conversion-focused landing pages for products, services, and startup launches.",
    plans: [
      {
        key: "starter",
        name: "Starter",
        price: "INR 5,999",
        turnaround: "3–4 days",
        screens: "Single page",
        items: ["One landing page", "CTA section", "Lead form integration", "Mobile responsive"],
      },
      {
        key: "standard",
        name: "Standard",
        price: "INR 9,999",
        turnaround: "5–7 days",
        screens: "Multi-section",
        items: ["A/B ready sections", "Speed optimization", "2 revision rounds", "Analytics integration"],
      },
      {
        key: "premium",
        name: "Premium",
        price: "INR 15,999",
        turnaround: "7–10 days",
        screens: "Premium launch",
        items: ["Advanced visuals + motion", "Analytics setup", "Priority support", "A/B test variants", "3 revision rounds"],
        featured: true,
      },
    ],
    scaleItems: [],
  },
  {
    title: "Frontend Development",
    slug: "frontend-development",
    number: "04",
    description: "Pixel-perfect frontend builds with clean code, responsiveness, and performance.",
    plans: [
      {
        key: "starter",
        name: "Starter",
        price: "INR 9,999",
        turnaround: "5–7 days",
        screens: "1–2 pages",
        items: ["1–2 pages", "Reusable components", "Mobile + tablet support", "Basic interactions"],
      },
      {
        key: "standard",
        name: "Standard",
        price: "INR 19,999",
        turnaround: "8–12 days",
        screens: "5–7 pages",
        items: ["5–7 pages", "API integration (basic)", "Performance tuning", "CI/CD ready codebase"],
      },
      {
        key: "premium",
        name: "Premium",
        price: "INR 34,999",
        turnaround: "12–18 days",
        screens: "Complex app",
        items: ["Complex frontend architecture", "Animation-rich UI", "Post-delivery support", "Code documentation"],
        featured: true,
      },
    ],
    scaleItems: [
      { screens: "100+ Screens / Views", price: "INR 69,999+", turnaround: "25–40 days", key: "scale-100" },
      { screens: "200+ Screens / Views", price: "INR 1,29,999+", turnaround: "45–65 days", key: "scale-200" },
      { screens: "300+ Screens / Views", price: "INR 1,99,999+", turnaround: "65–90 days", key: "scale-300" },
    ],
  },
]

const includedItems = [
  "Responsive design across all screen sizes",
  "Clean, commented code handoff",
  "Figma source files (design projects)",
  "Basic on-page SEO meta tags",
  "One final QA pass before delivery",
  "Communication via email or WhatsApp",
]

const notIncludedItems = [
  "Hosting or domain registration costs",
  "Content writing or copywriting",
  "Logo or brand identity creation",
  "Backend / server-side development",
  "Third-party tool subscriptions",
  "Ongoing maintenance post-delivery",
]

const faqs = [
  {
    q: "How do revisions work?",
    a: "Each plan includes a fixed number of revision rounds as listed. A revision round means you review the work, compile feedback into one batch, and I incorporate all changes at once. Additional rounds beyond the included count are billed separately at a flat rate.",
  },
  {
    q: "Can I upgrade my plan mid-project?",
    a: "Yes. If scope expands during work, you can upgrade to the next tier. The price difference is settled and the timeline is adjusted accordingly — just flag it before the next phase begins.",
  },
  {
    q: "Do you offer custom quotes for unique projects?",
    a: "Absolutely. Select the closest plan on this page and describe your full requirement in the contact form. I'll send a tailored quote within 24 hours at no cost.",
  },
  {
    q: "What payment methods do you accept?",
    a: "UPI, bank transfer (NEFT/IMPS), and Razorpay. For projects above INR 15,000, a 50% advance is required before work begins, with the remaining balance due on final delivery.",
  },
  {
    q: "What formats do you deliver files in?",
    a: "Design projects come as Figma files with exported PNG/SVG assets. Development projects are delivered as a GitHub repository or a clean ZIP archive. Deployment assistance is included in all Premium plans.",
  },
  {
    q: "What if I am not satisfied with the result?",
    a: "If the deliverable doesn't match the agreed brief even after all revision rounds, I continue refining until it does. Clear communication at the start of every project is how we avoid surprises at the end.",
  },
  {
    q: "How are large-scale projects scoped?",
    a: "For 100+ screen or multi-view projects, we start with a discovery call to map flows, user journeys, and component needs. A detailed plan and timeline are shared before any payment is collected.",
  },
  {
    q: "Do the listed prices include taxes?",
    a: "All prices listed are exclusive of GST. If you require a GST invoice, it will be issued separately. For international clients, prices are shown in INR and can be converted at current exchange rates.",
  },
]

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const heroRef = useRef<HTMLElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroEyebrowRef = useRef<HTMLParagraphElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const svcRefs = useRef<(HTMLElement | null)[]>([])
  const inclRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)
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
        // ── HERO ENTRANCE ──
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

        // ── HERO PARALLAX BG ──
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

        // ── SERVICE SECTIONS: stagger slide-up ──
        svcRefs.current.forEach((el) => {
          if (!el) return

          // Section heading parallax
          const heading = el.querySelector(".svc-title-anim")
          if (heading) {
            gsap.fromTo(
              heading,
              { opacity: 0, x: -50 },
              {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          }

          // Plan cards container + stagger
          const cardsContainer = el.querySelector(".cards-container-anim")
          const cards = el.querySelectorAll(".plan-card-anim")
          
          if (cardsContainer) {
            gsap.fromTo(
              cardsContainer,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.1,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          }
          
          gsap.fromTo(
            cards,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          )
          
          // Card border appears after all cards animate in
          const cardBorder = el.querySelector(".cards-border-anim")
          if (cardBorder) {
            gsap.fromTo(
              cardBorder,
              { borderColor: "rgba(120,113,108,0)" },
              {
                borderColor: "rgba(120,113,108,0.25)",
                duration: 0.3,
                delay: 0.8 + (0.12 * 2), // Delay until all cards finish
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top 75%",
                  toggleActions: "play none none reverse",
                },
              }
            )
            
            // Dark mode border
            const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
            if (isDarkMode) {
              gsap.fromTo(
                cardBorder,
                { borderColor: "rgba(79,209,184,0)" },
                {
                  borderColor: "rgba(79,209,184,0.18)",
                  duration: 0.3,
                  delay: 0.8 + (0.12 * 2),
                  ease: "none",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                  },
                }
              )
            }
          }

          // Scale cards + projects border
          const scaleCards = el.querySelectorAll(".scale-card-anim")
          if (scaleCards.length) {
            // Scale cards animation
            gsap.fromTo(
              scaleCards,
              { autoAlpha: 0, y: 80 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: scaleCards[0],
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            )
            
            // Projects border appears after all cards animate in
            const projectsBorder = el.querySelector(".projects-border-anim")
            if (projectsBorder) {
              gsap.fromTo(
                projectsBorder,
                { borderColor: "rgba(120,113,108,0)" },
                {
                  borderColor: "rgba(120,113,108,0.25)",
                  duration: 0.3,
                  delay: 0.7 + (0.1 * 2),
                  ease: "none",
                  scrollTrigger: {
                    trigger: scaleCards[0],
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                  },
                }
              )
              
              const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
              if (isDarkMode) {
                gsap.fromTo(
                  projectsBorder,
                  { borderColor: "rgba(79,209,184,0)" },
                  {
                    borderColor: "rgba(79,209,184,0.18)",
                    duration: 0.3,
                    delay: 0.7 + (0.1 * 2),
                    ease: "none",
                    scrollTrigger: {
                      trigger: scaleCards[0],
                      start: "top 85%",
                      toggleActions: "play none none reverse",
                    },
                  }
                )
              }
            }
          }
        })

        // ── INCLUSIONS ──
        if (inclRef.current) {
          const inclContainer = inclRef.current.querySelector(".incl-container-anim")
          const cols = inclRef.current.querySelectorAll(".incl-col-anim")
          
          if (inclContainer) {
            gsap.fromTo(
              inclContainer,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.1,
                ease: "none",
                scrollTrigger: {
                  trigger: inclRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          }
          
          gsap.fromTo(
            cols,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: inclRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          )
          
          // Inclusions border appears after all columns animate in
          const inclBorder = inclRef.current.querySelector(".incl-border-anim")
          if (inclBorder) {
            gsap.fromTo(
              inclBorder,
              { borderColor: "rgba(120,113,108,0)" },
              {
                borderColor: "rgba(120,113,108,0.25)",
                duration: 0.3,
                delay: 0.8 + (0.15 * 1),
                ease: "none",
                scrollTrigger: {
                  trigger: inclRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            )
            
            const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
            if (isDarkMode) {
              gsap.fromTo(
                inclBorder,
                { borderColor: "rgba(79,209,184,0)" },
                {
                  borderColor: "rgba(79,209,184,0.18)",
                  duration: 0.3,
                  delay: 0.8 + (0.15 * 1),
                  ease: "none",
                  scrollTrigger: {
                    trigger: inclRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                  },
                }
              )
            }
          }
        }

        // ── FAQ ──
        if (faqRef.current) {
          const faqContainer = faqRef.current.querySelector(".faq-container-anim")
          const items = faqRef.current.querySelectorAll(".faq-item-anim")
          
          if (faqContainer) {
            gsap.fromTo(
              faqContainer,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.1,
                ease: "none",
                scrollTrigger: {
                  trigger: faqRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          }
          
          gsap.fromTo(
            items,
            { opacity: 0, x: -20 },
            {
              opacity: 1,
              x: 0,
              duration: 0.55,
              stagger: 0.07,
              ease: "power2.out",
              scrollTrigger: {
                trigger: faqRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          )
          
          // FAQ border appears after all items animate in
          const faqBorder = faqRef.current.querySelector(".faq-border-anim")
          if (faqBorder) {
            gsap.fromTo(
              faqBorder,
              { borderColor: "rgba(120,113,108,0)" },
              {
                borderColor: "rgba(120,113,108,0.25)",
                duration: 0.3,
                delay: 0.55 + (0.07 * 6),
                ease: "none",
                scrollTrigger: {
                  trigger: faqRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            )
            
            const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
            if (isDarkMode) {
              gsap.fromTo(
                faqBorder,
                { borderColor: "rgba(79,209,184,0)" },
                {
                  borderColor: "rgba(79,209,184,0.18)",
                  duration: 0.3,
                  delay: 0.55 + (0.07 * 6),
                  ease: "none",
                  scrollTrigger: {
                    trigger: faqRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                  },
                }
              )
            }
          }
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

        // ── GLOBAL PARALLAX on section borders ──
        (gsap.utils.toArray(".parallax-section") as HTMLElement[]).forEach((section: HTMLElement) => {
          gsap.fromTo(
            section,
            { backgroundPositionY: "0%" },
            {
              backgroundPositionY: "30%",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          )
        })
      })
    }

    loadGSAP()

    return () => {
      if (ctx) ctx.revert()
    }
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

  <PageDoodles iconCount={25} dotCount={15} />

  {/* ── HERO ── */}
  <section
    ref={heroRef}
    className="relative flex flex-col items-center overflow-hidden border-b border-[rgba(120,113,108,0.25)] px-4 pb-16 pt-20 text-center dark:border-[rgba(79,209,184,0.18)] sm:pb-20 sm:pt-24"
  >
    {/* Parallax BG orb */}
    <div
      ref={heroBgRef}
      className="pointer-events-none absolute -right-20 -top-32 h-[520px] w-[520px] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(79,209,184,0.07) 0%, transparent 70%)",
      }}
    />

    <div className="relative z-10 w-full max-w-[1360px] mx-auto">
      {/* Back link — left aligned */}
      <div className="mb-9 flex justify-start sm:mb-11">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[0.75rem] tracking-[0.28em] text-stone-700 dark:text-[#4fd1b8] opacity-80 hover:opacity-100 transition-opacity no-underline"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>BACK TO HOME</span>
        </Link>
      </div>

      <p
        ref={heroEyebrowRef}
        className="mb-4 text-[0.8rem] tracking-[0.32em] text-stone-700 dark:text-[#4fd1b8] opacity-0 translate-y-6"
      />

      <h1
        ref={heroTitleRef}
        className="font-display text-[clamp(2.55rem,14vw,9.5rem)] leading-[0.93] tracking-[0.03em] text-stone-700 dark:text-[#80e8d4] opacity-0 translate-y-6"
      >
        CLEAR{" "}
        <span className="font-['Playfair_Display'] italic text-[0.9em] text-black dark:text-[#ede9e3]">
          pricing.
        </span>
        <br />
        NO SURPRISES.
      </h1>
    </div>
  </section>

  {/* ── PRICING SERVICES ── */}
  {pricingCatalog.map((svc, svcIdx) => (
    <section
      key={svc.slug}
      ref={(el) => { svcRefs.current[svcIdx] = el }}
      className="parallax-section border-b border-[rgba(120,113,108,0.25)] px-4 py-12 dark:border-[rgba(79,209,184,0.18)] sm:py-[4.5rem]"
    >
      <div className="max-w-[1360px] mx-auto">
        {/* Header row */}
        <div className="mb-9 flex flex-wrap items-start justify-between gap-6 sm:mb-11 md:items-end">
          <div>
            <p className="mb-2 text-[0.75rem] tracking-[0.28em] text-stone-700 dark:text-[#4fd1b8] opacity-70">
              {svc.number} / 04
            </p>
            <h2 className="svc-title-anim opacity-0 translate-y-6 font-display text-[clamp(2.2rem,8vw,5rem)] leading-none tracking-[0.04em] text-black dark:text-[#ede9e3]">
              {svc.title.toUpperCase()}
            </h2>
          </div>
          <p className="w-full text-left text-[0.95rem] font-light leading-[1.65] text-[#3a3a3a] dark:text-[rgba(214,207,199,0.78)] md:max-w-[380px] md:text-right">
            {svc.description}
          </p>
        </div>

        {/* Plan cards */}
        <div className="cards-container-anim cards-border-anim mb-5 grid grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] md:grid-cols-3">
          {svc.plans.map((plan) => (
            <div
              key={plan.key}
              className={`plan-card-anim relative flex translate-y-6 flex-col p-6 opacity-0 transition-colors duration-200 sm:p-8 lg:p-9 ${
                plan.featured
                  ? "bg-[#e8f5f3] dark:bg-[#081e1b] hover:bg-[#dbdbdb] dark:hover:bg-[#0d2320]"
                  : "bg-[#f8f8f8] dark:bg-[#050f0d] hover:bg-[#efefef] dark:hover:bg-[#0a1e1b]"
              }`}
            >
              {plan.featured && (
                <span className="absolute right-4 top-4 rounded-full border border-[rgba(120,113,108,0.3)] px-[0.5rem] py-[0.16rem] text-[0.58rem] tracking-[0.16em] text-stone-700 dark:border-[rgba(79,209,184,0.18)] dark:text-[#4fd1b8] sm:right-5 sm:top-5 sm:text-[0.65rem] sm:tracking-[0.2em]">
                  MOST POPULAR
                </span>
              )}
              <p className="mb-2 text-[0.75rem] tracking-[0.22em] text-stone-700 dark:text-[#4fd1b8]">
                {plan.name.toUpperCase()}
              </p>
              <p className="mb-1 font-display text-[clamp(2.1rem,9vw,3rem)] leading-none tracking-[0.02em] text-black dark:text-[#ede9e3]">
                {plan.price}
              </p>
              <p className="mb-1 text-[0.82rem] text-stone-700 dark:text-[#4fd1b8] opacity-85">
                {plan.screens}
              </p>
              <p className="mb-7 text-[0.82rem] font-light text-[#444444] dark:text-[rgba(214,207,199,0.78)]">
                {plan.turnaround} delivery
              </p>
              <hr className="mb-7 border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)]" />
              <ul className="mb-auto flex flex-col gap-[0.65rem]">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-[0.6rem] text-[0.9rem] leading-[1.55] text-[#1a1a1a] dark:text-[#d6cfc7]">
                    <span className="mt-[6px] h-[5px] w-[5px] shrink-0 rounded-full bg-stone-700 dark:bg-[#4fd1b8] opacity-80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={{ pathname: "/contact", query: { service: svc.slug, plan: plan.key, price: plan.price } }}
                className={`mt-8 inline-flex w-full items-center justify-center gap-[0.4rem] rounded-full border px-[1.35rem] py-[0.65rem] text-[0.73rem] font-medium tracking-[0.1em] no-underline transition-all duration-200 sm:w-auto ${
                  plan.featured
                    ? "border-stone-800 dark:border-[#4fd1b8] bg-stone-800 dark:bg-[#4fd1b8] text-stone-100 dark:text-[#030a08] font-semibold hover:bg-stone-900 dark:hover:bg-[#80e8d4] hover:border-stone-900 dark:hover:border-[#80e8d4]"
                    : "border-[rgba(120,113,108,0.35)] dark:border-[rgba(79,209,184,0.18)] text-stone-800 dark:text-[#4fd1b8] hover:bg-stone-800 dark:hover:bg-[#4fd1b8] hover:text-stone-100 dark:hover:text-[#030a08]"
                }`}
              >
                Select {plan.name} <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>

        {/* Scale tiers */}
        {svc.scaleItems.length > 0 && (
          <>
            <p className="mb-3 text-[0.75rem] tracking-[0.28em] text-stone-700 dark:text-[#4fd1b8] opacity-80">
              LARGE-SCALE PROJECTS
            </p>
            <div className="projects-container-anim projects-border-anim grid grid-cols-1 gap-px overflow-hidden rounded-[1.1rem] border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] md:grid-cols-3">
              {svc.scaleItems.map((s) => (
                <div
                  key={s.key}
                  className="scale-card-anim flex translate-y-6 flex-col gap-[0.35rem] bg-[#f0f0f0] p-6 opacity-0 transition-colors duration-200 hover:bg-[#e4e4e4] dark:bg-[#030a08] dark:hover:bg-[#0d2320] sm:p-7"
                >
                  <p className="text-[0.78rem] tracking-[0.18em] text-stone-700 dark:text-[#4fd1b8] opacity-85">
                    {s.screens.toUpperCase()}
                  </p>
                  <p className="font-display text-[2.25rem] leading-none tracking-[0.02em] text-black dark:text-[#ede9e3]">
                    {s.price}
                  </p>
                  <p className="text-[0.8rem] font-light text-[#444444] dark:text-[rgba(214,207,199,0.78)]">
                    {s.turnaround} estimated
                  </p>
                  <Link
                    href={{ pathname: "/contact", query: { service: svc.slug, plan: s.key, price: s.price } }}
                    className="mt-[0.6rem] inline-flex items-center gap-[0.3rem] text-[0.78rem] tracking-[0.14em] text-stone-700 dark:text-[#4fd1b8] opacity-80 no-underline transition-opacity hover:opacity-100"
                  >
                    Get a custom quote <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  ))}

  {/* ── INCLUDED / NOT INCLUDED ── */}
  <section
    ref={inclRef}
    className="border-b border-[rgba(120,113,108,0.25)] px-4 py-12 dark:border-[rgba(79,209,184,0.18)] sm:py-[4.5rem]"
  >
    <div className="max-w-[1360px] mx-auto">
      <p className="mb-3 text-[0.75rem] tracking-[0.3em] text-stone-700 dark:text-[#4fd1b8] opacity-90">
        EVERY PLAN
      </p>
      <h2 className="mb-12 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.93] tracking-[0.04em] text-black dark:text-[#ede9e3]">
        WHAT&apos;S{" "}
        <span className="font-['Playfair_Display'] italic">in</span> AND{" "}
        <span className="font-['Playfair_Display'] italic">out</span>
      </h2>
      <div className="incl-container-anim incl-border-anim grid grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] md:grid-cols-2">
        <div className="incl-col-anim translate-y-6 bg-[#f8f8f8] p-6 opacity-0 dark:bg-[#050f0d] sm:p-9">
          <p className="mb-7 flex items-center gap-2 text-[0.75rem] tracking-[0.22em] text-stone-700 dark:text-[#4fd1b8] font-medium">
            ✓ &nbsp;INCLUDED IN EVERY PLAN
          </p>
          <ul className="flex flex-col gap-[1.1rem]">
            {includedItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.92rem] font-light leading-[1.6] text-[#1a1a1a] dark:text-[rgba(214,207,199,0.78)]">
                <span className="mt-[2px] shrink-0 text-[0.8rem] text-stone-700 dark:text-[#4fd1b8]">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="incl-col-anim border-t border-[rgba(120,113,108,0.25)] bg-[#f8f8f8] p-6 dark:border-[rgba(79,209,184,0.18)] dark:bg-[#050f0d] md:border-l md:border-t-0 sm:p-9">
          <p className="mb-7 flex items-center gap-2 text-[0.75rem] tracking-[0.22em] text-[#c54545] dark:text-[#e07070] font-medium">
            ✕ &nbsp;NOT INCLUDED
          </p>
          <ul className="flex flex-col gap-[1.1rem]">
            {notIncludedItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.92rem] font-light leading-[1.6] text-[#1a1a1a] dark:text-[rgba(214,207,199,0.78)]">
                <span className="mt-[2px] shrink-0 text-[0.8rem] text-[#c54545] dark:text-[#e07070] opacity-90">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>

  {/* ── FAQ ── */}
  <section
    ref={faqRef}
    className="border-b border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] px-4 py-[4.5rem]"
  >
    <div className="max-w-[1360px] mx-auto">
      <p className="mb-3 text-[0.75rem] tracking-[0.3em] text-stone-700 dark:text-[#4fd1b8] opacity-90">
        COMMON QUESTIONS
      </p>
      <h2 className="mb-11 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.93] tracking-[0.04em] text-black dark:text-[#ede9e3]">
        FREQUENTLY <span className="font-['Playfair_Display'] italic">asked</span>
      </h2>
      <div className="faq-container-anim faq-border-anim flex flex-col gap-px rounded-[1.5rem] overflow-hidden border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)]">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className={`faq-item-anim opacity-0 cursor-pointer transition-colors duration-200 ${
              openFaq === i
                ? "bg-stone-100 dark:bg-[#081e1b]"
                : "bg-[#f8f8f8] dark:bg-[#050f0d] hover:bg-stone-50 dark:hover:bg-[#0a1e1b]"
            }`}
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <div className="flex items-center justify-between gap-8 px-8 py-[1.65rem]">
              <span className="text-[1rem] font-medium leading-[1.45] text-black dark:text-[#ede9e3]">
                {faq.q}
              </span>
              <span
                className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border text-[1.15rem] transition-all duration-[250ms] ${
                  openFaq === i
                    ? "rotate-45 border-stone-800 dark:border-[#4fd1b8] bg-stone-800 dark:bg-[#4fd1b8] text-stone-100 dark:text-[#030a08]"
                    : "border-[rgba(120,113,108,0.35)] dark:border-[rgba(79,209,184,0.18)] text-stone-700 dark:text-[#4fd1b8]"
                }`}
              >
                +
              </span>
            </div>
            <div
              className="overflow-hidden transition-[max-height] duration-[380ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ maxHeight: openFaq === i ? "220px" : "0px" }}
            >
              <div className="border-t border-[rgba(120,113,108,0.15)] dark:border-[rgba(79,209,184,0.18)] px-8 pb-[1.65rem] pt-[1.35rem] text-[0.92rem] font-light leading-[1.8] text-[#333333] dark:text-[rgba(214,207,199,0.78)]">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ── CTA STRIP ── */}
  <section ref={ctaRef} className="px-4 pb-20 pt-14 sm:pb-24 sm:pt-16">
    <div className="max-w-[1360px] mx-auto">
      <div className="cta-inner-anim relative flex translate-y-6 flex-wrap items-start justify-between gap-6 overflow-hidden rounded-[1.5rem] border border-[rgba(120,113,108,0.25)] bg-[#f8f8f8] p-6 opacity-0 dark:border-[rgba(79,209,184,0.18)] dark:bg-[#050f0d] sm:gap-8 sm:p-10 md:items-center">
        {/* Background orb */}
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(79,209,184,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10">
          <h3 className="mb-2 font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-none tracking-[0.04em] text-black dark:text-[#ede9e3]">
            SOMETHING UNIQUE? LET&apos;S TALK.
          </h3>
          <p className="max-w-[500px] text-[0.95rem] font-light leading-[1.65] text-[#333333] dark:text-[rgba(214,207,199,0.78)]">
            Your project doesn&apos;t have to fit a box. Describe what you need in the contact form and receive a fully custom, scoped quote within 24 hours — no pressure.
          </p>
        </div>
        <Link
          href="/contact"
          className="relative z-10 inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-stone-800 px-9 py-[0.9rem] text-[0.82rem] font-bold tracking-[0.12em] text-stone-100 no-underline transition-colors hover:bg-stone-900 dark:bg-[#4fd1b8] dark:text-[#030a08] dark:hover:bg-[#80e8d4] sm:w-auto"
        >
          GET A CUSTOM QUOTE <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
</div>
  )
}
