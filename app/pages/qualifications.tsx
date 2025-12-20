"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  Sector,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

interface MarkerData {
  id: number
  heading: string
  subheading: string
  description: string
  skills: Array<{ name: string; icon: any }>
  chartType: "line" | "bar" | "area" | "radar" | "pie"
  chartData: any[]
  position: { left?: string; right?: string; top: string }
}

import {
  Code,
  Palette,
  Database,
  Zap,
  Globe,
  Smartphone,
  Cloud,
  Lock,
  Layers,
  GitBranch,
  Terminal,
  Box,
} from "lucide-react"

import { observeJellyText } from "@/lib/observejellyText"

const MARKER_DATA: MarkerData[] = [
  {
    id: 1,
    heading: "Frontend Development",
    subheading: "Building Interactive UIs",
    description:
      "Expertise in creating responsive and dynamic user interfaces with modern frameworks and libraries. Focus on performance optimization and user experience.",
    skills: [
      { name: "React", icon: Code },
      { name: "TypeScript", icon: Terminal },
      { name: "CSS/Tailwind", icon: Palette },
      { name: "Next.js", icon: Globe },
    ],
    chartType: "area",
    chartData: [
      { name: "2020", value: 65 },
      { name: "2021", value: 75 },
      { name: "2022", value: 85 },
      { name: "2023", value: 92 },
      { name: "2024", value: 95 },
    ],
    position: { left: "10%", top: "25%" },
  },
  {
    id: 2,
    heading: "Backend Systems",
    subheading: "Scalable Server Architecture",
    description:
      "Designing and implementing robust backend systems with focus on scalability, security, and performance. Experience with microservices and cloud infrastructure.",
    skills: [
      { name: "Node.js", icon: Box },
      { name: "APIs", icon: Terminal },
      { name:"Supabase", icon: Database},
      {name:"Firebase", icon: Database}
    ],
    chartType: "bar",
    chartData: [
      { name: "API", value: 90 },
      { name: "DB", value: 85 },
      { name: "Auth", value: 88 },
      { name: "Cache", value: 82 },
    ],
    position: { right: "10%", top: "45%" },
  },
  {
    id: 3,
    heading: "Mobile Development",
    subheading: "Cross-Platform Apps",
    description:
      "Creating seamless mobile experiences for iOS and Android. Specializing in Flutter and progressive web apps for optimal performance.",
    skills: [
      { name: "Flutter", icon: Smartphone },
      { name: "PWA", icon: Globe },
      { name: "Performance", icon: Zap },
      { name: "UI/UX", icon: Palette },
    ],
    chartType: "area",
    chartData: [
      { name: "Jan", value: 45 },
      { name: "Feb", value: 52 },
      { name: "Mar", value: 61 },
      { name: "Apr", value: 73 },
      { name: "May", value: 89 },
    ],
    position: { left: "20%", top: "65%" },
  },
  {
    id: 4,
    heading: "DevOps & CI/CD",
    subheading: "Automation & Deployment",
    description:
      "Streamlining development workflows with automated testing, continuous integration, and deployment pipelines. Infrastructure as code expertise.",
    skills: [
      { name: "Git", icon: GitBranch },
      { name: "CI/CD", icon: Zap },
      { name: "Docker", icon: Box },
      { name: "Cloud", icon: Cloud },
    ],
    chartType: "radar",
    chartData: [
      { subject: "Speed", value: 90 },
      { subject: "Reliability", value: 85 },
      { subject: "Security", value: 88 },
      { subject: "Automation", value: 92 },
      { subject: "Monitoring", value: 80 },
    ],
    position: { left: "60%", top: "80%" },
  },
  {
    id: 5,
    heading: "UI/UX Design",
    subheading: "User-Centered Design",
    description:
      "Crafting beautiful and intuitive interfaces with focus on accessibility and user research. Bridging the gap between design and development.",
    skills: [
      { name: "Design", icon: Palette },
      { name: "Prototyping", icon: Layers },
      { name: "Accessibility", icon: Globe },
      { name: "Research", icon: Database },
    ],
    chartType: "pie",
    chartData: [
      { name: "Research", value: 25 },
      { name: "Design", value: 35 },
      { name: "Testing", value: 20 },
      { name: "Iteration", value: 20 },
    ],
    position: { left: "15%", top: "95%" },
  },
]

const COLORS = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
]

