"use client"

import { useState, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Box,
  Star,
  Calendar,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts"

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  language: string
  topics?: string[]
  created_at?: string
}

interface DevToArticle {
  id: number
  title: string
  description: string
  url: string
  published_at: string
  tags: string[]
}

export default function ProjectsPage() {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([])
  const [devtoArticles, setDevtoArticles] = useState<DevToArticle[]>([])
  const [loading, setLoading] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const doodlesRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])
  const cardsContainerRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (expandedSection === 3 && devtoArticles.length === 0) {
      fetchDevtoArticles()
    }
  }, [expandedSection, devtoArticles.length])

  // Register GSAP plugins and run initial entrance animations
  useEffect(() => {
    if (!containerRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Header / intro entrance
      gsap.from(".mb-16 > *", {
        y: 18,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out",
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Animate cards when a section is expanded
  useEffect(() => {
    if (expandedSection === null) return
    const container = cardsContainerRef.current[expandedSection]
    if (!container) return

    const cards = Array.from(container.querySelectorAll(".project-card"))
    if (cards.length === 0) return

    const tl = gsap.timeline()
    tl.fromTo(
      cards,
      { y: 20, opacity: 0, scale: 0.99 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.45,
        ease: "power2.out",
      },
    )

    return () => {
      tl.kill()
    }
  }, [expandedSection])

  // Smooth hover animations for section number and subtitle using GSAP
  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        if (!section) return

        const icon = section.querySelector(".section-icon") as HTMLElement
        const title = section.querySelector(".section-title") as HTMLElement
        const subtitle = section.querySelector(".section-subtitle") as HTMLElement
        if (!icon && !title && !subtitle) return

        const tl = gsap.timeline({ paused: true })
        if (icon)
          tl.to(
            icon,
            {
              x: 8,
              scale: 1.06,
              duration: 0.32,
              ease: "power2.out",
            },
            0,
          )

        if (title)
          tl.to(
            title,
            {
              x: 6,
              opacity: 0.95,
              duration: 0.32,
              ease: "power2.out",
            },
            0,
          )

        if (subtitle)
          tl.to(
            subtitle,
            {
              x: 8,
              skewX: 2.5,
              duration: 0.36,
              ease: "power2.out",
            },
            0,
          )

        const enter = () => tl.play()
        const leave = () => tl.reverse()

        section.addEventListener("mouseenter", enter)
        section.addEventListener("focus", enter)
        section.addEventListener("mouseleave", leave)
        section.addEventListener("blur", leave)

        ;(section as any)._gsapHoverCleanup = () => {
          section.removeEventListener("mouseenter", enter)
          section.removeEventListener("focus", enter)
          section.removeEventListener("mouseleave", leave)
          section.removeEventListener("blur", leave)
          tl.kill()
        }
      })
    }, containerRef)

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section && (section as any)._gsapHoverCleanup) (section as any)._gsapHoverCleanup()
      })
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      if (!section) return

      const content = section.querySelector(".section-content") as HTMLElement
      if (!content) return

      if (expandedSection === index) {
        gsap.set(content, { height: "auto" })
        const autoHeight = content.offsetHeight
        gsap.fromTo(
          content,
          {
            height: 0,
            opacity: 0,
          },
          {
            height: autoHeight,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(content, { height: "auto" })
            },
          },
        )
      } else {
        const currentHeight = content.offsetHeight
        if (currentHeight > 0) {
          gsap.fromTo(
            content,
            {
              height: currentHeight,
              opacity: 1,
            },
            {
              height: 0,
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
            },
          )
        }
      }
    })
  }, [expandedSection])

  const fetchGithubRepos = async () => {
    setLoading(true)
    try {
      const res = await fetch("https://api.github.com/users/nk2552003/repos?sort=updated&per_page=20")
      const data = await res.json()
      setGithubRepos(data)
    } catch (error) {
      console.error("Error fetching GitHub repos:", error)
    } finally {
      setLoading(false)
    }
  }

    // Local GitHub repo seed (used instead of fetching from GitHub API)
    const githubSeed: GitHubRepo[] = [
      {
        id: 1,
        name: "portfolio",
        description: "Personal portfolio built with Next.js and Tailwind CSS",
        html_url: "https://github.com/nk2552003/portfolio",
        stargazers_count: 42,
        language: "TypeScript",
        topics: ["frontpage", "nextjs"],
        created_at: "2024-06-10T12:00:00Z",
      },
      {
        id: 2,
        name: "jelly-text",
        description: "Animated jelly text effects for fun headings",
        html_url: "https://github.com/nk2552003/jelly-text",
        stargazers_count: 18,
        language: "JavaScript",
        topics: ["featured"],
        created_at: "2023-11-03T09:30:00Z",
      },
      {
        id: 3,
        name: "ui-kit",
        description: "Collection of reusable UI components and patterns",
        html_url: "https://github.com/nk2552003/ui-kit",
        stargazers_count: 7,
        language: "CSS",
        topics: ["components"],
        created_at: "2022-08-22T08:15:00Z",
      },
    ]

  const fetchDevtoArticles = async () => {
    setLoading(true)
    try {
      const res = await fetch("https://dev.to/api/articles?username=nk2552003")
      const data = await res.json()
      setDevtoArticles(data)
    } catch (error) {
      console.error("Error fetching Dev.to articles:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSection = (index: number) => {
    // If closing the currently expanded section, animate collapse first
    if (expandedSection === index) {
      const section = sectionsRef.current[index]
      const content = section?.querySelector(".section-content") as HTMLElement
      if (content) {
        const currentHeight = content.offsetHeight
        gsap.fromTo(
          content,
          { height: currentHeight, opacity: 1 },
          {
            height: 0,
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
            onComplete: () => setExpandedSection(null),
          },
        )
        return
      }
      setExpandedSection(null)
      return
    }

    // If another section is currently open, collapse it first, then open the new one.
    if (expandedSection !== null) {
      const openSection = sectionsRef.current[expandedSection]
      const openContent = openSection?.querySelector(".section-content") as HTMLElement
      if (openContent) {
        const currentHeight = openContent.offsetHeight
        gsap.fromTo(
          openContent,
          { height: currentHeight, opacity: 1 },
          {
            height: 0,
            opacity: 0,
            duration: 0.45,
            ease: "power2.inOut",
            onComplete: () => {
              setExpandedSection(index)
            },
          },
        )
        return
      }
    }

    setExpandedSection(index)
  }

  const scroll = (direction: "left" | "right", index: number) => {
    const container = cardsContainerRef.current[index]
    if (container) {
      const wrapper = container.querySelector(".cards-wrapper") as HTMLElement
      if (wrapper) {
        const scrollAmount = 400
        wrapper.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount
      }
    }
  }

  const sections = [
    {
      title: "The Code Chronicles",
      subtitle: "GitHub Repositories",
      description: "Where ideas transform into open-source reality, one commit at a time.",
      url: "https://github.com/nk2552003",
    },
    {
      title: "The Creative Playground",
      subtitle: "CodePen Experiments",
      description: "Interactive canvases where CSS dances and JavaScript brings magic to life.",
      url: "https://codepen.io/rlaqxvbr-the-bashful",
    },
    {
      title: "The Component Gallery",
      subtitle: "Uiverse Creations",
      description: "Curated UI components crafted with passion and shared with the world.",
      url: "https://uiverse.io/profile/NK2552003",
    },
    {
      title: "The Knowledge Archive",
      subtitle: "Dev.to Articles",
      description: "Stories of code, insights from battles fought, and wisdom gained through debugging.",
      url: "https://dev.to/nk2552003",
    },
  ]

  // prepare simple stats for charts
  const languageCounts = githubSeed.reduce((acc: Record<string, number>, r) => {
    const lang = r.language || "Unknown"
    acc[lang] = (acc[lang] || 0) + 1
    return acc
  }, {})

  const langData = Object.entries(languageCounts).map(([language, count]) => ({ language, count }))
  const starsData = githubSeed.map((r) => ({ name: r.name, stars: r.stargazers_count }))

  const getSectionIcon = (url: string, className = "h-4 w-4 md:h-5 md:w-5 xl:h-6 xl:w-6") => {
    if (!url) return <ExternalLink className={className} />
    if (url.includes("github.com")) return <Github className={className} />
    if (url.includes("codepen.io"))
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 2l9 6v8l-9 6-9-6V8l9-6z" />
          <path d="M12 4.2 6.6 8 12 10.8 17.4 8 12 4.2zM4 9.9v4.2L8.6 12 4 9.9zm16 0L15.4 12 20 13.8V9.9z" />
        </svg>
      )
    if (url.includes("uiverse.io")) return <Box className={className} />
    if (url.includes("dev.to") || url.includes("devto"))
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 3h18v18H3z" opacity="0.08" />
          <path d="M7 8h2.5v8H7V8zm3.75 0H13c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2H10.75V8zM16.5 8H20v8h-3.5V8z" />
        </svg>
      )

    return <ExternalLink className={className} />
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div ref={doodlesRef} className="absolute inset-0 pointer-events-none z-[5]" aria-hidden="true">
        {/* UI Sketch 1: Hand-drawn Button wireframe - top left empty space */}
        <svg
          className="absolute left-[2%] top-[6%] w-28 h-10 opacity-30 hidden sm:block"
          viewBox="0 0 140 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="8" width="130" height="34" rx="6" />
          <rect x="7" y="10" width="126" height="30" rx="5" opacity="0.5" />
          <line x1="50" y1="25" x2="90" y2="25" strokeWidth="3" />
        </svg>

        {/* Math Graph 1: Sine wave - top right empty space */}
        <svg
          className="absolute right-[3%] top-[10%] w-32 h-20 opacity-28 hidden md:block"
          viewBox="0 0 150 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M10 50 Q25 20, 40 50 T70 50 T100 50 T130 50" />
          <line x1="10" y1="50" x2="140" y2="50" strokeWidth="1" opacity="0.4" />
          <line x1="10" y1="20" x2="10" y2="80" strokeWidth="1" opacity="0.4" />
        </svg>

        {/* UI Sketch 2: Card component wireframe - left side between quotes */}
        <svg
          className="absolute left-[2%] top-[47%] w-24 h-28 opacity-35 hidden lg:block"
          viewBox="0 0 120 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="8" y="8" width="104" height="124" rx="8" />
          <rect x="18" y="18" width="84" height="40" rx="4" opacity="0.6" />
          <line x1="18" y1="72" x2="80" y2="72" strokeWidth="2.5" />
          <line x1="18" y1="85" x2="95" y2="85" strokeWidth="1.5" opacity="0.6" />
          <line x1="18" y1="95" x2="85" y2="95" strokeWidth="1.5" opacity="0.6" />
          <circle cx="28" cy="118" r="8" />
          <circle cx="50" cy="118" r="8" />
        </svg>

        {/* Math Graph 2: Bar chart sketch - right side middle section */}
        <svg
          className="absolute right-[3%] top-[44%] w-26 h-28 opacity-32 hidden lg:block"
          viewBox="0 0 120 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="15" y1="120" x2="105" y2="120" />
          <line x1="15" y1="20" x2="15" y2="120" />
          <rect x="25" y="70" width="15" height="50" />
          <rect x="45" y="40" width="15" height="80" />
          <rect x="65" y="85" width="15" height="35" />
          <rect x="85" y="55" width="15" height="65" />
        </svg>

        {/* UI Sketch 3: Input field wireframe - left bottom section */}
        <svg
          className="absolute left-[2%] bottom-[30%] w-32 h-12 opacity-33 hidden md:block"
          viewBox="0 0 160 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="8" y="12" width="144" height="36" rx="4" />
          <rect x="10" y="14" width="140" height="32" rx="3" opacity="0.5" />
          <line x1="20" y1="30" x2="65" y2="30" strokeWidth="2" />
          <circle cx="138" cy="30" r="6" />
        </svg>

        {/* Math Graph 3: Pie chart sketch - right bottom section */}
        <svg
          className="absolute right-[2%] bottom-[28%] w-24 h-24 opacity-35 hidden md:block"
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="60" cy="60" r="45" />
          <path d="M60 60 L60 15 A45 45 0 0 1 95 40 Z" opacity="0.6" />
          <path d="M60 60 L95 40 A45 45 0 0 1 85 95 Z" opacity="0.7" />
          <line x1="60" y1="60" x2="60" y2="15" />
          <line x1="60" y1="60" x2="95" y2="40" />
          <line x1="60" y1="60" x2="85" y2="95" />
        </svg>

        {/* UI Sketch 4: Toggle switch wireframe - top center-right empty space */}
        <svg
          className="absolute left-[58%] top-[4%] w-18 h-10 opacity-30 hidden sm:block"
          viewBox="0 0 80 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <rect x="8" y="12" width="64" height="26" rx="13" />
          <circle cx="56" cy="25" r="10" />
          <circle cx="56" cy="25" r="8" opacity="0.5" />
        </svg>

        {/* Math Graph 4: Coordinate system with parabola - bottom center right */}
        <svg
          className="absolute left-[70%] bottom-[20%] w-28 h-28 opacity-32 hidden lg:block"
          viewBox="0 0 140 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="20" y1="70" x2="120" y2="70" strokeWidth="1.5" />
          <line x1="70" y1="20" x2="70" y2="120" strokeWidth="1.5" />
          <path d="M30 115 Q45 90, 55 70 Q65 50, 70 30 Q75 50, 85 70 Q95 90, 110 115" strokeWidth="2.5" />
        </svg>

        {/* UI Sketch 5: Checkbox list wireframe - bottom left corner */}
        <svg
          className="absolute left-[4%] bottom-[10%] w-22 h-26 opacity-33 hidden md:block"
          viewBox="0 0 100 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="10" y="10" width="12" height="12" rx="2" />
          <line x1="30" y1="16" x2="80" y2="16" strokeWidth="2" />
          <rect x="10" y="35" width="12" height="12" rx="2" />
          <line x1="30" y1="41" x2="80" y2="41" strokeWidth="2" />
          <rect x="10" y="60" width="12" height="12" rx="2" />
          <line x1="30" y1="66" x2="80" y2="66" strokeWidth="2" />
          <polyline points="12,15 15,18 20,13" strokeWidth="2.5" />
        </svg>

        {/* Math Graph 5: Line graph with data points - middle right section */}
        <svg
          className="absolute right-[14%] top-[60%] w-28 h-22 opacity-30 hidden lg:block"
          viewBox="0 0 140 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="15" y1="85" x2="125" y2="85" strokeWidth="1.5" />
          <line x1="15" y1="15" x2="15" y2="85" strokeWidth="1.5" />
          <path d="M20 70 L40 50 L60 45 L80 30 L100 35 L120 25" strokeWidth="2.5" />
          <circle cx="20" cy="70" r="3" fill="currentColor" />
          <circle cx="40" cy="50" r="3" fill="currentColor" />
          <circle cx="60" cy="45" r="3" fill="currentColor" />
          <circle cx="80" cy="30" r="3" fill="currentColor" />
          <circle cx="100" cy="35" r="3" fill="currentColor" />
          <circle cx="120" cy="25" r="3" fill="currentColor" />
        </svg>

        {/* UI Sketch 6: Slider wireframe - bottom center left */}
        <svg
          className="absolute left-[36%] bottom-[6%] w-28 h-10 opacity-32 hidden sm:block"
          viewBox="0 0 140 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="20" y1="25" x2="120" y2="25" strokeWidth="3" />
          <circle cx="75" cy="25" r="10" />
          <circle cx="75" cy="25" r="7" opacity="0.6" />
        </svg>

        {/* UI Sketch 7: Dropdown menu wireframe - right middle-top section */}
        <svg
          className="absolute right-[12%] top-[24%] w-24 h-28 opacity-33 hidden lg:block"
          viewBox="0 0 120 140"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="10" y="10" width="100" height="30" rx="4" />
          <polyline points="85,22 93,22 89,28" />
          <rect x="10" y="48" width="100" height="82" rx="4" opacity="0.7" />
          <line x1="20" y1="65" x2="90" y2="65" strokeWidth="1.5" />
          <line x1="20" y1="83" x2="90" y2="83" strokeWidth="1.5" />
          <line x1="20" y1="101" x2="90" y2="101" strokeWidth="1.5" />
        </svg>

        {/* Math Graph 6: Exponential curve - top left-center */}
        <svg
          className="absolute left-[18%] top-[3%] w-26 h-26 opacity-28 hidden md:block"
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="15" y1="100" x2="110" y2="100" strokeWidth="1.5" />
          <line x1="15" y1="20" x2="15" y2="100" strokeWidth="1.5" />
          <path d="M20 95 Q30 85, 40 70 Q50 50, 60 35 Q70 20, 85 12 Q95 8, 105 7" strokeWidth="2.5" />
        </svg>

        {/* Additional UI Sketch 8: Radio buttons - left middle-top section */}
        <svg
          className="absolute left-[6%] top-[28%] w-20 h-24 opacity-30 hidden lg:block"
          viewBox="0 0 90 110"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="20" r="8" />
          <circle cx="18" cy="20" r="4" fill="currentColor" />
          <line x1="35" y1="20" x2="75" y2="20" strokeWidth="1.5" />
          <circle cx="18" cy="50" r="8" />
          <line x1="35" y1="50" x2="75" y2="50" strokeWidth="1.5" />
          <circle cx="18" cy="80" r="8" />
          <line x1="35" y1="80" x2="75" y2="80" strokeWidth="1.5" />
        </svg>

        {/* Additional Math Graph 7: Step function - bottom right corner */}
        <svg
          className="absolute right-[6%] bottom-[9%] w-26 h-24 opacity-30 hidden md:block"
          viewBox="0 0 120 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="10" y1="85" x2="110" y2="85" strokeWidth="1.5" />
          <line x1="10" y1="15" x2="10" y2="85" strokeWidth="1.5" opacity="0.4" />
          <path d="M15 75 L35 75 L35 55 L55 55 L55 40 L75 40 L75 25 L95 25" />
        </svg>

        {/* CENTER UI Sketch 1: Mobile screen wireframe - center area - VISIBLE ON MOBILE */}
        <svg
          className="absolute left-[25%] top-[15%] w-20 h-32 opacity-28 sm:w-24 sm:h-36 sm:left-[25%]"
          viewBox="0 0 100 160"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="10" y="10" width="80" height="140" rx="8" />
          <circle cx="50" cy="20" r="3" />
          <rect x="18" y="32" width="64" height="8" rx="2" opacity="0.6" />
          <rect x="18" y="48" width="64" height="36" rx="4" opacity="0.5" />
          <rect x="18" y="92" width="30" height="20" rx="3" opacity="0.5" />
          <rect x="52" y="92" width="30" height="20" rx="3" opacity="0.5" />
          <rect x="18" y="120" width="64" height="20" rx="4" opacity="0.6" />
        </svg>

        {/* CENTER Math Graph 1: Bell curve - center top area */}
        <svg
          className="absolute left-[65%] top-[12%] w-28 h-20 opacity-30 hidden sm:block md:w-32 md:h-24"
          viewBox="0 0 140 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="15" y1="80" x2="125" y2="80" strokeWidth="1.5" />
          <line x1="70" y1="20" x2="70" y2="80" strokeWidth="1.5" opacity="0.4" />
          <path d="M20 78 Q35 70, 45 55 Q55 35, 70 20 Q85 35, 95 55 Q105 70, 120 78" strokeWidth="2.5" />
        </svg>

        {/* CENTER UI Sketch 2: Search bar wireframe - center area - VISIBLE ON MOBILE */}
        <svg
          className="absolute left-[12%] top-[65%] w-28 h-10 opacity-32 sm:w-32 sm:h-12 sm:left-[40%] sm:top-[35%]"
          viewBox="0 0 160 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="8" y="15" width="120" height="30" rx="15" />
          <circle cx="138" cy="30" r="8" />
          <line x1="143" y1="35" x2="150" y2="42" strokeWidth="3" />
          <line x1="20" y1="30" x2="55" y2="30" strokeWidth="2" opacity="0.5" />
        </svg>

        {/* CENTER Math Graph 2: Scatter plot - center right area - VISIBLE ON MOBILE */}
        <svg
          className="absolute left-[58%] top-[50%] w-24 h-20 opacity-30 sm:w-28 sm:h-24"
          viewBox="0 0 130 110"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="15" y1="95" x2="115" y2="95" strokeWidth="1.5" />
          <line x1="15" y1="15" x2="15" y2="95" strokeWidth="1.5" />
          <circle cx="30" cy="75" r="3" fill="currentColor" />
          <circle cx="45" cy="60" r="3" fill="currentColor" />
          <circle cx="38" cy="80" r="3" fill="currentColor" />
          <circle cx="60" cy="45" r="3" fill="currentColor" />
          <circle cx="55" cy="55" r="3" fill="currentColor" />
          <circle cx="75" cy="35" r="3" fill="currentColor" />
          <circle cx="80" cy="40" r="3" fill="currentColor" />
          <circle cx="70" cy="50" r="3" fill="currentColor" />
          <circle cx="95" cy="30" r="3" fill="currentColor" />
          <circle cx="90" cy="38" r="3" fill="currentColor" />
        </svg>

        {/* CENTER UI Sketch 3: Tab navigation - center left area */}
        <svg
          className="absolute left-[15%] top-[48%] w-30 h-12 opacity-30 hidden md:block"
          viewBox="0 0 140 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="8" y="8" width="38" height="28" rx="4" opacity="0.6" />
          <rect x="50" y="8" width="38" height="28" rx="4" />
          <rect x="92" y="8" width="38" height="28" rx="4" opacity="0.6" />
          <line x1="8" y1="45" x2="130" y2="45" strokeWidth="2.5" />
        </svg>

        {/* CENTER Math Graph 3: Tangent curve - center bottom right */}
        <svg
          className="absolute left-[50%] bottom-[15%] w-26 h-26 opacity-28 hidden md:block"
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="15" y1="60" x2="105" y2="60" strokeWidth="1.5" />
          <line x1="60" y1="15" x2="60" y2="105" strokeWidth="1.5" opacity="0.4" />
          <path d="M30 95 Q40 80, 48 65 Q56 45, 58 20" strokeWidth="2.5" />
          <path x1="62" y1="100" x2="72" y2="55" strokeWidth="2.5" />
        </svg>

        {/* CENTER UI Sketch 4: Progress bar - center middle left */}
        <svg
          className="absolute left-[22%] top-[56%] w-28 h-10 opacity-32 hidden md:block"
          viewBox="0 0 140 50"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="8" y="15" width="124" height="20" rx="10" />
          <rect x="11" y="18" width="80" height="14" rx="7" opacity="0.7" />
          <circle cx="88" cy="25" r="4" fill="currentColor" />
        </svg>

        {/* CENTER UI Sketch 5: Notification badge - center top right */}
        <svg
          className="absolute left-[72%] top-[32%] w-20 h-20 opacity-30 hidden md:block"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M50 20 C50 20, 35 25, 35 45 C35 60, 35 65, 30 70 L70 70 C65 65, 65 60, 65 45 C65 25, 50 20, 50 20" />
          <path d="M42 70 C42 75, 45 80, 50 80 C55 80, 58 75, 58 70" />
          <circle cx="65" cy="30" r="8" opacity="0.7" />
          <circle cx="65" cy="30" r="5" fill="currentColor" />
        </svg>

        {/* CENTER Math Graph 4: Circle with geometric shapes - center bottom left */}
        <svg
          className="absolute left-[28%] bottom-[12%] w-24 h-24 opacity-32 hidden md:block"
          viewBox="0 0 110 110"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="55" cy="55" r="40" />
          <polygon points="55,25 75,65 35,65" opacity="0.6" />
          <rect x="43" y="43" width="24" height="24" opacity="0.5" />
          <line x1="55" y1="15" x2="55" y2="95" strokeWidth="1" opacity="0.4" />
          <line x1="15" y1="55" x2="95" y2="55" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-16">
          <span id="projects" className="hero-jelly inline-block rounded-full border-2 px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all hover:scale-105 hover:bg-black hover:text-white">
            Projects
          </span>
          <h1 className="hero-jelly mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-tight">
            Crafting Digital Experiences
          </h1>
          <p className="hero-jelly mt-6 max-w-2xl text-sm md:text-base lg:text-xl ">
            A journey through code, creativity, and endless possibilities.
          </p>
        </div>

        <div className="space-y-0">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={(el) => {
                sectionsRef.current[index] = el
              }}
              className="section-item"
            >
              <Card
                className="group p-4 md:p-8 transition-all duration-300 cursor-pointer shadow-none rounded-none border-0 border-b border-stone-500 dark:border-teal-700/80 bg-transparent"
                onClick={() => toggleSection(index)}
              >
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center gap-8">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(section.url, "_blank")
                      }}
                      aria-label={`Open ${section.subtitle} externally`}
                      className="section-icon hidden md:inline-flex items-center justify-center p-2 rounded-md bg-transparent hover:bg-muted transition"
                    >
                      {getSectionIcon(section.url, "h-6 w-6 md:h-9 md:w-9 xl:h-12 xl:w-12")}
                    </button>
                    <div>
                      <h3 className="hero-jelly text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                        <span className="section-title">{section.title}</span>
                      </h3>
                      <h2 className="hero-jelly section-subtitle text-xl sm:text-2xl font-black uppercase transition-all duration-300 md:text-3xl">
                        {section.subtitle}
                      </h2>
                      <p className="hero-jelly mt-2 text-sm text-muted-foreground max-w-xl">{section.description}</p>
                    </div>
                  </div>
                 <div className="flex items-center justify-center border md:border-none border-stone-500 dark:border-teal-500/50 rounded-md mt-4 md:mt-0 w-full md:w-auto hover:bg-muted transition">
                   <Button
                      variant="default"
                      size="lg"
                      className="hidden md:inline-flex bg-transparent transition-transform duration-300 "
                      aria-hidden
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSection(index)
                      }}
                    >
                    {expandedSection === index ? (
                      <ChevronUp className="h-5 w-5 transform transition-transform duration-300 text-stone-600 dark:text-teal-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 transform transition-transform duration-300 text-stone-600 dark:text-teal-500" />
                    )}
                  </Button>
                 </div>
                </div>
              </Card>

              <div
                className={`section-content overflow-hidden ${expandedSection === index ? 'border-b border-stone-500 dark:border-teal-700/80' : ''}`}
                style={{ height: expandedSection === index ? undefined : '0px', opacity: expandedSection === index ? 1 : 0 }}
              >
                <div className="mt-6 relative">
                  <div className="flex gap-2 mb-4 justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        scroll("left", index)
                      }}
                      className="rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        scroll("right", index)
                      }}
                      className="rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div
                    ref={(el) => {
                      cardsContainerRef.current[index] = el
                    }}
                    className="relative"
                  >
                    <div className="cards-wrapper overflow-x-auto pb-4 scroll-smooth">
                      <div className="flex gap-4">
                        {index === 0 &&
                          githubSeed.map((repo) => (
                            <Card
                              key={repo.id}
                              className="project-card flex-shrink-0 w-64 sm:w-72 md:w-80 p-4 sm:p-6 hover:shadow-md transition-shadow flex flex-col border border-stone-600/80 dark:border-teal-700/80"
                            >
                              <div>
                                <h3 className="font-semibold text-lg mb-2 truncate">{repo.name}</h3>
                                <p className="text-sm text mb-3 line-clamp-2">
                                  {repo.description || "No description available"}
                                </p>

                                {Array.isArray(repo.topics) && repo.topics.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {repo.topics.slice(0, 4).map((t) => (
                                      <span key={t} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary inline-flex items-center gap-1">
                                        <Tag className="h-3 w-3" /> {t}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="mt-auto">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm inline-flex items-center gap-2">
                                    <Tag className="h-4 w-4" /> {repo.language || "N/A"}
                                  </span>
                                  <span className="text-sm inline-flex items-center gap-2">
                                    <Star className="h-4 w-4" /> {repo.stargazers_count}
                                  </span>
                                </div>

                                <div className="text-xs text-muted-foreground flex items-center gap-2 mb-3">
                                  <Calendar className="h-4 w-4" /> {repo.created_at ? new Date(repo.created_at).toLocaleDateString() : ""}
                                </div>

                                <Button
                                  variant="outline"
                                  className="w-full bg-transparent"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    window.open(repo.html_url, "_blank")
                                  }}
                                >
                                  View on GitHub
                                </Button>
                              </div>
                            </Card>
                          ))}

                        {index === 1 &&
                          Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} className="project-card flex-shrink-0 w-64 sm:w-72 md:w-80 p-4 sm:p-6 border border-stone-600/80 dark:border-teal-700/80">
                              <div className="aspect-video bg-muted rounded-md mb-4" />
                              <h3 className="font-semibold text-lg mb-2">CodePen Project {i + 1}</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Interactive CSS and JavaScript experiment
                              </p>
                              <Button variant="outline"  className="w-full bg-transparent">
                                View on CodePen
                              </Button>
                            </Card>
                          ))}

                        {index === 2 &&
                          Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} className="project-card flex-shrink-0 w-64 sm:w-72 md:w-80 p-4 sm:p-6 border border-stone-600/80 dark:border-teal-700/80">
                              <div className="aspect-square bg-muted rounded-md mb-4" />
                              <h3 className="font-semibold text-lg mb-2">UI Component {i + 1}</h3>
                              <p className="text-sm text-muted-foreground mb-4">Beautifully crafted UI element</p>
                              <Button variant="outline" className="w-full bg-transparent">
                                View on Uiverse
                              </Button>
                            </Card>
                          ))}

                        {index === 3 &&
                          devtoArticles.map((article) => (
                            <Card
                              key={article.id}
                              className="project-card flex-shrink-0 w-64 sm:w-72 md:w-80 p-4 sm:p-6 hover:shadow-md transition-shadow border border-stone-600/80 dark:border-teal-700/80"
                            >
                              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
                              {(() => {
                                const tags = Array.isArray(article.tags)
                                  ? article.tags
                                  : (typeof article.tags === "string"
                                    ? (article.tags as string).split(",").map((t: string) => t.trim()).filter(Boolean)
                                    : [])

                                if (tags.length === 0) return null

                                return (
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {tags.slice(0, 3).map((tag:any) => (
                                      <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                        #{tag}
                                      </span>
                                    ))}
                                  </div>
                                )
                              })()}
                              <Button
                                variant="outline"
                           
                                className="w-full bg-transparent"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  window.open(article.url, "_blank")
                                }}
                              >
                                Read Article
                              </Button>
                            </Card>
                          ))}

                        {loading && (
                          <div className="flex-shrink-0 w-64 sm:w-72 md:w-80 p-6 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="border-t border-stone-500 dark:border-teal-700/80" />
        </div>
      </div>
    </div>
  )
}
