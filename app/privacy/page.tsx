"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import PageDoodles from "@/components/PageDoodles"

const lastUpdated = "April 2026"

const sections = [
  {
    number: "01",
    title: "Who This Applies To",
    body: [
      "This Privacy Policy applies to all visitors of nitish.world and any subdomains or pages associated with this portfolio — including the contact form, pricing page, and process page.",
      "By using this site, you agree to the practices described here. If you do not agree, please refrain from submitting any personal information through the contact form.",
    ],
  },
  {
    number: "02",
    title: "What Information Is Collected",
    body: [
      "This site collects only the information you voluntarily provide through the contact form: your name, email address, and the details of your project inquiry. No account creation is required and no logins are tracked.",
      "Standard web server logs (IP address, browser type, referring URL, and page visit timestamps) may be recorded automatically as part of hosting infrastructure. This data is anonymised and not used to identify individuals.",
      "No cookies are set for tracking, advertising, or analytics purposes beyond basic hosting logs. No third-party advertising or social media tracking pixels are present on this site.",
    ],
  },
  {
    number: "03",
    title: "How Your Information Is Used",
    body: [
      "Information submitted through the contact form is used solely to respond to your inquiry and discuss potential project collaboration. It is never sold, rented, shared with third-party marketers, or used for cold outreach beyond your original inquiry.",
      "Your email address will only be used to reply to your message. You will not be added to any mailing list or newsletter without your explicit consent.",
    ],
  },
  {
    number: "04",
    title: "Data Storage and Retention",
    body: [
      "Contact form submissions are stored in a secure inbox. Correspondence is retained for as long as it is operationally relevant — typically for the duration of a project engagement and a reasonable period thereafter for reference.",
      "You may request deletion of your submitted data at any time by emailing directly from the same address used in your inquiry. Requests are processed within 7 business days.",
    ],
  },
  {
    number: "05",
    title: "Third-Party Services",
    body: [
      "This site may use Vercel for hosting and deployment, which handles standard web logs as described in their own privacy policy. No data collected by this site is shared with Vercel beyond what is inherent to the hosting relationship.",
      "The contact form may route through a form-handling service (such as Formspree or Resend). These services receive only the data you submit and are bound by their own privacy policies. Links to those policies are available on their respective websites.",
      "Payment processing (for confirmed projects) is handled via Razorpay. This site never receives, stores, or transmits your payment card details — all payment data is handled exclusively by Razorpay under their own PCI-compliant infrastructure.",
    ],
  },
  {
    number: "06",
    title: "Analytics",
    body: [
      "This site does not currently use Google Analytics, Meta Pixel, or any behavioural analytics platform. If lightweight privacy-respecting analytics (such as Plausible or Fathom) are introduced in future, this policy will be updated to reflect that change.",
      "No profiling, behavioural targeting, or cross-site tracking is performed on visitors of this site.",
    ],
  },
  {
    number: "07",
    title: "Your Rights",
    body: [
      "You have the right to request access to any personal data held about you, request correction of inaccurate data, request deletion of your data (the 'right to be forgotten'), and withdraw any consent you have previously provided.",
      "To exercise any of these rights, contact directly via the email address listed on the contact page. There is no cost to submit a rights request and no obligation to provide a reason.",
    ],
  },
  {
    number: "08",
    title: "Security",
    body: [
      "Reasonable technical and organisational measures are in place to protect the data you submit — including HTTPS-encrypted transmission and access-controlled storage. No method of transmission over the internet is 100% secure, and absolute security cannot be guaranteed.",
      "In the unlikely event of a data breach affecting your personal information, you will be notified promptly via the email address you provided.",
    ],
  },
  {
    number: "09",
    title: "Children's Privacy",
    body: [
      "This site is not directed at children under the age of 13. No information is knowingly collected from minors. If you believe a minor has submitted information through this site, please contact immediately so the data can be removed.",
    ],
  },
  {
    number: "10",
    title: "Changes to This Policy",
    body: [
      "This Privacy Policy may be updated periodically to reflect changes in practice, legal requirements, or site features. The 'Last Updated' date at the top of this page will always reflect the most recent revision.",
      "Continued use of the site after a policy update constitutes acceptance of the revised terms. Material changes will be noted at the top of the page for a reasonable period following the update.",
    ],
  },
  {
    number: "11",
    title: "Contact",
    body: [
      "Questions, requests, or concerns about this Privacy Policy can be directed to the contact page at nitish.world/contact. Responses are typically sent within 2 business days.",
    ],
    hasContactLink: true,
  },
]

