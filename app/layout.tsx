import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Noto_Serif_KR } from 'next/font/google'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-kr',
})

const notoSerifKr = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  variable: '--font-noto-serif-kr',
})

export const metadata: Metadata = {
  title: '아메리카 인종 지도 · 다양성 시뮬레이터',
  description:
    '아메리카 대륙의 민족·인종 구성과 그 역사적 배경을 지도 탐험과 퀴즈 게임으로 학습하는 인터랙티브 웹앱',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#dfe9ee',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${notoSerifKr.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
