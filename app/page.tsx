"use client"

import { useState } from "react"
import { Compass, Gamepad2, Globe2 } from "lucide-react"
import { ExploreView } from "@/components/explore-view"
import { QuizView } from "@/components/quiz-view"

type Tab = "explore" | "quiz"

export default function Page() {
  const [tab, setTab] = useState<Tab>("explore")

  return (
    <main className="min-h-screen">
      <header className="border-b border-border bg-card/70 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Globe2 className="size-6" />
            </span>
            <div>
              <h1 className="text-balance font-serif text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                아메리카 인종 지도
              </h1>
              <p className="text-sm text-muted-foreground">
                대륙의 민족·인종 다양성과 그 역사적 배경을 탐험하고 퀴즈로 확인해 보세요.
              </p>
            </div>
          </div>

          <nav
            aria-label="학습 모드 선택"
            className="mt-5 inline-flex rounded-lg border border-border bg-secondary/40 p-1"
          >
            <TabButton
              active={tab === "explore"}
              onClick={() => setTab("explore")}
              icon={<Compass className="size-4" />}
              label="지도 탐험"
            />
            <TabButton
              active={tab === "quiz"}
              onClick={() => setTab("quiz")}
              icon={<Gamepad2 className="size-4" />}
              label="퀴즈 게임"
            />
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        {tab === "explore" ? <ExploreView /> : <QuizView />}
      </div>

      <footer className="border-t border-border py-6">
        <p className="mx-auto max-w-5xl px-4 text-center text-xs text-muted-foreground sm:px-6">
          학습용 자료입니다. 수치는 국제 연합(2023) 기준이며 반올림된 근삿값입니다.
        </p>
      </footer>
    </main>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  )
}
