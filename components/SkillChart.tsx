"use client"

import React, { useState, useId } from "react"

export interface ChartItem {
  name?: string
  subject?: string
  value: number
}

export interface SkillChartProps {
  id?: number | string
  type: "line" | "bar" | "area" | "radar" | "pie"
  data: ChartItem[]
  className?: string
}

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
]

function getSmoothPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return ""
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2

    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

function polarToCartesian(cx: number, cy: number, r: number, angleInRadians: number) {
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  }
}

function getDonutArc(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number
) {
  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle)
  const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle)
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle)
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle)

  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0

  return [
    `M ${outerStart.x.toFixed(1)} ${outerStart.y.toFixed(1)}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x.toFixed(1)} ${outerEnd.y.toFixed(1)}`,
    `L ${innerEnd.x.toFixed(1)} ${innerEnd.y.toFixed(1)}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x.toFixed(1)} ${innerStart.y.toFixed(1)}`,
    "Z",
  ].join(" ")
}

export default function SkillChart({ id, type, data, className = "" }: SkillChartProps) {
  const chartUid = useId().replace(/:/g, "-")
  const gradId = `chart-grad-${id || chartUid}`

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [tooltip, setTooltip] = useState<{
    x: number
    y: number
    title: string
    value: string | number
    color?: string
  } | null>(null)

  // Standard dimensions for viewBox
  const vbWidth = 380
  const vbHeight = 220

  const handlePointerLeave = () => {
    setHoveredIdx(null)
    setTooltip(null)
  }

  /* -------------------------------------------------------------
     1 & 2. LINE / AREA CHART
  ------------------------------------------------------------- */
  if (type === "line" || type === "area") {
    const padLeft = 40
    const padRight = 24
    const padTop = 24
    const padBottom = 34

    const chartW = vbWidth - padLeft - padRight
    const chartH = vbHeight - padTop - padBottom

    const maxVal = Math.max(...data.map((d) => d.value), 100)
    const minVal = 0

    const points = data.map((d, i) => {
      const x = padLeft + (i / Math.max(data.length - 1, 1)) * chartW
      const y = padTop + chartH - ((d.value - minVal) / (maxVal - minVal)) * chartH
      return { x, y, name: d.name || "", value: d.value }
    })

    const linePath = getSmoothPath(points)
    const bottomY = padTop + chartH
    const areaPath = points.length
      ? `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${bottomY} L ${points[0].x.toFixed(1)} ${bottomY} Z`
      : ""

    const yGridSteps = [0, 25, 50, 75, 100]
    const strokeColor = type === "area" ? "var(--color-chart-3)" : "var(--color-chart-1)"

    return (
      <div className={`relative w-full h-full select-none ${className}`} onMouseLeave={handlePointerLeave}>
        <svg
          viewBox={`0 0 ${vbWidth} ${vbHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.32" />
              <stop offset="60%" stopColor={strokeColor} stopOpacity="0.08" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
            </linearGradient>
            <filter id={`glow-${gradId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={strokeColor} floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Grid lines & Y-axis labels */}
          {yGridSteps.map((step) => {
            const y = padTop + chartH - ((step - minVal) / (maxVal - minVal)) * chartH
            return (
              <g key={`y-${step}`}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={padLeft + chartW}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeOpacity="0.16"
                  strokeDasharray="4 4"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-muted-foreground text-[10px] font-mono select-none"
                >
                  {step}
                </text>
              </g>
            )
          })}

          {/* Area fill */}
          {type === "area" && areaPath && (
            <path d={areaPath} fill={`url(#${gradId})`} className="transition-all duration-300" />
          )}

          {/* Active indicator vertical line */}
          {hoveredIdx !== null && points[hoveredIdx] && (
            <line
              x1={points[hoveredIdx].x}
              y1={padTop}
              x2={points[hoveredIdx].x}
              y2={bottomY}
              stroke="var(--color-foreground)"
              strokeOpacity="0.25"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />
          )}

          {/* Smooth line stroke */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter={`url(#glow-${gradId})`}
            />
          )}

          {/* Interactive dots & X-axis labels */}
          {points.map((pt, i) => {
            const isHovered = hoveredIdx === i
            return (
              <g key={`pt-${i}`}>
                {/* Hit area */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={16}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => {
                    setHoveredIdx(i)
                    setTooltip({
                      x: pt.x,
                      y: pt.y - 12,
                      title: pt.name,
                      value: `${pt.value}%`,
                      color: strokeColor,
                    })
                  }}
                />

                {/* Pulse halo on hover */}
                {isHovered && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={9}
                    fill={strokeColor}
                    fillOpacity="0.25"
                    className="animate-ping"
                  />
                )}

                {/* Visible dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 5.5 : 3.5}
                  fill="var(--color-card)"
                  stroke={strokeColor}
                  strokeWidth={isHovered ? 2.5 : 2}
                  className="transition-all duration-200 pointer-events-none"
                />

                {/* X-axis label */}
                <text
                  x={pt.x}
                  y={bottomY + 16}
                  textAnchor="middle"
                  className={`text-[11px] font-sans transition-colors duration-150 select-none ${
                    isHovered ? "fill-foreground font-semibold" : "fill-muted-foreground"
                  }`}
                >
                  {pt.name}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Floating Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full rounded-md border border-border/50 bg-popover/95 px-2.5 py-1 text-xs text-popover-foreground shadow-md backdrop-blur-sm transition-transform duration-75"
            style={{
              left: `${(tooltip.x / vbWidth) * 100}%`,
              top: `${(tooltip.y / vbHeight) * 100}%`,
            }}
          >
            <div className="flex items-center gap-1.5 font-medium">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: tooltip.color }} />
              <span className="text-muted-foreground">{tooltip.title}:</span>
              <span className="font-bold text-foreground">{tooltip.value}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  /* -------------------------------------------------------------
     2. BAR CHART
  ------------------------------------------------------------- */
  if (type === "bar") {
    const padLeft = 40
    const padRight = 20
    const padTop = 24
    const padBottom = 34

    const chartW = vbWidth - padLeft - padRight
    const chartH = vbHeight - padTop - padBottom
    const maxVal = 100
    const bottomY = padTop + chartH

    const barCount = data.length
    const slotW = chartW / barCount
    const barWidth = Math.min(26, slotW * 0.45)
    const barColor = "var(--color-chart-2)"

    const yGridSteps = [0, 25, 50, 75, 100]

    return (
      <div className={`relative w-full h-full select-none ${className}`} onMouseLeave={handlePointerLeave}>
        <svg
          viewBox={`0 0 ${vbWidth} ${vbHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={barColor} stopOpacity="1" />
              <stop offset="100%" stopColor={barColor} stopOpacity="0.75" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {yGridSteps.map((step) => {
            const y = padTop + chartH - (step / maxVal) * chartH
            return (
              <g key={`y-${step}`}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={padLeft + chartW}
                  y2={y}
                  stroke="var(--color-border)"
                  strokeOpacity="0.14"
                  strokeDasharray="4 4"
                />
                <text
                  x={padLeft - 8}
                  y={y + 3.5}
                  textAnchor="end"
                  className="fill-muted-foreground text-[10px] font-mono select-none"
                >
                  {step}
                </text>
              </g>
            )
          })}

          {/* Bars */}
          {data.map((item, i) => {
            const isHovered = hoveredIdx === i
            const barH = (item.value / maxVal) * chartH
            const barX = padLeft + i * slotW + (slotW - barWidth) / 2
            const barY = bottomY - barH

            return (
              <g
                key={`bar-${i}`}
                className="cursor-pointer"
                onMouseEnter={() => {
                  setHoveredIdx(i)
                  setTooltip({
                    x: barX + barWidth / 2,
                    y: barY - 10,
                    title: item.name || "",
                    value: `${item.value}%`,
                    color: barColor,
                  })
                }}
              >
                {/* Background track (subtle capability indicator) */}
                <rect
                  x={barX}
                  y={padTop}
                  width={barWidth}
                  height={chartH}
                  rx={barWidth / 2}
                  fill="var(--color-border)"
                  fillOpacity="0.08"
                />

                {/* Foreground bar with sleek pill shape */}
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={Math.max(barH, 4)}
                  rx={barWidth / 2}
                  fill={`url(#${gradId})`}
                  opacity={isHovered ? 1 : 0.9}
                  className="transition-all duration-200"
                  style={{
                    filter: isHovered ? "drop-shadow(0 4px 8px rgba(0,0,0,0.25))" : undefined,
                  }}
                />

                {/* X-axis label */}
                <text
                  x={barX + barWidth / 2}
                  y={bottomY + 16}
                  textAnchor="middle"
                  className={`text-[11px] font-sans transition-colors duration-150 select-none ${
                    isHovered ? "fill-foreground font-semibold" : "fill-muted-foreground"
                  }`}
                >
                  {item.name}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Floating Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full rounded-md border border-border/50 bg-popover/95 px-2.5 py-1 text-xs text-popover-foreground shadow-md backdrop-blur-sm transition-transform duration-75"
            style={{
              left: `${(tooltip.x / vbWidth) * 100}%`,
              top: `${(tooltip.y / vbHeight) * 100}%`,
            }}
          >
            <div className="flex items-center gap-1.5 font-medium">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: tooltip.color }} />
              <span className="text-muted-foreground">{tooltip.title}:</span>
              <span className="font-bold text-foreground">{tooltip.value}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  /* -------------------------------------------------------------
     3. RADAR / SPIDER CHART
  ------------------------------------------------------------- */
  if (type === "radar") {
    const cx = vbWidth / 2
    const cy = vbHeight / 2 - 4
    const maxRadius = 74
    const count = data.length
    const radarColor = "var(--color-chart-4)"

    const levels = [0.25, 0.5, 0.75, 1.0]

    const getAngle = (i: number) => (i * 2 * Math.PI) / count - Math.PI / 2

    // Vertex points for data
    const dataVertices = data.map((d, i) => {
      const angle = getAngle(i)
      const r = (d.value / 100) * maxRadius
      return {
        ...polarToCartesian(cx, cy, r, angle),
        subject: d.subject || d.name || "",
        value: d.value,
        angle,
      }
    })

    const radarPolygonPath = dataVertices
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
      .join(" ") + " Z"

    return (
      <div className={`relative w-full h-full select-none ${className}`} onMouseLeave={handlePointerLeave}>
        <svg
          viewBox={`0 0 ${vbWidth} ${vbHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={radarColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={radarColor} stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Web grid polygons */}
          {levels.map((lvl, lIdx) => {
            const r = maxRadius * lvl
            const polyPoints = Array.from({ length: count }, (_, i) => {
              const pt = polarToCartesian(cx, cy, r, getAngle(i))
              return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`
            }).join(" ")

            return (
              <polygon
                key={`lvl-${lIdx}`}
                points={polyPoints}
                fill="none"
                stroke="var(--color-border)"
                strokeOpacity={lIdx === levels.length - 1 ? 0.35 : 0.16}
                strokeDasharray={lIdx === levels.length - 1 ? undefined : "3 3"}
              />
            )
          })}

          {/* Radial axis lines */}
          {Array.from({ length: count }, (_, i) => {
            const outerPt = polarToCartesian(cx, cy, maxRadius, getAngle(i))
            return (
              <line
                key={`spoke-${i}`}
                x1={cx}
                y1={cy}
                x2={outerPt.x}
                y2={outerPt.y}
                stroke="var(--color-border)"
                strokeOpacity="0.2"
              />
            )
          })}

          {/* Filled radar area */}
          <path
            d={radarPolygonPath}
            fill={`url(#${gradId})`}
            stroke={radarColor}
            strokeWidth="2.5"
            strokeLinejoin="round"
            className="transition-all duration-300"
          />

          {/* Vertices & subject labels */}
          {dataVertices.map((v, i) => {
            const isHovered = hoveredIdx === i
            const labelPt = polarToCartesian(cx, cy, maxRadius + 18, v.angle)

            return (
              <g key={`vertex-${i}`}>
                {/* Vertex interactive dot */}
                <circle
                  cx={v.x}
                  cy={v.y}
                  r={isHovered ? 6 : 4}
                  fill="var(--color-card)"
                  stroke={radarColor}
                  strokeWidth="2.5"
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => {
                    setHoveredIdx(i)
                    setTooltip({
                      x: v.x,
                      y: v.y - 10,
                      title: v.subject,
                      value: `${v.value}%`,
                      color: radarColor,
                    })
                  }}
                />

                {/* Outer label */}
                <text
                  x={labelPt.x}
                  y={labelPt.y + 3}
                  textAnchor={
                    Math.abs(Math.cos(v.angle)) < 0.2
                      ? "middle"
                      : Math.cos(v.angle) > 0
                      ? "start"
                      : "end"
                  }
                  className={`text-[10px] sm:text-[11px] font-sans transition-colors duration-150 select-none ${
                    isHovered ? "fill-foreground font-semibold" : "fill-muted-foreground"
                  }`}
                >
                  {v.subject}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Floating Tooltip */}
        {tooltip && (
          <div
            className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full rounded-md border border-border/50 bg-popover/95 px-2.5 py-1 text-xs text-popover-foreground shadow-md backdrop-blur-sm transition-transform duration-75"
            style={{
              left: `${(tooltip.x / vbWidth) * 100}%`,
              top: `${(tooltip.y / vbHeight) * 100}%`,
            }}
          >
            <div className="flex items-center gap-1.5 font-medium">
              <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: tooltip.color }} />
              <span className="text-muted-foreground">{tooltip.title}:</span>
              <span className="font-bold text-foreground">{tooltip.value}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  /* -------------------------------------------------------------
     4. PIE / DONUT CHART
  ------------------------------------------------------------- */
  if (type === "pie") {
    const total = data.reduce((sum, d) => sum + (d.value || 0), 0)
    const cx = 140
    const cy = vbHeight / 2
    const baseOuterR = 72
    const baseInnerR = 44
    const padGap = 0.04 // small gap between slices in radians

    let curAngle = -Math.PI / 2

    const slices = data.map((d, i) => {
      const sliceAngle = (d.value / Math.max(total, 1)) * 2 * Math.PI
      const startAngle = curAngle + padGap / 2
      const endAngle = curAngle + sliceAngle - padGap / 2
      curAngle += sliceAngle

      const isHovered = hoveredIdx === i
      const outerR = isHovered ? baseOuterR + 7 : baseOuterR
      const innerR = isHovered ? baseInnerR - 2 : baseInnerR

      const color = CHART_COLORS[i % CHART_COLORS.length]
      const path = getDonutArc(cx, cy, outerR, innerR, startAngle, endAngle)
      const midAngle = (startAngle + endAngle) / 2
      const midCoord = polarToCartesian(cx, cy, (outerR + innerR) / 2, midAngle)

      return {
        ...d,
        index: i,
        color,
        path,
        percentage: Math.round((d.value / Math.max(total, 1)) * 100),
        midCoord,
      }
    })

    const activeItem = hoveredIdx !== null ? slices[hoveredIdx] : null

    return (
      <div className={`relative w-full h-full select-none ${className}`} onMouseLeave={handlePointerLeave}>
        <div className="w-full h-full flex items-center justify-between">
          {/* SVG Donut */}
          <div className="relative w-[60%] h-full">
            <svg
              viewBox={`0 0 260 ${vbHeight}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              <g transform="translate(0, 0)">
                {slices.map((slice) => {
                  const isHovered = hoveredIdx === slice.index
                  return (
                    <path
                      key={`slice-${slice.index}`}
                      d={slice.path}
                      fill={slice.color}
                      stroke="var(--color-card)"
                      strokeWidth={isHovered ? 2.5 : 1.5}
                      opacity={hoveredIdx === null || isHovered ? 0.95 : 0.6}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => {
                        setHoveredIdx(slice.index)
                        setTooltip({
                          x: slice.midCoord.x,
                          y: slice.midCoord.y - 12,
                          title: slice.name || "",
                          value: `${slice.percentage}%`,
                          color: slice.color,
                        })
                      }}
                    />
                  )
                })}

                {/* Center text in donut hole */}
                <text
                  x={cx}
                  y={cy - 4}
                  textAnchor="middle"
                  className="fill-foreground font-bold text-[15px] select-none"
                >
                  {activeItem ? `${activeItem.percentage}%` : `${total}%`}
                </text>
                <text
                  x={cx}
                  y={cy + 13}
                  textAnchor="middle"
                  className="fill-muted-foreground text-[10px] font-medium tracking-wide uppercase select-none"
                >
                  {activeItem ? activeItem.name : "Total"}
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Legend on the right */}
          <div className="w-[40%] flex flex-col justify-center gap-2 pr-2">
            {slices.map((slice) => {
              const isHovered = hoveredIdx === slice.index
              return (
                <div
                  key={`legend-${slice.index}`}
                  className={`flex items-center justify-between text-xs cursor-pointer rounded-md px-2 py-1 transition-all ${
                    isHovered
                      ? "bg-muted/80 text-foreground font-semibold scale-[1.02]"
                      : "text-muted-foreground hover:bg-muted/40"
                  }`}
                  onMouseEnter={() => setHoveredIdx(slice.index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: slice.color }}
                    />
                    <span className="truncate">{slice.name}</span>
                  </div>
                  <span className="font-mono text-[11px] ml-1">{slice.value}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return null
}
