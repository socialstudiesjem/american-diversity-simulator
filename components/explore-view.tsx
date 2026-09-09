"use client"

import { useState } from "react"
import {
  COUNTRIES,
  GROUPS,
  dominantGroup,
  formatPopulation,
} from "@/lib/americas-data"
import { CategoryLegend } from "./category-legend"
import { CountryDetail } from "./country-detail"
import { ReferenceMap } from "./reference-map"

export function ExploreView() {
  const [selectedId, setSelectedId] = useState(COUNTRIES[0].id)
  const selected = COUNTRIES.find((c) => c.id === selectedId) ?? COUNTRIES[0]

  return (
    <div className="space-y-8">
      <ReferenceMap />

      <div>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-bold text-foreground">
              나라를 골라 자세히 살펴보기
            </h2>
            <p className="text-sm text-muted-foreground">
              카드를 누르면 도넛 차트와 역사적 배경이 아래에 나타납니다.
            </p>
          </div>
          <CategoryLegend />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
          {COUNTRIES.map((country) => {
            const dom = dominantGroup(country)
            const isActive = country.id === selectedId
            return (
              <button
                key={country.id}
                type="button"
                onClick={() => setSelectedId(country.id)}
                aria-pressed={isActive}
                className={`group flex flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
                  isActive
                    ? "border-primary bg-card shadow-sm ring-1 ring-primary"
                    : "border-border bg-card/60 hover:border-primary/50 hover:bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-xl" aria-hidden>
                      {country.flag}
                    </span>
                    <span className="font-serif text-lg font-bold text-foreground">
                      {country.name}
                    </span>
                  </span>
                  <span
                    className="size-3 rounded-full"
                    style={{ backgroundColor: GROUPS[dom].color }}
                    aria-hidden
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatPopulation(country.population)}
                </span>
                <span className="text-xs font-medium text-foreground/70">
                  최다: {GROUPS[dom].label} {country.composition[dom]}%
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <CountryDetail country={selected} />
    </div>
  )
}
