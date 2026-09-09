export type GroupKey =
  | "european"
  | "mixed"
  | "indigenous"
  | "african"
  | "asian"
  | "other"

export type GroupInfo = {
  key: GroupKey
  label: string
  color: string
}

// 범례 색상은 원본 자료(비상교육)의 도넛 색과 맞추었습니다.
export const GROUPS: Record<GroupKey, GroupInfo> = {
  european: { key: "european", label: "유럽계", color: "var(--group-european)" },
  mixed: { key: "mixed", label: "혼혈", color: "var(--group-mixed)" },
  indigenous: { key: "indigenous", label: "원주민", color: "var(--group-indigenous)" },
  african: { key: "african", label: "아프리카계", color: "var(--group-african)" },
  asian: { key: "asian", label: "아시아계", color: "var(--group-asian)" },
  other: { key: "other", label: "기타", color: "var(--group-other)" },
}

export const GROUP_ORDER: GroupKey[] = [
  "european",
  "mixed",
  "indigenous",
  "african",
  "asian",
  "other",
]

export type Country = {
  id: string
  name: string
  flag: string
  region: "북아메리카" | "카리브해" | "남아메리카"
  // 총 인구 (만 명, 2021년 기준 / 자메이카는 2019년)
  population: number
  populationYear: number
  composition: Partial<Record<GroupKey, number>>
  summary: string
  history: string[]
}

