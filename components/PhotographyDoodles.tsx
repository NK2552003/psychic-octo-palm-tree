"use client"

import React, { useEffect, useState } from "react"

type PhotoDoodle = {
  id: number
  type: string
  left: string
  top: string
  size: number
  rotate: number
  opacity: number
}

const SHAPES = [
  "camera",
  "film",
  "lens",
  "aperture",
  "tripod",
  "polaroid",
  "flash",
  "shutter",
  "mountain",
  "wave",
  "bird",
  "leaf",
  "star",
  "circle",
  "square",
  "hex",
  "heart",
  "cloud",
  "sun",
  "frame",
]

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default function PhotographyDoodles() {
  const [doodles, setDoodles] = useState<PhotoDoodle[]>([])
  const [isLarge, setIsLarge] = useState<boolean>(false)

  useEffect(() => {
    const mq = typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)") : null
    const update = () => setIsLarge(!!(mq && mq.matches))
    update()

    if (mq) {
      // Support newer addEventListener and legacy addListener
      if (typeof mq.addEventListener === "function") mq.addEventListener("change", update)
      else if (typeof (mq as any).addListener === "function") (mq as any).addListener(update)
    }

    return () => {
      if (mq) {
        if (typeof (mq as any).removeEventListener === "function") (mq as any).removeEventListener("change", update)
        else if (typeof (mq as any).removeListener === "function") (mq as any).removeListener(update)
      }
    }
  }, [])

  useEffect(() => {
    if (!isLarge) {
      setDoodles([])
      return
    }

    const count = 20
    const items: PhotoDoodle[] = []
    let attempts = 0
    const maxAttempts = count * 30

    const vw = typeof window !== "undefined" ? window.innerWidth : 1200
    const vh = typeof window !== "undefined" ? window.innerHeight : 800

    while (items.length < count && attempts < maxAttempts) {
      attempts++
      const size = Math.round(rand(36, 120))
      const x = rand(4, 96)
      const y = rand(4, 92)
      const rotate = Math.round(rand(-25, 25))
      const opacity = +(0.25 + Math.random() * 0.5).toFixed(2)
      const type = SHAPES[Math.floor(rand(0, SHAPES.length))]

      // naive overlap check; keep it simple to avoid heavy CPU
      const anyOverlap = items.some((it) => {
        const ax = (parseFloat(it.left) / 100) * vw
        const ay = (parseFloat(it.top) / 100) * vh
        const bx = (x / 100) * vw
        const by = (y / 100) * vh
        const rA = it.size / 2
        const rB = size / 2
        const dist = Math.hypot(ax - bx, ay - by)
        return dist < rA + rB + 8
      })

      if (!anyOverlap) {
        items.push({ id: items.length + 1 + attempts, type, left: `${Math.round(x * 100) / 100}%`, top: `${Math.round(y * 100) / 100}%`, size, rotate, opacity })
      }
    }

    setDoodles(items)
  }, [isLarge])

  const renderShape = (d: PhotoDoodle) => {
    const common: React.SVGAttributes<SVGElement> = {
      stroke: "currentColor",
      strokeWidth: 1.2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
    }

    switch (d.type) {
      case "camera":
        return (
          <g>
            <rect x="6" y="18" width="52" height="28" rx="4" {...common} />
            <circle cx="32" cy="32" r="8" {...common} />
            <rect x="44" y="14" width="8" height="6" rx="2" {...common} />
          </g>
        )
      case "film":
        return (
          <g>
            <rect x="6" y="8" width="52" height="40" rx="6" {...common} />
            <circle cx="16" cy="18" r="2" fill="currentColor" />
            <circle cx="16" cy="42" r="2" fill="currentColor" />
          </g>
        )
      case "lens":
      case "aperture":
        return (
          <g>
            <circle cx="32" cy="32" r="12" {...common} />
            <path d="M32 20 L40 28" {...common} />
            <path d="M32 44 L24 36" {...common} />
          </g>
        )
      case "polaroid":
        return (
          <g>
            <rect x="6" y="6" width="44" height="52" rx="4" {...common} />
            <rect x="10" y="14" width="36" height="30" rx="2" opacity="0.2" {...common} />
          </g>
        )
      case "tripod":
        return (
          <g>
            <line x1="32" y1="12" x2="32" y2="36" {...common} />
            <line x1="16" y1="48" x2="48" y2="48" {...common} />
            <line x1="12" y1="60" x2="32" y2="40" {...common} />
            <line x1="52" y1="60" x2="32" y2="40" {...common} />
          </g>
        )
      case "flash":
        return (
          <g>
            <path d="M20 12 L36 12 L26 28 L36 28 L18 52 L28 28 L20 28 Z" {...common} />
          </g>
        )
      case "shutter":
        return (
          <g>
            <circle cx="32" cy="32" r="12" {...common} />
            <path d="M32 20 L37 30 L49 32" {...common} />
            <path d="M20 32 L30 37 L32 49" {...common} />
          </g>
        )
      case "mountain":
        return (
          <g>
            <path d="M6 44 L28 18 L48 36 L62 12" {...common} />
            <rect x="6" y="44" width="56" height="6" fill="currentColor" opacity="0.06" />
          </g>
        )
      case "wave":
        return (
          <g>
            <path d="M6 40 C16 28, 26 28, 36 40 C46 52, 56 52, 62 40" {...common} />
          </g>
        )
      case "photo":
      case "frame":
        return (
          <g>
            <rect x="8" y="8" width="48" height="40" rx="6" {...common} />
            <circle cx="34" cy="28" r="6" {...common} />
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

  if (!isLarge || doodles.length === 0) return null

  return (
    <div className="photo-doodles pointer-events-none select-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {doodles.map((d) => (
        <svg
          key={d.id}
          width={d.size}
          height={d.size}
          viewBox="0 0 64 64"
          className="absolute"
          style={{
            left: d.left,
            top: d.top,
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
