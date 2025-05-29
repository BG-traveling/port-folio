"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { FaUserCircle, FaPlus, FaFileAlt } from 'react-icons/fa';

function ProfileIntro({ intro }: { intro: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-2 max-w-xl text-gray-600 text-center md:text-left">
      <div className={expanded ? 'whitespace-pre-line break-words' : 'whitespace-pre-line break-words line-clamp-3'}>
        {intro}
      </div>
      {intro && intro.length > 60 && (
        <button
          className="mt-1 text-blue-600 hover:underline text-sm"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? '접기' : '더보기'}
        </button>
      )}
    </div>
  );
}

export default function Home() {
  // 최근 프로젝트, 기술스택, 최근 글 불러오기
  const [projects, setProjects] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [about, setAbout] = useState<any>(null);
  const [resume, setResume] = useState<any>(null);

  useEffect(() => {
    setProjects((JSON.parse(localStorage.getItem("projects") || "[]") as any[]).slice(0, 3));
    setPosts((JSON.parse(localStorage.getItem("posts") || "[]") as any[]).slice(0, 3));
    setAbout(JSON.parse(localStorage.getItem("about") || "null"));
    setResume(JSON.parse(localStorage.getItem("resume") || "null"));
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero/Profile Section */}
      <section className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md border border-gray-200 p-8 mb-8 gap-8">
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <FaUserCircle className="text-blue-400 text-7xl mb-2" />
          <div className="text-2xl font-bold text-gray-800 mb-1">{resume?.name || '김동현'}</div>
          <ProfileIntro intro={about?.intro || '포트폴리오에 오신 것을 환영합니다.'} />
          <div className="flex gap-2 mt-2">
            <Link href="/projects/write" className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition"><FaPlus className="mr-2" />프로젝트 등록</Link>
            <Link href="/write" className="flex items-center bg-gray-100 hover:bg-blue-50 text-blue-700 font-bold py-2 px-4 rounded-lg border border-blue-200 shadow transition"><FaPlus className="mr-2" />글 작성</Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start mt-8 md:mt-0">
          <h1 className="text-4xl font-bold mb-2 text-blue-700">안녕하세요!</h1>
          <p className="text-lg text-gray-700">{resume?.name || '김동현'}의 포트폴리오에 오신 것을 환영합니다.</p>
        </div>
      </section>

      {/* 주요 프로젝트 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">주요 프로젝트</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 && <div className="text-gray-400 col-span-3">등록된 프로젝트가 없습니다.</div>}
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col">
              <div className="font-semibold text-lg mb-2 truncate">{project.title}</div>
              <div className="text-gray-600 mb-2 line-clamp-2">{project.description}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.techs?.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold border border-blue-100">{tech}</span>
                ))}
              </div>
              {project.file && project.file.startsWith("data:image") && <img src={project.file} alt="썸네일" className="rounded mb-2 max-h-32 object-cover" />}
              <Link href={`/projects/${project.id}`} className="mt-auto text-blue-600 hover:underline font-medium">자세히 보기 →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 기술 스택 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">기술 스택</h2>
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="relative w-full aspect-[3/4]">
            <img 
              src="/skills.png" 
              alt="기술 스택 상세" 
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* 최근 글 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">최근 글</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length === 0 && <div className="text-gray-400 col-span-3">작성된 글이 없습니다.</div>}
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col">
              <div className="font-semibold text-lg mb-2 truncate">{post.title}</div>
              <div className="text-gray-500 text-sm mb-2">{new Date(post.createdAt || post.id).toLocaleDateString()}</div>
              <div className="flex-1 text-gray-700 line-clamp-2 mb-2">{post.content}</div>
              {post.file && post.file.startsWith("data:image") && <img src={post.file} alt="썸네일" className="rounded mb-2 max-h-32 object-cover" />}
              <Link href={`/posts/${post.id}`} className="mt-auto text-blue-600 hover:underline font-medium flex items-center"><FaFileAlt className="mr-1" />자세히 보기</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 