export default function PrivacyPage() {
  const heroRef = useRef<HTMLElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroEyebrowRef = useRef<HTMLParagraphElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState<string>("01")

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

        // ── SECTIONS ──
        if (contentRef.current) {
          const items = contentRef.current.querySelectorAll(".section-item-anim")
          gsap.fromTo(
            items,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 80%",
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

  // ── ACTIVE SECTION TRACKING via IntersectionObserver ──
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((s) => {
      const el = document.getElementById(`section-${s.number}`)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(s.number)
          }
        },
        {
          rootMargin: "-30% 0px -60% 0px",
          threshold: 0,
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
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

      <PageDoodles iconCount={15} dotCount={10} />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] px-4 pb-20 pt-24 text-center flex flex-col items-center"
      >
        <div
          ref={heroBgRef}
          className="pointer-events-none absolute -right-20 -top-32 h-[520px] w-[520px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(79,209,184,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative z-10 w-full max-w-[1360px] mx-auto">
          <div className="flex justify-start mb-11">
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
            LAST UPDATED — {lastUpdated.toUpperCase()}
          </p>
          <h1
            ref={heroTitleRef}
            className="font-display text-[clamp(3rem,10vw,9.5rem)] leading-[0.93] tracking-[0.04em] text-stone-700 dark:text-[#80e8d4] opacity-0 translate-y-6"
          >
            YOUR DATA.{" "}
            <span className="font-['Playfair_Display'] italic text-[0.9em] text-black dark:text-[#ede9e3]">
              respected.
            </span>
          </h1>
          <p className="mt-8 mx-auto max-w-[560px] text-[1rem] font-light leading-[1.75] text-[#3a3a3a] dark:text-[rgba(214,207,199,0.78)]">
            A straightforward account of what information this site collects, why it collects it, and exactly what happens to it.
          </p>
        </div>
      </section>

      {/* ── QUICK SUMMARY STRIP ── */}
      <section className="border-b border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] px-4 py-12">
        <div className="max-w-[1360px] mx-auto">
          {/* Mobile: 1 col → sm: 2 col → lg: 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-[1.5rem] overflow-hidden border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)]">
            {[
              { icon: "◎", label: "No tracking cookies", body: "No third-party ad pixels or behavioural tracking of any kind." },
              { icon: "◈", label: "No data selling", body: "Your contact details are never sold, rented, or shared with marketers." },
              { icon: "↗", label: "Delete anytime", body: "Request removal of your submitted data at any point — no questions asked." },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col gap-3 p-7 sm:p-9 transition-colors duration-200 ${
                  i % 2 === 0
                    ? "bg-[#e8f5f3] dark:bg-[#081e1b] hover:bg-[#dbefec] dark:hover:bg-[#0d2320]"
                    : "bg-[#f8f8f8] dark:bg-[#050f0d] hover:bg-[#efefef] dark:hover:bg-[#0a1e1b]"
                }`}
              >
                <span className="text-[1.8rem] text-stone-700 dark:text-[#4fd1b8] opacity-50 leading-none">{item.icon}</span>
                <p className="text-[0.95rem] font-semibold text-black dark:text-[#ede9e3]">{item.label}</p>
                <p className="text-[0.85rem] font-light leading-[1.7] text-[#333333] dark:text-[rgba(214,207,199,0.78)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL POLICY SECTIONS ── */}
      <section
        ref={contentRef}
        className="border-b border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] px-4 py-[4.5rem]"
      >
        <div className="max-w-[1360px] mx-auto">
          <p className="mb-3 text-[0.75rem] tracking-[0.3em] text-stone-700 dark:text-[#4fd1b8] opacity-90">
            FULL POLICY
          </p>
          <h2 className="mb-14 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.93] tracking-[0.04em] text-black dark:text-[#ede9e3]">
            EVERYTHING{" "}
            <span className="font-['Playfair_Display'] italic">in</span> WRITING.
          </h2>

          {/*
            ── STICKY SIDEBAR LAYOUT ──
            The trick: outer wrapper is `relative`. Sidebar uses `sticky top-[5rem]`
            with NO height constraint on the parent (no items-stretch, no overflow-hidden).
            The content column drives the height; sidebar floats alongside it.
          */}
          <div className="relative flex flex-col xl:flex-row gap-8 xl:gap-12 items-start">

            {/* ── STICKY TOC — desktop only ── */}
     

            {/* ── CONTENT ── */}
            <div className="flex-1 min-w-0 flex flex-col gap-px rounded-[1.5rem] overflow-hidden border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)]">
              {sections.map((section, i) => (
                <div
                  key={section.number}
                  id={`section-${section.number}`}
                  className={`section-item-anim opacity-0 p-7 sm:p-10 scroll-mt-[6rem] transition-colors duration-200 ${
                    i % 2 === 0
                      ? "bg-[#f8f8f8] dark:bg-[#050f0d] hover:bg-[#f2f2f2] dark:hover:bg-[#081611]"
                      : "bg-[#f4f4f4] dark:bg-[#060f0d] hover:bg-[#eeeeee] dark:hover:bg-[#081e1b]"
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-[2rem] sm:w-[2.5rem]">
                      <span className="font-display text-[1.2rem] sm:text-[1.4rem] leading-none text-stone-700 dark:text-[#4fd1b8] opacity-40">
                        {section.number}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-4 font-display text-[clamp(1.1rem,2vw,1.6rem)] leading-none tracking-[0.03em] text-black dark:text-[#ede9e3]">
                        {section.title.toUpperCase()}
                      </h3>
                      <div className="flex flex-col gap-4">
                        {section.body.map((para, j) => (
                          <p
                            key={j}
                            className="text-[0.9rem] sm:text-[0.92rem] font-light leading-[1.85] text-[#2a2a2a] dark:text-[rgba(214,207,199,0.78)]"
                          >
                            {section.hasContactLink && j === section.body.length - 1 ? (
                              <>
                                Questions, requests, or concerns about this Privacy Policy can be directed to the contact page at{" "}
                                <Link
                                  href="/contact"
                                  className="text-stone-700 dark:text-[#4fd1b8] underline underline-offset-4 hover:opacity-80 transition-opacity"
                                >
                                  nitish.world/contact or nitishkr.fun/contact
                                </Link>
                                . Responses are typically sent within 2 business days.
                              </>
                            ) : (
                              para
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="px-4 pb-24 pt-16">
        <div className="max-w-[1360px] mx-auto">
          <div className="cta-inner-anim opacity-0 translate-y-6 relative overflow-hidden rounded-[1.5rem] border border-[rgba(120,113,108,0.25)] dark:border-[rgba(79,209,184,0.18)] bg-[#f8f8f8] dark:bg-[#050f0d] p-8 sm:p-10 flex flex-wrap items-center justify-between gap-8">
            <div
              className="pointer-events-none absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(79,209,184,0.06) 0%, transparent 70%)" }}
            />
            <div className="relative z-10">
              <h3 className="mb-2 font-display text-[clamp(1.3rem,3vw,2.25rem)] leading-none tracking-[0.04em] text-black dark:text-[#ede9e3]">
                HAVE A QUESTION ABOUT YOUR DATA?
              </h3>
              <p className="max-w-[500px] text-[0.95rem] font-light leading-[1.65] text-[#333333] dark:text-[rgba(214,207,199,0.78)]">
                If anything in this policy is unclear, or you'd like to request access or deletion of your information, reach out directly. No forms, no bots.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative z-10 inline-flex shrink-0 items-center gap-2 rounded-full bg-stone-800 dark:bg-[#4fd1b8] px-9 py-[0.9rem] text-[0.82rem] font-bold tracking-[0.12em] text-stone-100 dark:text-[#030a08] no-underline transition-colors hover:bg-stone-900 dark:hover:bg-[#80e8d4]"
            >
              GET IN TOUCH ↗
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}