export default function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const doodlesRef = useRef<HTMLDivElement>(null)
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)
  const [passedMarkers, setPassedMarkers] = useState<Set<number>>(new Set())
  const [activeMarker, setActiveMarker] = useState<number | null>(null)
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false)
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null) 

  // Doodles: randomized positions, non-overlapping
  type DoodleSpec = {
    id: number
    left: string
    top: string
    width: number
    height: number
    variant: number
    className: string
    rotate: number
    opacity?: number
    // accent (small colored dot) rendered inside doodle
    accentColor?: string
    accentX?: number // 0..1
    accentY?: number // 0..1
    accentSize?: number // px
  }

  const DOODLE_COUNT = 28
  const DOODLE_MIN_SIZE = 64
  const DOODLE_MAX_SIZE = 148
  const [doodles, setDoodles] = useState<DoodleSpec[]>([])

  useEffect(() => {
    // Ensure hero-jelly elements inside this page get observed (fixes HMR/late-insert cases)
    observeJellyText()

    let ctx: gsap.Context | null = null

    const createTimeline = () => {
      ctx?.revert()

      ctx = gsap.context(() => {
        const box = document.querySelector(".animated-box") as HTMLElement
        const initial = document.querySelector(".initial-container") as HTMLElement
        const final = document.querySelector(".final-spacer") as HTMLElement
        const svgPath = document.querySelector("#progress-path") as SVGPathElement

        if (!box || !initial || !final || !svgPath || !containerRef.current) return

        const containerRect = containerRef.current.getBoundingClientRect()

        const boxRect = box.getBoundingClientRect()
        const startX = boxRect.left + boxRect.width / 2 - containerRect.left
        const startY = boxRect.top + boxRect.height / 2 - containerRect.top

        const markers = document.querySelectorAll(".marker")

        const points = Array.from(markers).map((marker) => {
          const r = marker.getBoundingClientRect()
          return {
            x: r.left + r.width / 2 - containerRect.left,
            y: r.top + r.height / 2 - containerRect.top,
          }
        })

        const p0 = { x: startX, y: startY }
        const pts = points

        let d = `M ${p0.x} ${p0.y}`

        if (pts.length > 0) {
          const p1 = pts[0]

          const dx = p1.x - p0.x
          const dy = p1.y - p0.y

          const LOOP_WIDTH = Math.abs(dx) * 0.6
          const LOOP_HEIGHT = Math.abs(dy) * 0.4

          d += `
    C
      ${p0.x - LOOP_WIDTH} ${p0.y + LOOP_HEIGHT * 0.3},
      ${p1.x + LOOP_WIDTH} ${p1.y - LOOP_HEIGHT * 0.3},
      ${p1.x} ${p1.y}
  `
        }

        for (let i = 1; i < pts.length; i++) {
          const prev = pts[i - 1]
          const curr = pts[i]

          const dx = curr.x - prev.x
          const dy = curr.y - prev.y

          const CURVE_WIDTH = Math.abs(dx) * 0.5
          const CURVE_HEIGHT = Math.abs(dy) * 0.5

          d += `
    C
      ${prev.x - CURVE_WIDTH} ${prev.y + CURVE_HEIGHT * 0.4},
      ${curr.x + CURVE_WIDTH} ${curr.y - CURVE_HEIGHT * 0.4},
      ${curr.x} ${curr.y}
  `
        }

        svgPath.setAttribute("d", d)

        const length = svgPath.getTotalLength()
        svgPath.style.strokeDasharray = `${length}`
        svgPath.style.strokeDashoffset = `${length}`

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: initial,
            start: "top center",
            endTrigger: final,
            end: "top center",
            scrub: 1.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress
              const boxRect = box.getBoundingClientRect()
              const boxCenterX = boxRect.left + boxRect.width / 2
              const boxCenterY = boxRect.top + boxRect.height / 2

              const THRESHOLD = 100
              const newPassedMarkers = new Set<number>()
              let closestMarker: number | null = null
              let closestDistance = Infinity

              markers.forEach((marker, index) => {
                const markerRect = marker.getBoundingClientRect()
                const markerCenterX = markerRect.left + markerRect.width / 2
                const markerCenterY = markerRect.top + markerRect.height / 2

                const distance = Math.sqrt(
                  Math.pow(boxCenterX - markerCenterX, 2) + Math.pow(boxCenterY - markerCenterY, 2),
                )

                if (distance < THRESHOLD) {
                  newPassedMarkers.add(MARKER_DATA[index].id)
                  if (distance < closestDistance) {
                    closestDistance = distance
                    closestMarker = MARKER_DATA[index].id
                  }
                }
              })

              // If scroll progress is essentially at the end, ensure the last marker is marked as passed
              if (progress >= 0.995 && MARKER_DATA.length > 0) {
                const lastId = MARKER_DATA[MARKER_DATA.length - 1].id
                newPassedMarkers.add(lastId)
                closestMarker = closestMarker ?? lastId
              }

              setActiveMarker(closestMarker)

              setPassedMarkers((prev) => {
                const combined = new Set([...prev, ...newPassedMarkers])
                if (combined.size !== prev.size) {
                  return combined
                }
                return prev
              })
            },
          },
        })

        // Qualification doodles animation (draw + subtle float/wobble)
        gsap.from(".qual-doodle-path", {
          strokeDashoffset: 1000,
          duration: 1.5,
          ease: "power2.inOut",
          stagger: 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })

        gsap.to(".qual-doodle-float", {
          y: "random(-12, 12)",
          x: "random(-6, 6)",
          rotation: "random(-6, 6)",
          duration: "random(2.5, 4)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: 1.2,
            from: "random",
          },
        })

        gsap.to(".qual-doodle-wobble", {
          rotation: "random(-10, 10)",
          scale: "random(0.97, 1.03)",
          duration: "random(3, 4.5)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: 2,
            from: "random",
          },
        })

        tl.to(
          box,
          {
            ease: "none",
            motionPath: {
              path: svgPath,
              align: svgPath,
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
            },
          },
          0,
        )

        tl.to(
          svgPath,
          {
            strokeDashoffset: 0,
            ease: "none",
          },
          0,
        )
      }, containerRef)
    }

    const t = setTimeout(createTimeline, 200)

    const onResize = () => {
      clearTimeout(t)
      setTimeout(createTimeline, 200)
    }

    window.addEventListener("resize", onResize)

    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", onResize)
      ScrollTrigger.getAll().forEach((t) => t.kill())
      ctx?.revert()
    }
  }, [])

  useEffect(() => {
    const onResizeCheck = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }
    onResizeCheck()
    window.addEventListener("resize", onResizeCheck)
    return () => window.removeEventListener("resize", onResizeCheck)
  }, [])

  // Generate randomized, non-overlapping doodle positions
  useEffect(() => {
    if (!containerRef.current) return

    const variantsCount = 20

    const container = containerRef.current

    const generate = () => {
      const rect = container.getBoundingClientRect()
      const W = rect.width
      const H = rect.height

      const boxes: Array<{ x: number; y: number; w: number; h: number }> = []
      const out: DoodleSpec[] = []

      const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

      // helper shuffle + pool for unique variants
      const shuffle = (arr: number[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
      }

      let variantPool = shuffle(Array.from({ length: variantsCount }, (_, k) => k))

      for (let i = 0; i < DOODLE_COUNT; i++) {
        let tries = 0
        let placed = false
        while (!placed && tries < 120) {
          tries++
          const w = rand(DOODLE_MIN_SIZE, DOODLE_MAX_SIZE)
          const h = Math.floor(w * (0.6 + Math.random() * 0.6))

          const x = Math.floor(Math.random() * Math.max(1, W - w))
          const y = Math.floor(Math.random() * Math.max(1, H - h))

          // simple padding margin so doodles rarely show too close to edges
          if (x < 8 || y < 8 || x + w > W - 8 || y + h > H - 8) continue

          const PADDING = 12

          const collision = boxes.some((b) => {
            return !(x + w + PADDING < b.x || x > b.x + b.w + PADDING || y + h + PADDING < b.y || y > b.y + b.h + PADDING)
          })

          if (!collision) {
            boxes.push({ x, y, w, h })
            const left = `${Math.round((x / W) * 10000) / 100}%`
            const top = `${Math.round((y / H) * 10000) / 100}%`

            // pick a unique variant from the pool (refill/shuffle when empty)
            if (variantPool.length === 0) variantPool = shuffle(Array.from({ length: variantsCount }, (_, k) => k))
            const variant = variantPool.pop() as number

            const className = i % 3 === 0 ? "qual-doodle-wobble" : "qual-doodle-float"
            const rotate = Math.round((Math.random() - 0.5) * 20)
            const opacity = +(0.18 + Math.random() * 0.18).toFixed(3)

            // small accent dot for uniqueness and subtle emphasis
            const accentColor = COLORS[Math.floor(Math.random() * COLORS.length)]
            const accentX = +(0.12 + Math.random() * 0.76).toFixed(3)
            const accentY = +(0.12 + Math.random() * 0.76).toFixed(3)
            const accentSize = Math.floor(6 + Math.random() * 10)

            out.push({ id: i, left, top, width: w, height: h, variant, className, rotate, opacity, accentColor, accentX, accentY, accentSize })
            placed = true
          }
        }
      }

      setDoodles(out)
    }

    // slight delay to allow layout to settle
    const t = setTimeout(generate, 120)
    window.addEventListener("resize", generate)

    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", generate)
    }
  }, [containerRef.current])

  // subtle animated accent pulse for added polish
  useEffect(() => {
    if (!doodles || doodles.length === 0) return
    const tl = gsap.timeline()
    tl.to(".qual-doodle-accent", {
      scale: "random(0.82, 1.18)",
      duration: "random(1.2, 2.3)",
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      transformOrigin: "50% 50%",
      stagger: {
        amount: 1.6,
        from: "random",
      },
    })

    return () => { tl.kill() }
  }, [doodles])

  // Renders many simple doodle variants (paths have class 'qual-doodle-path' for animation)
  const renderDoodleVariant = (variant: number, w: number, id: number) => {
    const strokeProps = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as any
    const small = w < 90

    switch (variant % 20) {
      case 0:
        return (
          <svg viewBox="0 0 140 50" width="100%" height="100%" {...strokeProps}>
            <rect className="qual-doodle-path" x="5" y="8" width="130" height="34" rx="6" />
            <rect className="qual-doodle-path" x="7" y="10" width="126" height="30" rx="5" opacity="0.5" />
            <line className="qual-doodle-path" x1="50" y1="25" x2="90" y2="25" strokeWidth="3" />
          </svg>
        )
      case 1:
        return (
          <svg viewBox="0 0 150 100" width="100%" height="100%" {...strokeProps}>
            <path className="qual-doodle-path" d="M10 50 Q25 20, 40 50 T70 50 T100 50 T130 50" />
            <line className="qual-doodle-path" x1="10" y1="50" x2="140" y2="50" strokeWidth="1" opacity="0.4" />
          </svg>
        )
      case 2:
        return (
          <svg viewBox="0 0 120 140" width="100%" height="100%" {...strokeProps}>
            <rect className="qual-doodle-path" x="8" y="8" width="104" height="124" rx="8" />
            <rect className="qual-doodle-path" x="18" y="18" width="84" height="40" rx="4" opacity="0.6" />
          </svg>
        )
      case 3:
        return (
          <svg viewBox="0 0 120 140" width="100%" height="100%" {...strokeProps}>
            <line className="qual-doodle-path" x1="15" y1="120" x2="105" y2="120" />
            <line className="qual-doodle-path" x1="15" y1="20" x2="15" y2="120" />
            <rect className="qual-doodle-path" x="25" y="70" width="15" height="50" />
            <rect className="qual-doodle-path" x="45" y="40" width="15" height="80" />
          </svg>
        )
      case 4:
        return (
          <svg viewBox="0 0 160 60" width="100%" height="100%" {...strokeProps}>
            <rect className="qual-doodle-path" x="8" y="12" width="144" height="36" rx="4" />
            <rect className="qual-doodle-path" x="10" y="14" width="140" height="32" rx="3" opacity="0.5" />
          </svg>
        )
      case 5:
        return (
          <svg viewBox="0 0 120 120" width="100%" height="100%" {...strokeProps}>
            <circle className="qual-doodle-path" cx="60" cy="60" r="45" />
            <path className="qual-doodle-path" d="M60 60 L60 15 A45 45 0 0 1 95 40 Z" opacity="0.6" />
          </svg>
        )
      case 6:
        return (
          <svg viewBox="0 0 80 50" width="100%" height="100%" {...strokeProps}>
            <rect className="qual-doodle-path" x="8" y="12" width="64" height="26" rx="13" />
            <circle className="qual-doodle-path" cx="56" cy="25" r="10" />
          </svg>
        )
      case 7:
        return (
          <svg viewBox="0 0 140 140" width="100%" height="100%" {...strokeProps}>
            <line className="qual-doodle-path" x1="20" y1="70" x2="120" y2="70" strokeWidth="1.5" />
            <path className="qual-doodle-path" d="M30 115 Q45 90, 55 70 Q65 50, 70 30 Q75 50, 85 70 Q95 90, 110 115" strokeWidth="2.5" />
          </svg>
        )
      case 8:
        return (
          <svg viewBox="0 0 100 120" width="100%" height="100%" {...strokeProps}>
            <rect className="qual-doodle-path" x="10" y="10" width="12" height="12" rx="2" />
            <line className="qual-doodle-path" x1="30" y1="16" x2="80" y2="16" strokeWidth="2" />
          </svg>
        )
      case 9:
        return (
          <svg viewBox="0 0 140 100" width="100%" height="100%" {...strokeProps}>
            <line className="qual-doodle-path" x1="15" y1="85" x2="125" y2="85" strokeWidth="1.5" />
            <path className="qual-doodle-path" d="M20 70 L40 50 L60 45 L80 30 L100 35 L120 25" strokeWidth="2.5" />
          </svg>
        )
      case 10:
        return (
          <svg viewBox="0 0 140 50" width="100%" height="100%" {...strokeProps}>
            <line className="qual-doodle-path" x1="20" y1="25" x2="120" y2="25" strokeWidth="3" />
            <circle className="qual-doodle-path" cx="75" cy="25" r="10" />
          </svg>
        )
      case 11:
        return (
          <svg viewBox="0 0 120 140" width="100%" height="100%" {...strokeProps}>
            <rect className="qual-doodle-path" x="10" y="10" width="100" height="30" rx="4" />
            <rect className="qual-doodle-path" x="10" y="48" width="100" height="82" rx="4" opacity="0.7" />
          </svg>
        )
      case 12:
        return (
          <svg viewBox="0 0 120 100" width="100%" height="100%" {...strokeProps}>
            <line className="qual-doodle-path" x1="15" y1="80" x2="125" y2="80" strokeWidth="1.5" />
            <path className="qual-doodle-path" d="M20 78 Q35 70, 45 55 Q55 35, 70 20 Q85 35, 95 55 Q105 70, 120 78" strokeWidth="2.5" />
          </svg>
        )
      case 13:
        return (
          <svg viewBox="0 0 160 60" width="100%" height="100%" {...strokeProps}>
            <rect className="qual-doodle-path" x="8" y="15" width="120" height="30" rx="15" />
            <circle className="qual-doodle-path" cx="138" cy="30" r="8" />
          </svg>
        )
      case 14:
        return (
          <svg viewBox="0 0 110 110" width="100%" height="100%" {...strokeProps}>
            <circle className="qual-doodle-path" cx="55" cy="55" r="40" />
            <polygon className="qual-doodle-path" points="55,25 75,65 35,65" opacity="0.6" />
          </svg>
        )
      case 15:
        return (
          <svg viewBox="0 0 120 100" width="100%" height="100%" {...strokeProps}>
            <path className="qual-doodle-path" d="M15 75 L35 75 L35 55 L55 55 L55 40 L75 40 L75 25 L95 25" />
          </svg>
        )
      case 16:
        return (
          <svg viewBox="0 0 140 100" width="100%" height="100%" {...strokeProps}>
            <path className="qual-doodle-path" d="M20 95 Q30 85, 40 70 Q50 50, 60 35 Q70 20, 85 12 Q95 8, 105 7" strokeWidth="2.5" />
          </svg>
        )
      case 17:
        return (
          <svg viewBox="0 0 120 120" width="100%" height="100%" {...strokeProps}>
            <line className="qual-doodle-path" x1="15" y1="100" x2="110" y2="100" strokeWidth="1.5" />
            <path className="qual-doodle-path" d="M20 95 Q30 85, 40 70 Q50 50, 60 35 Q70 20, 85 12" strokeWidth="2.5" />
          </svg>
        )
      case 18:
        return (
          <svg viewBox="0 0 140 120" width="100%" height="100%" {...strokeProps}>
            <rect className="qual-doodle-path" x="8" y="15" width="124" height="20" rx="10" />
            <rect className="qual-doodle-path" x="11" y="18" width="80" height="14" rx="7" opacity="0.7" />
          </svg>
        )
      case 19:
      default:
        return (
          <svg viewBox="0 0 120 100" width="100%" height="100%" {...strokeProps}>
            <line className="qual-doodle-path" x1="15" y1="95" x2="115" y2="95" strokeWidth="1.5" />
            <circle className="qual-doodle-path" cx="30" cy="75" r="3" fill="currentColor" />
            <circle className="qual-doodle-path" cx="60" cy="45" r="3" fill="currentColor" />
          </svg>
        )
    }
  }

  // Re-observe hero-jelly elements when new content is inserted (e.g., passed markers)
  useEffect(() => {
    observeJellyText()
  }, [passedMarkers])

  const CustomDot = (props: any) => {
    const { cx, cy } = props
    if (cx === undefined || cy === undefined) return null
    const rx = isLargeScreen ? 4 : 3
    const ry = isLargeScreen ? 3 : 2
    return (
      <g>
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="var(--color-chart-1)" />
        <ellipse cx={cx} cy={cy} rx={rx + 1} ry={ry + 1} fill="none" stroke="var(--border)" opacity={0.12} />
      </g>
    )
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + (isLargeScreen ? 10 : 6)}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  const renderChart = (marker: MarkerData) => {
    // unified tooltip style so it follows theme variables
    const tooltipProps: any = {
      contentStyle: {
        background: 'var(--color-popover)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-popover-foreground)',
      },
      itemStyle: { color: 'var(--color-foreground)' },
    }

    switch (marker.chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marker.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.12} />
              <XAxis dataKey="name" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} axisLine={{ stroke: 'var(--color-border)' }} />
              <YAxis tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} axisLine={{ stroke: 'var(--color-border)' }} />
              <Tooltip {...tooltipProps} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-chart-1)"
                strokeWidth={isLargeScreen ? 3 : 2}
                dot={<CustomDot />}
                strokeLinecap="round"
                strokeDasharray={isLargeScreen ? undefined : '3 1'}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marker.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.08} />
              <XAxis dataKey="name" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} axisLine={{ stroke: 'var(--color-border)' }} />
              <YAxis tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} axisLine={{ stroke: 'var(--color-border)' }} />
              <Tooltip {...tooltipProps} />
              <Bar
                dataKey="value"
                fill="var(--color-chart-2)"
                radius={isLargeScreen ? [999, 999, 999, 999] : [10, 10, 6, 6]}
                barSize={isLargeScreen ? 22 : 16}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        )
      case "area":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marker.chartData}>
              <defs>
                <linearGradient id={`areaGrad-${marker.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-chart-3)" stopOpacity={isLargeScreen ? 0.16 : 0.12} />
                  <stop offset="95%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.08} />
              <XAxis dataKey="name" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} axisLine={{ stroke: 'var(--color-border)' }} />
              <YAxis tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} axisLine={{ stroke: 'var(--color-border)' }} />
              <Tooltip {...tooltipProps} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-chart-3)"
                strokeWidth={isLargeScreen ? 2.5 : 2}
                fill={`url(#areaGrad-${marker.id})`}
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      case "radar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={marker.chartData}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fill: 'var(--color-muted-foreground)', fontSize: 10 }} />
              <Radar
                name="Skills"
                dataKey="value"
                stroke="var(--color-chart-4)"
                strokeWidth={isLargeScreen ? 2.5 : 2}
                fill="var(--color-chart-4)"
                fillOpacity={isLargeScreen ? 0.22 : 0.14}
              />
              <Tooltip {...tooltipProps} />
            </RadarChart>
          </ResponsiveContainer>
        )
      case "pie": {
        const total = marker.chartData.reduce((s, d) => s + (d.value || 0), 0)
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={marker.chartData}
                cx="50%"
                cy="50%"
                innerRadius={isLargeScreen ? 40 : 28}
                outerRadius={isLargeScreen ? 78 : 58}
                paddingAngle={4}
                dataKey="value"
                {...({ activeIndex: hoveredSlice ?? -1, activeShape: renderActiveShape } as any)}
                labelLine={false}
                onMouseEnter={(_: any, index: number) => setHoveredSlice(index)}
                onMouseLeave={() => setHoveredSlice(null)}
              >
                {marker.chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="var(--color-card)"
                    strokeWidth={hoveredSlice === index ? 2 : 1}
                    opacity={0.98}
                    cursor="pointer"
                  />
                ))}
              </Pie> 

              <Tooltip {...tooltipProps} />
            </PieChart>
          </ResponsiveContainer>
        )
      }
      default:
        return null
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <svg className="pointer-events-none absolute inset-0 overflow-visible z-0">
        <path
          id="progress-path"
          fill="none"
          stroke="none"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {/* Decorative pixel bat (theme-aware) - moved inside the animated box so it travels on the path */}


