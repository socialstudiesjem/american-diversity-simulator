"use client"

import { useMemo, useState } from "react"
import { Check, X, RotateCcw, Trophy, HelpCircle } from "lucide-react"
import {
  COUNTRIES,
  GROUPS,
  GROUP_ORDER,
  dominantGroup,
  formatPopulation,
  type Country,
  type GroupKey,
} from "@/lib/americas-data"
import { DonutChart } from "./donut-chart"

type Question = {
  id: string
  kind: "chart" | "dominant" | "history" | "population"
  prompt: string
  country: Country
  options: string[]
  answer: string
  hint?: string
  extraHint?: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function sample<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

function buildQuestions(): Question[] {
  const questions: Question[] = []
  const pool = shuffle(COUNTRIES)

  // 1) 도넛 차트 보고 나라 맞히기 (2문항)
  for (const country of pool.slice(0, 2)) {
    const distractors = sample(
      COUNTRIES.filter((c) => c.id !== country.id),
      3,
    ).map((c) => c.name)
    questions.push({
      id: `chart-${country.id}`,
      kind: "chart",
      prompt: "아래 민족·인종 구성비를 가진 나라는 어디일까요?",
      country,
      options: shuffle([country.name, ...distractors]),
      answer: country.name,
      hint: `총인구는 약 ${formatPopulation(country.population)}입니다.`,
    })
  }

  // 2) 최다 집단 맞히기 (2문항)
  for (const country of pool.slice(2, 4)) {
    const dom = dominantGroup(country)
    const distractors = sample(
      GROUP_ORDER.filter((g) => g !== dom),
      3,
    ).map((g) => GROUPS[g].label)
    questions.push({
      id: `dominant-${country.id}`,
      kind: "dominant",
      prompt: `${country.name}에서 가장 비중이 큰 민족·인종 집단은?`,
      country,
      options: shuffle([GROUPS[dom].label, ...distractors]),
      answer: GROUPS[dom].label,
      hint: country.summary,
    })
  }

  // 3) 역사적 배경 단서로 나라 맞히기 (2문항)
  for (const country of pool.slice(4, 6)) {
    const dom = dominantGroup(country)
    const distractors = sample(
      COUNTRIES.filter((c) => c.id !== country.id),
      3,
    ).map((c) => c.name)
    questions.push({
      id: `history-${country.id}`,
      kind: "history",
      prompt: "다음 역사적 배경 설명에 해당하는 나라는?",
      country,
      options: shuffle([country.name, ...distractors]),
      answer: country.name,
      hint: country.history[1] ?? country.history[0],
      extraHint: `가장 비중이 큰 집단은 '${GROUPS[dom].label}'(${country.composition[dom]}%)이고, 총인구는 약 ${formatPopulation(country.population)}입니다.`,
    })
  }

  // 4) 인구 비교 (1문항)
  {
    const set = sample(COUNTRIES, 4)
    const answer = set.reduce((a, b) => (a.population > b.population ? a : b))
    questions.push({
      id: "population",
      kind: "population",
      prompt: "다음 나라 중 총인구가 가장 많은 나라는?",
      country: answer,
      options: shuffle(set.map((c) => c.name)),
      answer: answer.name,
    })
  }

  return questions
}

export function QuizView() {
  const [seed, setSeed] = useState(0)
  const questions = useMemo(() => buildQuestions(), [seed])
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [hintShown, setHintShown] = useState(false)

  const q = questions[index]
  const isCorrect = picked === q?.answer

  function choose(option: string) {
    if (picked) return
    setPicked(option)
    if (option === q.answer) setScore((s) => s + 1)
  }

  function next() {
    if (index + 1 >= questions.length) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
    setHintShown(false)
  }

  function restart() {
    setSeed((s) => s + 1)
    setIndex(0)
    setPicked(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const total = questions.length
    const pct = Math.round((score / total) * 100)
    const message =
      pct >= 80
        ? "훌륭해요! 아메리카 인종 지도를 꿰뚫고 있군요."
        : pct >= 50
          ? "좋아요! 조금만 더 하면 완벽해요."
          : "탐험 탭에서 다시 살펴보고 도전해 보세요!"
    return (
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/12">
          <Trophy className="size-8 text-primary" />
        </div>
        <h2 className="mt-4 font-serif text-2xl font-bold text-foreground">
          퀴즈 완료!
        </h2>
        <p className="mt-2 text-muted-foreground">{message}</p>
        <p className="mt-6 font-serif text-5xl font-black text-primary">
          {score}
          <span className="text-2xl font-bold text-muted-foreground">
            {" "}
            / {total}
          </span>
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <RotateCcw className="size-4" />
          새 문제로 다시 풀기
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              문제 {index + 1} / {questions.length}
            </span>
            <span className="font-medium text-foreground">점수 {score}</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${((index + (picked ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-balance font-serif text-xl font-bold leading-snug text-foreground">
          {q.prompt}
        </h2>

        {q.kind === "chart" && (
          <div className="mt-4 flex flex-col items-center gap-4">
            <DonutChart country={q.country} size={220} showCenter={false} />
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              {GROUP_ORDER.filter((g) => (q.country.composition[g] ?? 0) > 0).map((g) => (
                <li key={g} className="flex items-center gap-1.5 text-sm">
                  <span
                    className="size-3 shrink-0 rounded-[3px]"
                    style={{ backgroundColor: GROUPS[g].color }}
                    aria-hidden
                  />
                  <span className="text-muted-foreground">{GROUPS[g].label}</span>
                  <span className="font-semibold text-foreground">
                    {q.country.composition[g]}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {q.kind === "history" && (
          <>
            <blockquote className="mt-4 rounded-lg border-l-4 border-primary bg-secondary/40 p-4 text-pretty leading-relaxed text-foreground/85">
              {q.hint}
            </blockquote>
            {!picked && q.extraHint && (
              <div className="mt-3">
                {hintShown ? (
                  <p className="flex gap-2 rounded-lg bg-accent/10 p-3 text-sm leading-relaxed text-foreground/80">
                    <HelpCircle className="mt-0.5 size-4 shrink-0 text-accent" />
                    {q.extraHint}
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setHintShown(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-accent/60 hover:text-foreground"
                  >
                    <HelpCircle className="size-4" />
                    힌트 보기
                  </button>
                )}
              </div>
            )}
          </>
        )}

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {q.options.map((option) => {
            const isAnswer = option === q.answer
            const isPicked = option === picked
            let state =
              "border-border bg-card hover:border-primary/60 hover:bg-secondary/40"
            if (picked) {
              if (isAnswer)
                state = "border-group-african bg-group-african/15 text-foreground"
              else if (isPicked)
                state = "border-destructive bg-destructive/10 text-foreground"
              else state = "border-border bg-card opacity-60"
            }
            return (
              <button
                key={option}
                type="button"
                disabled={!!picked}
                onClick={() => choose(option)}
                className={`flex items-center justify-between gap-2 rounded-lg border px-4 py-3 text-left font-medium transition-all ${state}`}
              >
                <span>{option}</span>
                {picked && isAnswer && (
                  <Check className="size-5 text-group-african" />
                )}
                {picked && isPicked && !isAnswer && (
                  <X className="size-5 text-destructive" />
                )}
              </button>
            )
          })}
        </div>

        {picked && (
          <div className="mt-5 rounded-lg bg-secondary/50 p-4">
            <p className="flex items-center gap-2 font-bold text-foreground">
              {isCorrect ? (
                <>
                  <Check className="size-5 text-group-african" /> 정답이에요!
                </>
              ) : (
                <>
                  <X className="size-5 text-destructive" /> 아쉬워요. 정답은{" "}
                  {q.answer}
                </>
              )}
            </p>
            {(q.kind === "chart" || q.kind === "dominant") && q.hint && (
              <p className="mt-1.5 flex gap-2 text-sm leading-relaxed text-muted-foreground">
                <HelpCircle className="mt-0.5 size-4 shrink-0" />
                {q.hint}
              </p>
            )}
            <button
              type="button"
              onClick={next}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {index + 1 >= questions.length ? "결과 보기" : "다음 문제"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
