"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Resume() {
  const router = useRouter();
  const [resume, setResume] = useState<any>(null);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("resume") || "null");
    setResume(saved);
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-neonblue drop-shadow-glow">이력서</h1>
        <button onClick={() => router.push('/resume/edit')} className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500">수정</button>
      </div>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-neonblue">개인 정보</h2>
        <div className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">이름</p>
              <p className="font-medium text-gray-100">{resume?.name || '홍길동'}</p>
            </div>
            <div>
              <p className="text-gray-400">이메일</p>
              <p className="font-medium text-gray-100">{resume?.email || 'example@email.com'}</p>
            </div>
            <div>
              <p className="text-gray-400">전화번호</p>
              <p className="font-medium text-gray-100">{resume?.phone || '010-1234-5678'}</p>
            </div>
            <div>
              <p className="text-gray-400">GitHub</p>
              <p className="font-medium text-gray-100">{resume?.github || 'github.com/username'}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-neonblue">학력</h2>
        <div className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-medium text-neonblue">{resume?.school || '대학교'}</h3>
            <p className="text-gray-100">{resume?.major || '컴퓨터공학과'} | {resume?.schoolPeriod || '2018-2022'}</p>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-neonblue">경력</h2>
        <div className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-medium text-neonblue">{resume?.company || '회사명'}</h3>
            <p className="text-gray-100">{resume?.position || '직책'} | {resume?.workPeriod || '2022-현재'}</p>
            <ul className="list-disc list-inside mt-2 text-gray-100">
              {(resume?.workDesc || '주요 업무 내용 1, 주요 업무 내용 2').split(',').map((item: string, i: number) => <li key={i}>{item.trim()}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-neonblue">기술 스택</h2>
        <div className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <h3 className="font-medium mb-2 text-neonblue">프론트엔드</h3>
              <ul className="text-gray-100">
                {(resume?.frontend || 'React, Next.js, TypeScript').split(',').map((item: string, i: number) => <li key={i}>{item.trim()}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2 text-neonblue">백엔드</h3>
              <ul className="text-gray-100">
                {(resume?.backend || 'Node.js, Express, MongoDB').split(',').map((item: string, i: number) => <li key={i}>{item.trim()}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 