"use client"

import React, { useEffect, useState } from "react"

type Doodle = {
  id: number
  type: string
  x: number // percent
  y: number // percent
  size: number // px
  rotate: number
  opacity: number
}

const SHAPES = [
  "pencil",
  "ruler",
  "book",
  "backpack",
  "apple",
  "calculator",
  "compass",
  "eraser",
  "scissors",
  "globe",
]

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function overlaps(a: Doodle, b: Doodle, vw: number, vh: number) {
  const ax = (a.x / 100) * vw
  const ay = (a.y / 100) * vh
  const bx = (b.x / 100) * vw
  const by = (b.y / 100) * vh
  const rA = a.size / 2
  const rB = b.size / 2
  const dist = Math.hypot(ax - bx, ay - by)
  return dist < (rA + rB + 8) // 8px padding
}

export default function SchoolDoodles() {
  const [doodles, setDoodles] = useState<Doodle[]>([])
  const [isSmall, setIsSmall] = useState<boolean>(false)

  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia("(max-width: 640px)")
    const update = () => setIsSmall(!!(mq && mq.matches))
    update()
    mq?.addEventListener?.("change", update)
    return () => mq?.removeEventListener?.("change", update)
  }, [])

  useEffect(() => {
    if (isSmall) {
      setDoodles([])
      return
    }

    const vw = window.innerWidth
    const vh = window.innerHeight
    // Increase target doodles for richer decoration on larger screens;
    // keep none on small/mobile devices to preserve performance.
    let target = 22 // increased number of school doodles
    if (vw < 640) target = 0
    else if (vw < 1024) target = 12
    // clamp to max 36
    target = Math.min(target, 36)

    const items: Doodle[] = []
    let attempts = 0
    const maxAttempts = target * 35

    while (items.length < target && attempts < maxAttempts) {
      attempts++
      // slightly smaller sizes so more doodles fit comfortably
      const size = Math.round(rand(28, 72))
      const x = rand(6, 94)
      const y = rand(6, 92)
      const rotate = Math.round(rand(-45, 45))
      const opacity = 0.6
      const type = SHAPES[Math.floor(rand(0, SHAPES.length))]
      const candidate: Doodle = { id: items.length + 1 + attempts, type, x, y, size, rotate, opacity }

      const anyOverlap = items.some((it) => overlaps(it, candidate, vw, vh))
      if (!anyOverlap) items.push(candidate)
    }

    setDoodles(items)
  }, [isSmall])

  const renderShape = (d: Doodle) => {
    const common: React.SVGAttributes<SVGElement> = {
      stroke: "currentColor",
      strokeWidth: 1.2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
    }

    switch (d.type) {
      case "pencil":
        return (
          <g>
            <path d="M10 54 L40 24 L52 36 L22 66 Z" {...common} />
            <path d="M40 24 L46 18" {...common} />
            <rect x="16" y="56" width="8" height="6" rx="1" {...common} />
          </g>
        )
      case "ruler":
        return (
          <g>
            <rect x="8" y="18" width="48" height="28" rx="2" {...common} />
            <path d="M12 22 L18 22 M22 22 L28 22 M32 22 L38 22 M42 22 L48 22" strokeWidth={1} stroke="currentColor" />
          </g>
        )
      case "book":
        return (
          <g>
            <path d="M10 12 H44 A4 4 0 0 1 48 16 V52 A4 4 0 0 1 44 56 H10 Z" {...common} />
            <path d="M20 16 V52" {...common} />
          </g>
        )
      case "backpack":
        return (
          <g>
            <path d="M12 28 C12 16, 28 12, 40 16 C52 20, 52 40, 44 44 L16 44 C12 44,10 42,12 38 Z" {...common} />
            <path d="M20 44 V36" {...common} />
            <circle cx="36" cy="34" r="2" fill="currentColor" />
          </g>
        )
      case "apple":
        return (
          <g>
            <path d="M32 18 C26 18,22 24,22 30 C22 38,42 44,46 30 C46 24,40 18,34 18 C34 18,34 18,32 18 Z" {...common} />
            <path d="M36 14 C38 12,40 10,42 12" {...common} />
            <circle cx="30" cy="30" r="1.5" fill="currentColor" />
          </g>
        )
      case "calculator":
        return (
          <g>
            <rect x="12" y="10" width="40" height="44" rx="4" {...common} />
            <rect x="18" y="16" width="28" height="10" rx="1" {...common} />
            <g>
              <rect x="18" y="30" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="26" y="30" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="34" y="30" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="18" y="38" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="26" y="38" width="14" height="6" rx="1" fill="currentColor" />
            </g>
          </g>
        )
      case "compass":
        return (
          <g>
            <circle cx="32" cy="32" r="18" {...common} />
            <path d="M32 32 L40 20 L28 28 L36 36 Z" fill="currentColor" />
          </g>
        )
      case "eraser":
        return (
          <g>
            <path d="M46 20 L54 28 L28 54 L20 46 Z" {...common} />
            <rect x="16" y="40" width="16" height="10" rx="2" {...common} />
          </g>
        )
      case "scissors":
        return (
          <g>
            <circle cx="22" cy="30" r="6" {...common} />
            <circle cx="42" cy="30" r="6" {...common} />
            <path d="M28 36 L36 24" {...common} />
            <path d="M28 24 L36 36" {...common} />
          </g>
        )
      case "globe":
        return (
          <g>
            <circle cx="32" cy="28" r="12" {...common} />
            <path d="M20 28 H44" {...common} />
            <path d="M32 16 V40" {...common} />
            <path d="M24 20 C28 26,36 26,40 20" {...common} />
          </g>
        )
      default:
        return (
          <g>
            <circle cx="32" cy="32" r="10" {...common} />
          </g>
        )
    }
  }

  if (isSmall || doodles.length === 0) return null

  return (
    <div className="school-doodles pointer-events-none select-none absolute inset-0 z-0 overflow-hidden">
      {doodles.map((d) => (
        <svg
          key={d.id}
          width={d.size}
          height={d.size}
          viewBox="0 0 64 64"
          className="absolute"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            transform: `translate(-50%, -50%) rotate(${d.rotate}deg)`,
            color: "currentColor",
            opacity: d.opacity,
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {renderShape(d)}
        </svg>
      ))}
    </div>
  )
}
