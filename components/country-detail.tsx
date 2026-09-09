"use client"

import { Users, ScrollText } from "lucide-react"
import {
  COUNTRIES,
  GROUPS,
  GROUP_ORDER,
  formatPopulation,
  type Country,
} from "@/lib/americas-data"
import { DonutChart } from "./donut-chart"

function maxPopulation() {
  return Math.max(...COUNTRIES.map((c) => c.population))
}

export function CountryDetail({ country }: { country: Country }) {
  const sortedGroups = GROUP_ORDER.filter(
    (k) => (country.composition[k] ?? 0) > 0,
  ).sort((a, b) => (country.composition[b] ?? 0) - (country.composition[a] ?? 0))

  const popRatio = country.population / maxPopulation()

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl" aria-hidden>
            {country.flag}
          </span>
          <div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              {country.name}
            </h2>
            <p className="text-sm text-muted-foreground">{country.region}</p>
          </div>
        </div>
        <p className="mt-3 text-pretty text-[15px] leading-relaxed text-foreground/85">
          {country.summary}
        </p>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[minmax(0,260px)_1fr]">
        <div className="flex flex-col items-center gap-4">
          <DonutChart country={country} size={240} />
          <div className="w-full rounded-lg bg-secondary/50 p-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="size-4" />
              <span>총인구 ({country.populationYear}년)</span>
            </div>
            <p className="mt-1 font-serif text-xl font-bold text-foreground">
              {formatPopulation(country.population)}
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${Math.max(popRatio * 100, 3)}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              아메리카 최대 인구국(미국) 대비 비율
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              민족·인종 구성
            </h3>
            <ul className="space-y-2">
              {sortedGroups.map((key) => {
                const value = country.composition[key] ?? 0
                return (
                  <li key={key} className="flex items-center gap-3">
                    <span className="w-16 shrink-0 text-sm text-foreground/80">
                      {GROUPS[key].label}
                    </span>
                    <div className="h-5 flex-1 overflow-hidden rounded-md bg-secondary/60">
                      <div
                        className="flex h-full items-center justify-end rounded-md px-2"
                        style={{
                          width: `${value}%`,
                          backgroundColor: GROUPS[key].color,
                        }}
                      >
                        {value >= 12 && (
                          <span className="text-xs font-bold text-white">
                            {value}%
                          </span>
                        )}
                      </div>
                    </div>
                    {value < 12 && (
                      <span className="w-9 text-right text-xs font-semibold text-foreground/70">
                        {value}%
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              <ScrollText className="size-4" />
              역사적 배경
            </h3>
            <ol className="space-y-2.5">
              {country.history.map((line, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/12 font-serif text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <p className="text-pretty text-[15px] leading-relaxed text-foreground/85">
                    {line}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
