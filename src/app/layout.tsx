import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '포트폴리오',
  description: '개발자 포트폴리오 웹사이트',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className + " bg-gray-50 min-h-screen"}>
        {/* AWS 스타일 네비게이션 */}
        <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
            <Link href="/" className="font-bold text-blue-700 text-xl tracking-tight">포트폴리오</Link>
            <ul className="flex space-x-8 text-base font-medium">
              <li><Link href="/" className="hover:text-blue-600 transition">홈</Link></li>
              <li><Link href="/projects" className="hover:text-blue-600 transition">프로젝트</Link></li>
              <li><Link href="/posts" className="hover:text-blue-600 transition">글 목록</Link></li>
              <li><Link href="/resume" className="hover:text-blue-600 transition">이력서</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 transition">자기소개</Link></li>
            </ul>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto pt-24 px-4 pb-10">
          {children}
        </main>
      </body>
    </html>
  )
} 