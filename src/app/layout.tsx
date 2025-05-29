import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { FaUserCircle, FaPlus, FaFileAlt } from 'react-icons/fa';
import DeployButton from '../components/DeployButton';

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
      <body className={`${inter.className} bg-darkbg text-gray-100 min-h-screen`}>
        <div className="container mx-auto px-4 py-8">
          <nav className="flex justify-between items-center mb-8">
            <Link href="/" className="text-2xl font-bold text-neonblue drop-shadow-glow">포트폴리오</Link>
            <div className="flex gap-4">
              <Link href="/projects" className="text-gray-300 hover:text-neonblue transition-colors">프로젝트</Link>
              <Link href="/posts" className="text-gray-300 hover:text-neonblue transition-colors">글</Link>
              <Link href="/about" className="text-gray-300 hover:text-neonblue transition-colors">소개</Link>
              <Link href="/resume" className="text-gray-300 hover:text-neonblue transition-colors">이력서</Link>
              <DeployButton />
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  )
} 