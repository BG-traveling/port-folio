"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  const [about, setAbout] = useState<any>(null);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("about") || "null");
    setAbout(saved);
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-neonblue drop-shadow-glow">자기소개</h1>
        <button onClick={() => router.push('/about/edit')} className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500">수정</button>
      </div>
      <section className="mb-8">
        <div className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-2 text-neonblue">소개</h2>
          <p className="text-gray-100 whitespace-pre-line break-words">{about?.intro || '안녕하세요! 저는 웹 개발자입니다. 사용자 경험을 중요시하며, 항상 새로운 기술을 배우고 적용하는 것을 좋아합니다.'}</p>
        </div>
      </section>
      <section className="mb-8">
        <div className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-2 text-neonblue">목표</h2>
          <ul className="list-disc list-inside text-gray-100 space-y-2">
            {(about?.goals || '사용자 중심의 웹 애플리케이션 개발, 최신 기술 트렌드 학습 및 적용, 팀 프로젝트에서의 효과적인 협업').split(',').map((goal: string, i: number) => <li key={i}>{goal.trim()}</li>)}
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <div className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-2 text-neonblue">관심사</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2 text-neonblue">기술적 관심사</h3>
              <ul className="text-gray-100">
                {(about?.techInterests || '웹 성능 최적화, 반응형 디자인, 클라우드 서비스').split(',').map((item: string, i: number) => <li key={i}>{item.trim()}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2 text-neonblue">개인적 관심사</h3>
              <ul className="text-gray-100">
                {(about?.personalInterests || '독서, 여행, 사진 촬영').split(',').map((item: string, i: number) => <li key={i}>{item.trim()}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-2 text-neonblue">연락처</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">이메일</p>
              <p className="font-medium text-gray-100">{about?.email || 'example@email.com'}</p>
            </div>
            <div>
              <p className="text-gray-400">GitHub</p>
              <p className="font-medium text-gray-100">{about?.github || 'github.com/username'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 