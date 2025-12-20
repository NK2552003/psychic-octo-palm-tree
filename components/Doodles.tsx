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
  "cat",
  "bunny",
  "dog",
  "bird",
  "film",
  "camera",
  "paw",
  "fish",
  "leaf",
  "star",
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

export default function Doodles() {
  const [doodles, setDoodles] = useState<Doodle[]>([])

  useEffect(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    let target = 22
    if (vw < 640) target = 6
    else if (vw < 1024) target = 12
    // clamp to max 25
    target = Math.min(target, 25)

    const items: Doodle[] = []
    let attempts = 0
    const maxAttempts = target * 30

    while (items.length < target && attempts < maxAttempts) {
      attempts++
      const size = Math.round(rand(36, 120))
      const x = rand(6, 94)
      const y = rand(6, 92)
      const rotate = Math.round(rand(-25, 25))
      const opacity = 0.8
      const type = SHAPES[Math.floor(rand(0, SHAPES.length))]
      const candidate: Doodle = { id: items.length + 1 + attempts, type, x, y, size, rotate, opacity }

      const anyOverlap = items.some((it) => overlaps(it, candidate, vw, vh))
      if (!anyOverlap) items.push(candidate)
    }

    setDoodles(items)
  }, [])

  const renderShape = (d: Doodle) => {
      const common: React.SVGAttributes<SVGElement> = {
        stroke: "currentColor",
        strokeWidth: 1.2,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "none",
      }

    switch (d.type) {
      case "cat":
        return (
          <g>
            <circle cx="32" cy="34" r="12" {...common} />
            <path d="M20 22 L24 14 L28 22" {...common} />
            <path d="M44 22 L40 14 L36 22" {...common} />
            <circle cx="27" cy="34" r="1.2" fill="currentColor" />
            <circle cx="37" cy="34" r="1.2" fill="currentColor" />
            <path d="M28 40 C30 44, 34 44, 36 40" stroke="currentColor" strokeWidth={1} fill="none" strokeLinecap="round" />
          </g>
        )
      case "bunny":
        return (
          <g>
            <ellipse cx="32" cy="36" rx="10" ry="12" {...common} />
            <path d="M24 18 C22 6, 30 6, 30 18" {...common} />
            <path d="M42 18 C44 6, 36 6, 36 18" {...common} />
            <circle cx="28" cy="36" r="1.2" fill="currentColor" />
            <circle cx="36" cy="36" r="1.2" fill="currentColor" />
          </g>
        )
      case "dog":
        return (
          <g>
            <circle cx="32" cy="34" r="11" {...common} />
            <path d="M18 30 C14 26, 14 38, 18 34" {...common} />
            <path d="M46 30 C50 26, 50 38, 46 34" {...common} />
            <circle cx="28" cy="34" r="1.2" fill="currentColor" />
            <circle cx="36" cy="34" r="1.2" fill="currentColor" />
          </g>
        )
      case "bird":
        return (
          <g>
            <path d="M10 40 C18 26, 30 22, 40 26 C46 29, 54 26, 54 18" {...common} />
            <circle cx="36" cy="24" r="1.4" fill="currentColor" />
          </g>
        )
      case "film":
        return (
          <g>
            <rect x="6" y="12" width="52" height="40" rx="6" {...common} />
            <circle cx="18" cy="26" r="2.2" fill="currentColor" />
            <circle cx="46" cy="26" r="2.2" fill="currentColor" />
          </g>
        )
      case "camera":
        return (
          <g>
            <rect x="8" y="18" width="48" height="28" rx="4" {...common} />
            <circle cx="32" cy="32" r="8" {...common} />
            <rect x="44" y="12" width="8" height="6" rx="2" {...common} />
          </g>
        )
      case "paw":
        return (
          <g>
            <circle cx="32" cy="36" r="6" {...common} />
            <circle cx="24" cy="28" r="2.6" fill="currentColor" />
            <circle cx="40" cy="28" r="2.6" fill="currentColor" />
            <circle cx="28" cy="22" r="2.2" fill="currentColor" />
            <circle cx="36" cy="22" r="2.2" fill="currentColor" />
          </g>
        )
      case "fish":
        return (
          <g>
            <path d="M12 32 C22 20, 42 20, 52 32 C42 44, 22 44, 12 32 Z" {...common} />
            <circle cx="36" cy="28" r="1.4" fill="currentColor" />
          </g>
        )
      case "leaf":
        return (
          <g>
            <path d="M12 40 C28 28, 40 16, 52 12" {...common} />
            <path d="M34 18 L22 30" {...common} />
          </g>
        )
      case "star":
        return (
          <g>
            <path d="M32 14 L36 26 L48 26 L38 34 L42 46 L32 38 L22 46 L26 34 L16 26 L28 26 Z" {...common} />
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

  return (
    <div className="pointer-events-none select-none absolute inset-0 z-0 overflow-hidden">
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
