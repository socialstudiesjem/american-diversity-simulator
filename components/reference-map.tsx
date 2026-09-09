import { REFERENCE_IMAGE_URL } from "@/lib/americas-data"

export function ReferenceMap() {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border bg-secondary/50 px-4 py-3">
        <h3 className="font-serif text-lg font-bold text-foreground">
          원본 자료 · 아메리카의 민족과 인종 분포
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          도넛 크기는 총인구, 색은 민족·인종 구성비를 나타냅니다.
        </p>
      </div>
      <div className="bg-[#dfe9ee] p-3 sm:p-5">
        {/* 사용자가 요청한 원본 이미지 (외부 소스 URL 그대로 사용) */}
        <img
          src={REFERENCE_IMAGE_URL || "/placeholder.svg"}
          alt="아메리카 대륙 국가별 민족·인종 구성 비율과 총인구를 나타낸 지도. 미국은 유럽계 73%, 브라질은 유럽계 48%와 혼혈 43%, 페루는 원주민 52% 등으로 나라마다 구성이 다르게 표시되어 있다."
          className="mx-auto h-auto w-full max-w-2xl rounded-lg"
        />
      </div>
      <figcaption className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
        출처: 『신상 지리 자료』, 국제 연합(2023) · 비상교육 중학 사회① 5-2, 97p
      </figcaption>
    </figure>
  )
}