<div className="relative z-20">
          {/* Left Quote */}
          <div className="quote-item absolute left-4 sm:left-8 md:left-16  top-0 md:-top-[80px] max-w-[200px] sm:max-w-[240px]">
            <p className="text-xs sm:text-sm md:text-base leading-relaxed hero-jelly hero-jelly-fast"> 
              In the vast universe of code, every developer carries their own arsenal...
            </p>
          </div>

          {/* Right Top Quote */}
          <div className="quote-item absolute right-4 sm:right-8 md:right-16 top-[180px] sm:top-[220px] md:top-[260px] max-w-[200px] sm:max-w-[280px]  hidden md:block ">
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-right hero-jelly">
               Tools sharpened through countless hours of debugging, skills honed in the fires of production deployments,
              and wisdom gained from a thousand Stack Overflow searches.
               
            </p>
          </div>

          {/* Center Bottom Quote */}
          <div className="quote-item absolute left-1/2 -translate-x-1/2 bottom-[-160px] sm:bottom-[-150px] max-w-[280px] sm:max-w-[340px]">
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-center hero-jelly hero-jelly-fast">
                           These are not just technologies... they are the building blocks of digital dreams, the instruments of
              creation, the weapons against impossible deadlines.
            </p>
          </div>
        </div>
      <div className="relative" style={{ height: "300vh" }}>
        <div ref={doodlesRef} className="absolute inset-0 pointer-events-none z-[5]" aria-hidden="true">
          {doodles.map((d) => (
            <div
              key={d.id}
              className={`absolute pointer-events-none ${d.className}`}
              style={{
                left: d.left,
                top: d.top,
                width: d.width,
                height: d.height,
                transform: `rotate(${d.rotate}deg)`,
                opacity: d.opacity,
              }}
            >
              {renderDoodleVariant(d.variant, d.width, d.id)}

              {/* subtle accent (colored dot) — positioned inside the doodle */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: `${(d.accentX ?? 0.5) * 100}%`,
                  top: `${(d.accentY ?? 0.5) * 100}%`,
                  width: d.accentSize ?? 8,
                  height: d.accentSize ?? 8,
                  transform: 'translate(-50%, -50%)',
                }}
                aria-hidden="true"
              >
                <svg viewBox="0 0 12 12" width="100%" height="100%" className="qual-doodle-accent-svg">
                  <circle className="qual-doodle-accent" cx="6" cy="6" r="5" fill={d.accentColor ?? COLORS[0]} />
                </svg>
              </div>
            </div>
          ))}
        </div>
          <div
            className="initial-container absolute flex items-center justify-center"
            style={{ width: 88, height: 72, left: "60%", top: "5%", borderRadius: "45% 55% 60% 40% / 45% 55% 40% 60%" }}
          >
            <div
              className="animated-box bg-accent-foreground relative"
              style={{ width: 44, height: 34, borderRadius: "45% 55% 50% 50% / 50% 45% 55% 50%" }}
            >
              {/* place the pixel-bat inside the moving box so it is shown instead of the plain oval */}
              <div className="bat" aria-hidden="true" />
            </div>
          </div>

        {MARKER_DATA.map((marker) => (
          <Marker
            key={marker.id}
            data={marker}
            onClick={() => setSelectedMarker(marker)}
            isPassed={passedMarkers.has(marker.id)}
            isActive={activeMarker === marker.id}
            {...marker.position}
          />
        ))}

        {MARKER_DATA.map((marker) => {
          if (!passedMarkers.has(marker.id)) return null

          const markerIndex = MARKER_DATA.findIndex((m) => m.id === marker.id)
          const markerPos = marker.position
          const isLeft = markerPos.left !== undefined

          // Responsive positioning based on screen size and marker index
          const getResponsivePositions = () => {
            const isMobile = window.innerWidth < 640
            const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024
            
            // Base spacing that increases with each marker
            const baseTop = 10 + (markerIndex * 20)
            
            const positions = [
              // Marker 1 - Frontend
              {
                title: { top: `${baseTop}%`, left: isMobile ? "5%" : "5%", right: "auto" },
                desc: { top: isMobile? `${baseTop + 5}%` : `${baseTop + 10}%`, left: "auto", right: isMobile ? "5%" : "8%" },
                chart: { top: `${baseTop + 15}%`, left: "auto", right: isMobile ? "5%" : isTablet ? "10%" : "34%" },
                skills: { top: `${baseTop + 8}%`, left: isMobile ? "5%" : isTablet ? "40%" : "45%" },
              },
              // Marker 2 - Backend
              {
                title: { top: `${baseTop +6}%`, left: "auto", right: isMobile ? "5%" : "5%" },
                desc: { top: isMobile ? `${baseTop + 3}%` : `${baseTop + 12}%`, left: isMobile ? "5%" : "8%", right: "auto" },
                chart: { top: `${baseTop + 12}%`, left: isMobile ? "5%" : isTablet ? "8%" : "35%", right: "auto" },
                skills: { top: `${baseTop + 20}%`, left: isMobile ? "5%" : "10%", right: "auto" },
              },
              // Marker 3 - Mobile
              {
                title: { top: isMobile ? `${baseTop+2}%` : `${baseTop+7}%`, left: isMobile ? "62%" : "5%", right: "auto" },
                desc: { top: `${baseTop + 10}%`, left: "auto", right: isMobile ? "5%" : "5%" },
                chart: { top: isMobile ? `${baseTop+10}%` : `${baseTop + 12}%`, left: isMobile ? "-4%" : isTablet ? "45%" : "40%", right: "auto" },
                skills: { top: isMobile ? `${baseTop + 18}%` : `${baseTop + 22}%`, left: "auto", right: isMobile ? "0%" : "5%" },
              },
              // Marker 4 - DevOps
              {
                title: { top: isMobile ? `${baseTop +2}%` : `${baseTop +4}%`, left: isMobile ? "5%" : "5%", right: "auto" },
                desc: { top:  isMobile ? `${baseTop +6}%` : `${baseTop +11}%`, left: isMobile ? "5%" : "5%", right: "auto" },
                chart: { top:  isMobile ? `${baseTop +13}%` : `${baseTop +8}%`, left: "auto", right: isMobile ? "5%" : isTablet ? "12%" : "48%" },
                skills: { top:  isMobile ? `${baseTop + 18}%` : `${baseTop + 20}%`, left: "auto", right: isMobile ? "50%" : "78%" },
              },
              // Marker 5 - UI/UX
              {
                title: { top: isMobile ? `${baseTop+3}%` : `${baseTop}%`, left: "auto", right: isMobile ? "10%" : "10%" },
                desc: { top: isMobile? `${baseTop+12}%`: `${baseTop+8}%`, left: isMobile ? "5%" : "35%", right: "auto" },
                chart: { top: `${baseTop + 8}%`, left: isMobile ? "50%" : isTablet ? "30%" : "65%", right: "auto" },
                skills: { top: `${baseTop + 15}%`, left: isMobile ? "65%" : "8%", right: "auto" },
              },
            ]

            return positions[markerIndex % positions.length]
          }

          const positions = getResponsivePositions()

          return (
            <div key={marker.id} className="absolute inset-0 pointer-events-none" style={{ top: 0 }}>
              <div
                className="absolute pointer-events-auto animate-in fade-in zoom-in-95 duration-500"
                style={{
                  ...positions.title,
                  maxWidth: "min(240px, 40vw)",
                  zIndex: 10,
                }}
              >
                <h2 className="hero-jelly text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-foreground mb-1 leading-tight">
                  {marker.heading}
                </h2>
                <p className="hero-jelly text-xs sm:text-sm text-primary font-medium">{marker.subheading}</p>
              </div>

              <div
                className="absolute pointer-events-auto animate-in fade-in slide-in-from-bottom-3 duration-700 delay-100"
                style={{
                  ...positions.desc,
                  maxWidth: "min(240px, 40vw)",
                  zIndex: 10,
                }}
              >
                <p className="hero-jelly hero-jelly-fast text-xs sm:text-sm md:text-base leading-relaxed">{marker.description}</p>
              </div>

              <div
                className="absolute pointer-events-auto animate-in fade-in zoom-in-90 duration-700 delay-200"
                style={{
                  ...positions.chart,
                  zIndex: 10,
                }}
              >
                <div className="w-[min(240px,45vw)] h-[min(160px,20vh)] md:w-[360px] md:h-[240px] lg:w-[440px] lg:h-[300px] transition-all">
                  <div className="w-full h-full rounded-lg p-2 transition-all">
                    {renderChart(marker)}
                  </div>
                </div>
              </div>

              <div
                className="absolute pointer-events-auto animate-in fade-in slide-in-from-left-3 duration-700 delay-300"
                style={{
                  ...positions.skills,
                  maxWidth: "min(220px, 40vw)",
                  zIndex: 10,
                }}
              >
                <h3 className="hero-jelly text-sm sm:text-base font-semibold text-foreground mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {marker.skills.map((skill, idx) => {
                    const Icon = skill.icon
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-1.5 text-xs sm:text-sm text-foreground/90 transition-colors hover:text-primary bg-background/60 backdrop-blur-sm px-2 py-1 rounded-md border border-border/30"
                      >
                        <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="font-medium hero-jelly">{skill.name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="final-spacer h-[300px]" />
    </div>
  )
}

function Marker({ data, onClick, isPassed = false, isActive = false, ...props }: { data: MarkerData; onClick: () => void; isPassed?: boolean; isActive?: boolean } & any) {
  return (
    <div
      className={`absolute flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${isPassed ? 'passed' : ''}`}
      style={{ width: 92, height: 78, ...props, borderRadius: "45% 55% 60% 40% / 55% 45% 55% 45%" }}
      onClick={onClick}
      aria-label={data.heading}
    >
      <div
        className={`marker relative flex items-center justify-center p-0 ${isPassed ? 'passed' : ''}`}
        style={{ width: 64, height: 52, borderRadius: "45% 55% 50% 50% / 50% 45% 55% 50%" }}
      >
        <div
          className={`point transition-all duration-200 flex items-center justify-center ${
            isPassed
              ? "bg-primary border-transparent w-4 h-4"
              : "bg-transparent border-2 border-dashed border-border w-4 h-4"
          } ${isActive && !isPassed ? "scale-110" : ""}`}
          style={{ borderRadius: "50%" }}
        />
        {!isPassed && (
          <div className="food absolute -top-3">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" shapeRendering="crispEdges">
              {/* Pixel cherries (8x8 grid) */}
              {/* Left cherry */}
              <rect x="1" y="3" width="1" height="1" fill="#ef4444" />
              <rect x="2" y="3" width="1" height="1" fill="#ef4444" />
              <rect x="1" y="4" width="1" height="1" fill="#ef4444" />
              <rect x="2" y="4" width="1" height="1" fill="#ef4444" />
              <rect x="1" y="5" width="1" height="1" fill="#ef4444" />
              <rect x="2" y="5" width="1" height="1" fill="#ef4444" />
              {/* Right cherry */}
              <rect x="5" y="3" width="1" height="1" fill="#ef4444" />
              <rect x="6" y="3" width="1" height="1" fill="#ef4444" />
              <rect x="5" y="4" width="1" height="1" fill="#ef4444" />
              <rect x="6" y="4" width="1" height="1" fill="#ef4444" />
              <rect x="5" y="5" width="1" height="1" fill="#ef4444" />
              <rect x="6" y="5" width="1" height="1" fill="#ef4444" />
              {/* Stems */}
              <rect x="4" y="1" width="1" height="2" fill="#92400e" />
              <rect x="3" y="1" width="1" height="1" fill="#16a34a" />
              <rect x="5" y="1" width="1" height="1" fill="#16a34a" />
              {/* Highlights */}
              <rect x="2" y="3" width="1" height="1" fill="#ffffff" opacity="0.6" />
            </svg>
          </div>
        )}

        {/* small label for the marker - hide when marker is passed (panel displays heading) */}
        {!isPassed && (
          <div className="absolute top-[calc(100%+6px)] left-1/2 -translate-x-1/2 text-xs font-medium text-foreground/90 pointer-events-none">
            <span className="hero-jelly px-1 py-[2px] bg-background/60 rounded-md">{data.heading}</span>
          </div>
        )}
      </div>
    </div>
  )
}