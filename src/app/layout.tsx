import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { FaUserCircle, FaPlus, FaFileAlt, FaRocket } from 'react-icons/fa';

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
  const handleDeploy = async () => {
    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.success) {
        alert('배포가 시작되었습니다! 잠시 후 웹사이트가 업데이트됩니다.');
      } else {
        alert('배포 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('배포 요청 중 오류가 발생했습니다.');
    }
  };

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
              <button 
                onClick={handleDeploy}
                className="flex items-center gap-2 bg-gradient-to-r from-neonblue to-neonpurple text-white px-4 py-2 rounded-xl shadow-lg hover:from-neonpurple hover:to-neonblue hover:scale-105 transition-all duration-200 animate-fade-in"
              >
                <FaRocket /> 배포하기
              </button>
            </div>
          </nav>
          {children}
        </div>
      </body>
    </html>
  )
} 