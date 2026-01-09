"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Code,
  Terminal,
  Globe,
  Database,
  Server,
  Cpu,
  Smartphone,
  Laptop,
  Monitor,
  Wifi,
  Cloud,
  Lock,
  Zap,
  Book,
  GraduationCap,
  Bookmark,
  FileText,
  PenTool,
  Edit,
  Award,
  Trophy,
  Target,
  TrendingUp,
  BarChart,
  PieChart,
  Activity,
  Lightbulb,
  Rocket,
  Star,
  Heart,
  Coffee,
  Music,
  Camera,
} from "lucide-react"

type IconComp = React.ComponentType<any>

interface IconItem {
  id: string
  type: "icon"
  Icon: IconComp
  size: number
  x: number
  y: number
  rotation: number
}

interface DotItem {
  id: string
  type: "dot"
  size: number
  x: number
  y: number
  color: string
}

type Item = IconItem | DotItem

const ICONS: IconComp[] = [
  Github, Linkedin, Twitter, Instagram, Facebook, Youtube,
  Code, Terminal, Globe, Database, Server, Cpu,
  Smartphone, Laptop, Monitor, Wifi, Cloud, Lock, Zap,
  Book, GraduationCap, Bookmark, FileText, PenTool, Edit,
  Award, Trophy, Target, TrendingUp, BarChart, PieChart, Activity,
  Lightbulb, Rocket, Star, Heart, Coffee, Music, Camera
]

const DOT_COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#9B5DE5", "#FF7AB6"]

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function intersects(a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) {
  return !(a.x + a.w < b.x || b.x + b.w < a.x || a.y + a.h < b.y || b.y + b.h < a.y)
}

export default function DoodleOverlay() {
  const [items, setItems] = useState<Item[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const generate = () => {
      const vw = document.documentElement.clientWidth || window.innerWidth || 0
      const vh = document.body.scrollHeight || document.documentElement.clientHeight || window.innerHeight || 0

      const area = vw * vh
      const iconCount = 40
      const dotCount = 30

      const placed: { x: number; y: number; w: number; h: number }[] = []
      const newItems: Item[] = []

      // Shuffle icons to ensure no repeats
      const shuffledIcons = [...ICONS].sort(() => Math.random() - 0.5)

      // Icons - use each icon once, no repeats
      for (let i = 0; i < iconCount; i++) {
        let attempts = 0
        while (attempts < 200) {
          const size = Math.round(rand(36, Math.min(140, Math.max(36, vw / 6))))
          const x = Math.round(rand(8, Math.max(8, vw - size - 8)))
          const y = Math.round(rand(8, Math.max(8, vh - size - 8)))
          const rect = { x, y, w: size + 16, h: size + 16 } // padding

          const collision = placed.some((p) => intersects(p, rect))
          if (!collision) {
            placed.push(rect)
            const Icon = shuffledIcons[i % shuffledIcons.length]
            newItems.push({ id: `icon-${i}-${Date.now()}`, type: "icon", Icon, size, x, y, rotation: Math.round(rand(-30, 30)) })
            break
          }
          attempts++
        }
      }

      // Dots
      for (let i = 0; i < dotCount; i++) {
        let attempts = 0
        while (attempts < 200) {
          const size = Math.round(rand(4, 18))
          const x = Math.round(rand(4, Math.max(4, vw - size - 4)))
          const y = Math.round(rand(4, Math.max(4, vh - size - 4)))
          const rect = { x, y, w: size + 6, h: size + 6 }

          const collision = placed.some((p) => intersects(p, rect))
          if (!collision) {
            placed.push(rect)
            newItems.push({ id: `dot-${i}-${Date.now()}`, type: "dot", size, x, y, color: DOT_COLORS[Math.floor(rand(0, DOT_COLORS.length))] })
            break
          }
          attempts++
        }
      }

      setItems(newItems)
    }

    // generate initially and on resize/content changes (debounced)
    generate()
    let t: any = null
    const scheduleGenerate = () => {
      clearTimeout(t)
      t = setTimeout(() => generate(), 160)
    }

    const ro = new ResizeObserver(scheduleGenerate)
    ro.observe(document.body)

    window.addEventListener("resize", scheduleGenerate)
    window.addEventListener("orientationchange", scheduleGenerate)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", scheduleGenerate)
      window.removeEventListener("orientationchange", scheduleGenerate)
    }
  }, [])

  return (
    // Only visible on large/desktop screens
    <div
      ref={containerRef}
      className="hidden lg:block absolute inset-0 -z-10 pointer-events-none"
      aria-hidden
    >
      {items.map((it) => {
        if (it.type === "icon") {
          const ic = it as IconItem
          const Icon = ic.Icon
          return (
            <div
              key={ic.id}
              style={{
                position: "absolute",
                left: ic.x,
                top: ic.y,
                width: ic.size,
                height: ic.size,
                transform: `rotate(${ic.rotation}deg)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 1,
              }}
            >
              <Icon
                size={ic.size}
                strokeWidth={0.4}
                style={{ strokeOpacity: 0.15, fill: "none" }}
                className="text-black/70 dark:text-white/70"
              />
            </div>
          )
        }

        const d = it as DotItem
        return (
          <div
            key={d.id}
            style={{
              position: "absolute",
              left: d.x,
              top: d.y,
              width: d.size,
              height: d.size,
              borderRadius: "9999px",
              background: d.color,
              opacity: 0.3,
              transform: `rotate(${Math.round(rand(-45, 45))}deg)`,
              mixBlendMode: 'screen',
            }}
          />
        )
      })}
    </div>
  )
}