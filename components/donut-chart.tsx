"use client"

import { useMemo, useState } from "react"
import { GROUPS, GROUP_ORDER, type Country, type GroupKey } from "@/lib/americas-data"

type Segment = {
  key: GroupKey
  value: number
  start: number
  end: number
}

function polar(cx: number, cy: number, r: number, angle: number) {
  const a = ((angle - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

function arcPath(cx: number, cy: number, rOuter: number, rInner: number, start: number, end: number) {
  // 단일 세그먼트가 360도를 다 채우면 살짝 줄여 렌더 오류 방지
  const sweep = end - start
  const e = sweep >= 359.999 ? end - 0.001 : end
  const largeArc = e - start > 180 ? 1 : 0
  const p1 = polar(cx, cy, rOuter, start)
  const p2 = polar(cx, cy, rOuter, e)
  const p3 = polar(cx, cy, rInner, e)
  const p4 = polar(cx, cy, rInner, start)
  return [
    `M ${p1.x} ${p1.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y}`,
    `L ${p3.x} ${p3.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y}`,
    "Z",
  ].join(" ")
}

export function DonutChart({
  country,
  size = 260,
  showCenter = true,
}: {
  country: Country
  size?: number
  showCenter?: boolean
}) {
  const [active, setActive] = useState<GroupKey | null>(null)

  const segments = useMemo<Segment[]>(() => {
    const ordered = GROUP_ORDER.filter((k) => (country.composition[k] ?? 0) > 0)
    let cursor = 0
    return ordered.map((key) => {
      const value = country.composition[key] ?? 0
      const start = cursor
      const end = cursor + (value / 100) * 360
      cursor = end
      return { key, value, start, end }
    })
  }, [country])

  const cx = size / 2
  const cy = size / 2
  const rOuter = size / 2 - 6
  const rInner = rOuter * 0.56

  return (
    <div className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`${country.name}의 민족·인종 구성 도넛 차트`}
      >
        {segments.map((s) => {
          const isActive = active === s.key
          const isDimmed = active !== null && !isActive
          const midAngle = (s.start + s.end) / 2
          const labelPos = polar(cx, cy, (rOuter + rInner) / 2, midAngle)
          return (
            <g key={s.key}>
              <path
                d={arcPath(cx, cy, rOuter, rInner, s.start, s.end)}
                fill={GROUPS[s.key].color}
                stroke="var(--card)"
                strokeWidth={2}
                style={{
                  opacity: isDimmed ? 0.35 : 1,
                  transformOrigin: `${cx}px ${cy}px`,
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                  transition: "opacity 0.2s ease, transform 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setActive(s.key)}
                onMouseLeave={() => setActive(null)}
              />
              {s.value >= 6 && (
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none fill-white font-sans"
                  fontSize={size * 0.055}
                  fontWeight={700}
                >
                  {s.value}
                </text>
              )}
            </g>
          )
        })}

        {showCenter && (
          <>
            <circle cx={cx} cy={cy} r={rInner - 3} fill="var(--card)" />
            <text
              x={cx}
              y={cy - (active ? size * 0.03 : size * 0.055)}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-foreground font-serif"
              fontSize={size * 0.1}
              fontWeight={800}
            >
              {active ? GROUPS[active].label : country.name}
            </text>
            <text
              x={cx}
              y={cy + (active ? size * 0.055 : size * 0.05)}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-muted-foreground font-sans"
              fontSize={size * 0.075}
              fontWeight={600}
            >
              {active
                ? `${country.composition[active]}%`
                : "구성비(%)"}
            </text>
          </>
        )}
      </svg>
    </div>
  )
}