export const COUNTRIES: Country[] = [
  {
    id: "usa",
    name: "미국",
    flag: "🇺🇸",
    region: "북아메리카",
    population: 33474,
    populationYear: 2021,
    composition: { european: 73, african: 13, asian: 5, indigenous: 1, other: 8 },
    summary: "유럽계가 다수지만 아프리카계·아시아계·라틴계가 어우러진 대표적인 다인종 이민 국가.",
    history: [
      "17세기 이후 영국·독일·아일랜드 등 유럽에서 대규모 이민이 이어지며 유럽계가 인구의 다수를 차지하게 되었습니다.",
      "17~19세기 노예 무역으로 서아프리카에서 강제로 끌려온 사람들의 후손이 오늘날 아프리카계 미국인을 형성했습니다.",
      "20세기 후반부터 아시아계와 라틴아메리카 이민이 크게 늘며 '샐러드 볼'이라 불리는 다문화 사회로 발전했습니다.",
    ],
  },
  {
    id: "mexico",
    name: "멕시코",
    flag: "🇲🇽",
    region: "북아메리카",
    population: 12897,
    populationYear: 2021,
    composition: { mixed: 64, indigenous: 18, european: 15, other: 3 },
    summary: "스페인 정복 이후 원주민과 유럽계가 섞인 메스티소(혼혈)가 인구의 다수.",
    history: [
      "정복 이전 아스텍·마야 등 발달한 원주민 문명이 번성했고, 지금도 원주민 인구 비중이 높습니다.",
      "16세기 스페인의 식민 지배가 시작되며 유럽계와 원주민 사이의 혼혈인 '메스티소'가 급격히 늘었습니다.",
      "독립 이후 메스티소가 국가 정체성의 중심이 되어 오늘날 인구의 다수를 이룹니다.",
    ],
  },
  {
    id: "cuba",
    name: "쿠바",
    flag: "🇨🇺",
    region: "카리브해",
    population: 1115,
    populationYear: 2021,
    composition: { mixed: 50, european: 25, african: 25 },
    summary: "사탕수수 플랜테이션의 유산으로 유럽계·아프리카계·혼혈이 고르게 분포.",
    history: [
      "스페인 식민지 시기 사탕수수 재배를 위해 아프리카에서 많은 노예가 유입되었습니다.",
      "유럽계 정착민과 아프리카계 후손이 섞이며 혼혈 인구가 절반가량을 차지하게 되었습니다.",
      "이 과정에서 형성된 문화가 쿠바의 음악과 종교 등 독특한 문화를 만들어 냈습니다.",
    ],
  },
  {
    id: "jamaica",
    name: "자메이카",
    flag: "🇯🇲",
    region: "카리브해",
    population: 273,
    populationYear: 2019,
    composition: { african: 92, mixed: 6, other: 2 },
    summary: "사탕수수 플랜테이션 노예의 후손인 아프리카계가 압도적 다수.",
    history: [
      "영국 식민지 시절 사탕수수 플랜테이션에 투입할 노동력으로 서아프리카 노예가 대거 끌려왔습니다.",
      "노예제 폐지 이후에도 아프리카계 후손이 인구의 대부분을 차지하게 되었습니다.",
      "아프리카에 뿌리를 둔 문화가 레게 음악 등 자메이카 고유의 문화로 이어졌습니다.",
    ],
  },
  {
    id: "colombia",
    name: "콜롬비아",
    flag: "🇨🇴",
    region: "남아메리카",
    population: 5105,
    populationYear: 2021,
    composition: { mixed: 75, european: 20, african: 4, indigenous: 1 },
    summary: "유럽계·원주민·아프리카계가 오랜 세월 섞인 혼혈이 다수.",
    history: [
      "스페인 식민 지배 아래 유럽계 정착민과 원주민의 혼혈(메스티소)이 확산되었습니다.",
      "카리브해 연안에는 노예로 유입된 아프리카계와의 혼혈(물라토)도 함께 형성되었습니다.",
      "세 계통이 오랜 세월 섞이며 혼혈이 인구의 다수를 차지하는 구조가 자리 잡았습니다.",
    ],
  },
  {
    id: "peru",
    name: "페루",
    flag: "🇵🇪",
    region: "남아메리카",
    population: 3304,
    populationYear: 2021,
    composition: { indigenous: 52, mixed: 32, european: 12, african: 4 },
    summary: "안데스 고산지대를 중심으로 잉카의 후예인 원주민 비중이 아메리카에서 가장 높은 편.",
    history: [
      "안데스 지역에서는 잉카 제국을 비롯한 원주민 문명이 크게 번성했습니다.",
      "험준한 고산지대 덕분에 원주민 사회와 언어(케추아어 등)가 비교적 잘 보존되었습니다.",
      "식민 지배로 혼혈과 유럽계도 늘었지만, 오늘날에도 원주민이 인구의 절반가량을 차지합니다.",
    ],
  },
  {
    id: "brazil",
    name: "브라질",
    flag: "🇧🇷",
    region: "남아메리카",
    population: 21332,
    populationYear: 2021,
    composition: { european: 48, mixed: 43, african: 8, asian: 1 },
    summary: "포르투갈계와 아프리카계, 그리고 이들이 섞인 혼혈이 함께 어우러진 다인종 사회.",
    history: [
      "16세기부터 포르투갈이 식민 지배하며 유럽계 이주가 이어졌습니다.",
      "사탕수수·커피 플랜테이션을 위해 아메리카에서 가장 많은 아프리카 노예가 유입되었습니다.",
      "유럽계·아프리카계·원주민이 폭넓게 섞여 혼혈 비중이 매우 높은 다인종 사회가 되었습니다.",
    ],
  },
  {
    id: "argentina",
    name: "아르헨티나",
    flag: "🇦🇷",
    region: "남아메리카",
    population: 4581,
    populationYear: 2021,
    composition: { european: 86, mixed: 7, other: 4, indigenous: 3 },
    summary: "19~20세기 유럽 대량 이민으로 유럽계 비중이 아메리카에서 가장 높은 편.",
    history: [
      "19세기 후반부터 20세기 초까지 이탈리아·스페인 등에서 대규모 이민을 적극 받아들였습니다.",
      "짧은 기간 수백만 명의 유럽인이 이주해 유럽계 비중이 압도적으로 높아졌습니다.",
      "이 때문에 원주민과 혼혈 비중은 상대적으로 낮은 편입니다.",
    ],
  },
  {
    id: "uruguay",
    name: "우루과이",
    flag: "🇺🇾",
    region: "남아메리카",
    population: 354,
    populationYear: 2021,
    composition: { european: 88, mixed: 8, african: 4 },
    summary: "이웃 아르헨티나처럼 유럽 이민 중심으로 유럽계 비중이 매우 높음.",
    history: [
      "19세기 이후 스페인·이탈리아계 이민이 집중되며 유럽계가 인구의 대부분이 되었습니다.",
      "소수의 아프리카계 후손과 혼혈이 함께 살아가고 있습니다.",
      "원주민 인구는 식민 시기를 거치며 크게 줄어 오늘날 매우 적습니다.",
    ],
  },
]

export function formatPopulation(manMyeong: number): string {
  // 값 단위: 만 명
  const total = manMyeong * 10000
  const eok = Math.floor(total / 100_000_000)
  const remainderMan = Math.round((total % 100_000_000) / 10000)
  if (eok > 0) {
    return remainderMan > 0
      ? `${eok}억 ${remainderMan.toLocaleString()}만 명`
      : `${eok}억 명`
  }
  return `${manMyeong.toLocaleString()}만 명`
}

export function dominantGroup(country: Country): GroupKey {
  const entries = Object.entries(country.composition) as [GroupKey, number][]
  return entries.sort((a, b) => b[1] - a[1])[0][0]
}

export const REFERENCE_IMAGE_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5B%EB%B9%84%EC%83%81%EA%B5%90%EC%9C%A1%5D%20%EC%A4%91%ED%95%99_%EC%82%AC%ED%9A%8C%20%E2%91%A0_5-2_97p_%EC%95%84%EB%A9%94%EB%A6%AC%EC%B9%B4%EC%9D%98%20%EB%AF%BC%EC%A1%B1%EA%B3%BC%20%EC%9D%B8%EC%A2%85%20%EB%B6%84%ED%8F%AC%20%281%29-uBv9nUtBhUeQ91e5xaN8jFNVRbcqUp.jpg"
