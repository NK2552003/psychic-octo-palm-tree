"use client"

import Link from "next/link"
import { FormEvent, useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import emailjs from "emailjs-com"
import { toast } from "sonner"
import PageDoodles from "@/components/PageDoodles"

const serviceOptions = [
  { value: "ui-ux-design", label: "UI/UX Design" },
  { value: "portfolio", label: "Portfolio Website" },
  { value: "landing-page", label: "Landing Page" },
  { value: "frontend-development", label: "Frontend Development" },
]

const planOptions = [
  { value: "starter", label: "Starter" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
  { value: "scale-100", label: "Scale · 100+ Screens" },
  { value: "scale-200", label: "Scale · 200+ Screens" },
  { value: "scale-300", label: "Scale · 300+ Screens" },
  { value: "custom", label: "Custom" },
]

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export default function ContactPage() {
  const searchParams = useSearchParams()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [timeline, setTimeline] = useState("")
  const [budget, setBudget] = useState("")
  const [message, setMessage] = useState("")
  const [selectedService, setSelectedService] = useState(serviceOptions[0].value)
  const [selectedPlan, setSelectedPlan] = useState(planOptions[0].value)
  const [selectedPrice, setSelectedPrice] = useState("")
  const [loading, setLoading] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroEyebrowRef = useRef<HTMLParagraphElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      document.body.style.height = ""
      document.body.style.overflowY = ""
      document.documentElement.style.overflowY = ""
    }
    resetToTop()
    const rafId = requestAnimationFrame(resetToTop)
    const timeoutId = window.setTimeout(resetToTop, 80)
    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    const serviceParam = normalizeSlug(searchParams.get("service") || "")
    const planParam = normalizeSlug(searchParams.get("plan") || "")
    const priceParam = (searchParams.get("price") || "").trim()

    if (serviceOptions.some((s) => s.value === serviceParam)) setSelectedService(serviceParam)
    if (planOptions.some((p) => p.value === planParam)) setSelectedPlan(planParam)
    if (priceParam) setSelectedPrice(priceParam)
  }, [searchParams])

  // ── GSAP animations ──
  useEffect(() => {
    let ctx: any

    const loadGSAP = async () => {
      const gsapModule = await import("gsap")
      const stModule = await import("gsap/ScrollTrigger")
      const gsap = gsapModule.gsap || gsapModule.default
      const ScrollTrigger = stModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Hero entrance
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

        // Hero parallax BG orb
        if (heroBgRef.current) {
          gsap.to(heroBgRef.current, {
            y: 100,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.5,
            },
          })
        }

        // Sidebar slide in from left
        if (sidebarRef.current) {
          gsap.fromTo(
            sidebarRef.current,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sidebarRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          )

          // Summary card rows stagger
          const rows = sidebarRef.current.querySelectorAll(".summary-row-anim")
          gsap.fromTo(
            rows,
            { opacity: 0, y: 15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sidebarRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          )
        }

        // Form slide in from right
        if (formRef.current) {
          gsap.fromTo(
            formRef.current,
            { opacity: 0, x: 40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: formRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          )

          // Form fields stagger
          const fields = formRef.current.querySelectorAll(".field-anim")
          gsap.fromTo(
            fields,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.07,
              ease: "power2.out",
              scrollTrigger: {
                trigger: formRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          )
          
          // Body container border appears after both sidebar and form animate in
          const bodyBorder = document.querySelector(".body-border-anim")
          if (bodyBorder) {
            gsap.fromTo(
              bodyBorder,
              { borderColor: "rgba(6,95,82,0)" },
              {
                borderColor: "rgba(6,95,82,0.25)",
                duration: 0.3,
                delay: 0.9,
                ease: "none",
                scrollTrigger: {
                  trigger: formRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            )
            
            const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
            if (isDarkMode) {
              gsap.fromTo(
                bodyBorder,
                { borderColor: "rgba(79,209,184,0)" },
                {
                  borderColor: "rgba(79,209,184,0.18)",
                  duration: 0.3,
                  delay: 0.9,
                  ease: "none",
                  scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                  },
                }
              )
            }
          }
        }
      })
    }

    loadGSAP()
    return () => { if (ctx) ctx.revert() }
  }, [])

  const serviceLabel = useMemo(
    () => serviceOptions.find((s) => s.value === selectedService)?.label || "Custom Service",
    [selectedService]
  )

  const planLabel = useMemo(
    () => planOptions.find((p) => p.value === selectedPlan)?.label || "Custom",
    [selectedPlan]
  )

  const selectedSummary = useMemo(() => {
    const base = `${serviceLabel} · ${planLabel}`
    return selectedPrice ? `${base} · ${selectedPrice}` : base
  }, [planLabel, selectedPrice, serviceLabel])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const fullMessage = [
      message.trim(),
      timeline ? `Timeline: ${timeline}` : "",
      budget ? `Budget: ${budget}` : "",
      `Selected Option: ${selectedSummary}`,
    ]
      .filter(Boolean)
      .join("\n")

    try {
      await emailjs.send(
        "service_r42eetw",
        "template_sslukhm",
        { name, email, company, services: selectedSummary, message: fullMessage },
        "2AfiXCyGp4WGbg9uy"
      )
      toast.success("Inquiry sent successfully")
      setName("")
      setEmail("")
      setCompany("")
      setTimeline("")
      setBudget("")
      setMessage("")
    } catch (error) {
      console.error("Failed to send contact inquiry:", error)
      toast.error("Unable to send inquiry right now")
    } finally {
      setLoading(false)
    }
  }

  // Shared input classes
  const inputCls =
    "w-full rounded-[0.6rem] border border-[rgba(6,95,82,0.25)] dark:border-[rgba(79,209,184,0.18)] bg-[#f0f0f0] dark:bg-[#030a08] px-[0.9rem] py-[0.7rem] text-[0.9rem] font-normal text-black dark:text-[#ede9e3] outline-none transition-all duration-200 placeholder:text-[rgba(42,42,42,0.4)] dark:placeholder:text-[rgba(214,207,199,0.35)] focus:border-[#065f52] dark:focus:border-[#4fd1b8] focus:bg-white dark:focus:bg-[#0a1f1c] appearance-none"

  return (
    <div className="relative overflow-x-hidden text-[#1a1a1a] dark:text-[#d6cfc7] min-h-screen">

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
        className="relative flex flex-col items-center overflow-hidden border-b border-[rgba(6,95,82,0.25)] px-4 pb-16 pt-20 text-center dark:border-[rgba(79,209,184,0.18)] sm:pb-20 sm:pt-24"
      >
        {/* Parallax BG orb */}
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute -left-24 -top-36 h-[560px] w-[560px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,209,184,0.06) 0%, transparent 68%)" }}
        />

        <div className="relative z-10 w-full max-w-[1360px] mx-auto">
          {/* Back link — left aligned */}
          <div className="mb-8 flex justify-start sm:mb-11">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-[0.75rem] tracking-[0.28em] text-[#065f52] dark:text-[#4fd1b8] opacity-80 hover:opacity-100 transition-opacity no-underline"
            >
              <span>←</span>
              <span>BACK TO PRICING</span>
            </Link>
          </div>

          <h1
            ref={heroTitleRef}
            className="font-display text-[clamp(2.5rem,11vw,8.5rem)] leading-[0.93] tracking-[0.04em] text-[#044d42] dark:text-[#80e8d4]"
          >
            LET&apos;S BUILD
            <br />
            <span className="font-['Playfair_Display'] italic text-[0.9em] text-black dark:text-[#ede9e3]">
              something.
            </span>
          </h1>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="px-4 pb-20 pt-12 sm:pb-24 sm:pt-16">
        <div className="max-w-[1360px] mx-auto">
          <div
            className="body-container-anim body-border-anim grid grid-cols-1 gap-px overflow-hidden rounded-[1.5rem] border border-[rgba(6,95,82,0.25)] dark:border-[rgba(79,209,184,0.18)] lg:grid-cols-[minmax(0,_0.85fr)_minmax(0,_1.15fr)]"
          >

            {/* ── SIDEBAR ── */}
            <aside
              ref={sidebarRef}
              className="relative flex flex-col gap-0 overflow-hidden bg-[#e8f5f3] px-6 py-8 dark:bg-[#081e1b] sm:px-8 sm:py-10 lg:px-9"
            >
              {/* BG orb */}
              <div
                className="pointer-events-none absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(79,209,184,0.07) 0%, transparent 70%)" }}
              />

              <p className="relative z-10 mb-2 text-[0.75rem] tracking-[0.28em] text-[#065f52] dark:text-[#4fd1b8] opacity-80">
                YOUR SELECTION
              </p>
              <h2 className="relative z-10 mb-8 font-display text-[clamp(1.7rem,7vw,2.75rem)] leading-[0.93] tracking-[0.04em] text-black dark:text-[#ede9e3] sm:mb-9">
                SELECTED{" "}
                <span className="font-['Playfair_Display'] italic">option</span>
              </h2>

              {/* Summary card */}
              <div className="relative z-10 mb-8 overflow-hidden rounded-[1rem] border border-[rgba(6,95,82,0.25)] dark:border-[rgba(79,209,184,0.18)]">
                <div className="summary-row-anim flex flex-col gap-1 border-b border-[rgba(6,95,82,0.2)] dark:border-[rgba(79,209,184,0.18)] px-5 py-4">
                  <span className="text-[0.68rem] tracking-[0.25em] text-[#065f52] dark:text-[#4fd1b8] opacity-75">
                    SERVICE
                  </span>
                  <span className="text-[0.95rem] font-medium text-black dark:text-[#ede9e3] leading-[1.35]">
                    {serviceLabel}
                  </span>
                </div>
                <div className="summary-row-anim flex flex-col gap-1 border-b border-[rgba(6,95,82,0.2)] dark:border-[rgba(79,209,184,0.18)] px-5 py-4">
                  <span className="text-[0.68rem] tracking-[0.25em] text-[#065f52] dark:text-[#4fd1b8] opacity-75">
                    PLAN
                  </span>
                  <span className="text-[0.95rem] font-medium text-black dark:text-[#ede9e3] leading-[1.35]">
                    {planLabel}
                  </span>
                </div>
                <div className="summary-row-anim flex flex-col gap-1 px-5 py-4">
                  <span className="text-[0.68rem] tracking-[0.25em] text-[#065f52] dark:text-[#4fd1b8] opacity-75">
                    PRICE
                  </span>
                  <span className="font-display text-[1.6rem] tracking-[0.04em] leading-none text-[#044d42] dark:text-[#80e8d4]">
                    {selectedPrice || "Custom quote"}
                  </span>
                </div>
              </div>

              <p className="relative z-10 mt-auto text-[0.88rem] font-light leading-[1.75] text-[#333333] dark:text-[rgba(214,207,199,0.78)]">
                <strong className="text-[#065f52] dark:text-[#4fd1b8] font-medium">
                  Typical reply: within 24 hours.
                </strong>{" "}
                If your scope is unclear, choose Custom and describe the core idea — I'll scope it and send a detailed quote before any payment.
                <br /><br />
                For large-scale projects (100+ screens), we'll start with a short discovery call at no charge.
              </p>
            </aside>

            {/* ── FORM ── */}
            <form ref={formRef} onSubmit={handleSubmit} className="bg-[#f8f8f8] px-6 py-8 dark:bg-[#050f0d] sm:px-8 sm:py-10 lg:px-9">
              <p className="mb-6 text-[0.75rem] tracking-[0.28em] text-[#065f52] dark:text-[#4fd1b8] opacity-80">
                YOUR DETAILS
              </p>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Personal fields */}
                <div className="field-anim flex flex-col gap-2">
                  <label className="text-[0.78rem] tracking-[0.12em] font-medium text-[#1a1a1a] dark:text-[rgba(214,207,199,0.85)]">
                    Name <span className="text-[#065f52] dark:text-[#4fd1b8] ml-[2px] opacity-90">*</span>
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputCls}
                  />
                </div>

                <div className="field-anim flex flex-col gap-2">
                  <label className="text-[0.78rem] tracking-[0.12em] font-medium text-[#1a1a1a] dark:text-[rgba(214,207,199,0.85)]">
                    Email <span className="text-[#065f52] dark:text-[#4fd1b8] ml-[2px] opacity-90">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </div>

                <div className="field-anim flex flex-col gap-2">
                  <label className="text-[0.78rem] tracking-[0.12em] font-medium text-[#1a1a1a] dark:text-[rgba(214,207,199,0.85)]">
                    Company
                  </label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Optional"
                    className={inputCls}
                  />
                </div>

                <div className="field-anim flex flex-col gap-2">
                  <label className="text-[0.78rem] tracking-[0.12em] font-medium text-[#1a1a1a] dark:text-[rgba(214,207,199,0.85)]">
                    Timeline
                  </label>
                  <input
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    placeholder="e.g. 2 weeks"
                    className={inputCls}
                  />
                </div>

                {/* Divider */}
                <div
                  className="my-1 h-px bg-[rgba(6,95,82,0.2)] dark:bg-[rgba(79,209,184,0.18)] md:col-span-2"
                />
                <p
                  className="mt-1 text-[0.68rem] tracking-[0.28em] text-[#065f52] opacity-70 dark:text-[#4fd1b8] md:col-span-2"
                >
                  PROJECT DETAILS
                </p>

                {/* Service + Plan */}
                <div className="field-anim flex flex-col gap-2">
                  <label className="text-[0.78rem] tracking-[0.12em] font-medium text-[#1a1a1a] dark:text-[rgba(214,207,199,0.85)]">
                    Service
                  </label>
                  <div className="relative">
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className={`${inputCls} pr-9 cursor-pointer`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23065f52' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.9rem center",
                      }}
                    >
                      {serviceOptions.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field-anim flex flex-col gap-2">
                  <label className="text-[0.78rem] tracking-[0.12em] font-medium text-[#1a1a1a] dark:text-[rgba(214,207,199,0.85)]">
                    Plan
                  </label>
                  <div className="relative">
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className={`${inputCls} pr-9 cursor-pointer`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23065f52' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.9rem center",
                      }}
                    >
                      {planOptions.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget full width */}
                <div className="field-anim flex flex-col gap-2 md:col-span-2">
                  <label className="text-[0.78rem] tracking-[0.12em] font-medium text-[#1a1a1a] dark:text-[rgba(214,207,199,0.85)]">
                    Budget (INR)
                  </label>
                  <input
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder={selectedPrice || "e.g. INR 10,000"}
                    className={inputCls}
                  />
                </div>

                {/* Message full width */}
                <div className="field-anim flex flex-col gap-2 md:col-span-2">
                  <label className="text-[0.78rem] tracking-[0.12em] font-medium text-[#1a1a1a] dark:text-[rgba(214,207,199,0.85)]">
                    Message <span className="text-[#065f52] dark:text-[#4fd1b8] ml-[2px] opacity-90">*</span>
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe what you want to build — the more detail the better."
                    className={`${inputCls} min-h-[130px] resize-y leading-[1.65]`}
                  />
                </div>
              </div>

              {/* Form footer */}
              <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-none bg-[#065f52] px-9 py-[0.85rem] text-[0.82rem] font-bold tracking-[0.12em] text-white transition-colors duration-200 hover:bg-[#044d42] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#4fd1b8] dark:text-[#030a08] dark:hover:bg-[#80e8d4] sm:w-auto"
                >
                  {loading ? (
                    <>
                      <span
                        className="h-[14px] w-[14px] rounded-full border-2 border-[rgba(255,255,255,0.3)] border-t-white dark:border-t-[#030a08] animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Inquiry ↗"
                  )}
                </button>
                <Link
                  href="/pricing"
                  className="text-center text-[0.82rem] tracking-[0.05em] text-[#065f52] opacity-70 no-underline transition-opacity hover:opacity-100 dark:text-[#4fd1b8] sm:text-left"
                >
                  ← Change selected option
                </Link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}
