"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { FaUserCircle, FaPlus, FaFileAlt } from 'react-icons/fa';

function ProfileIntro({ intro }: { intro: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-2 max-w-xl text-gray-300 text-center md:text-left">
      <div className={expanded ? 'whitespace-pre-line break-words' : 'whitespace-pre-line break-words line-clamp-3'}>
        {intro}
      </div>
      {intro && intro.length > 60 && (
        <button
          className="mt-1 text-neonblue hover:underline text-sm"
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
      <section className="flex flex-col md:flex-row items-center bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-8 mb-8 gap-8 animate-fade-in">
        <div className="flex-shrink-0 flex flex-col items-center md:items-start">
          <FaUserCircle className="text-neonblue text-7xl mb-2 drop-shadow-glow animate-glow" />
          <div className="text-2xl font-bold text-gray-100 mb-1">{resume?.name || '김동환'}</div>
          <ProfileIntro intro={about?.intro || '포트폴리오에 오신 것을 환영합니다.'} />
          <div className="flex gap-2 mt-2">
            <Link href="/projects/write" className="flex items-center bg-gradient-to-r from-neonblue to-neonpurple text-white font-bold py-2 px-4 rounded-xl shadow-lg hover:from-neonpurple hover:to-neonblue hover:scale-105 transition-all duration-200 animate-fade-in"><FaPlus className="mr-2" />프로젝트 등록</Link>
            <Link href="/write" className="flex items-center bg-darkbg text-neonblue font-bold py-2 px-4 rounded-xl border border-neonblue shadow-lg hover:bg-darkcard hover:scale-105 transition-all duration-200 animate-fade-in"><FaPlus className="mr-2" />글 작성</Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center md:items-start mt-8 md:mt-0">
          <h1 className="text-4xl font-bold mb-2 text-neonblue drop-shadow-glow">안녕하세요!</h1>
          <p className="text-lg text-gray-200">{resume?.name || '김동환'}의 포트폴리오에 오신 것을 환영합니다.</p>
        </div>
      </section>

      {/* 주요 프로젝트 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-neonblue drop-shadow-glow">주요 프로젝트</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 && <div className="text-gray-500 col-span-3">등록된 프로젝트가 없습니다.</div>}
          {projects.map((project, i) => (
            <div key={project.id} className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6 flex flex-col animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="font-semibold text-lg mb-2 truncate text-neonblue">{project.title}</div>
              <div className="text-gray-200 mb-2 line-clamp-2">{project.description}</div>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.techs?.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 bg-darkbg text-neonblue rounded-full text-xs font-semibold border border-neonblue/30">{tech}</span>
                ))}
              </div>
              {project.file && project.file.startsWith("data:image") && <img src={project.file} alt="썸네일" className="rounded mb-2 max-h-32 object-cover border border-neonblue" />}
              <Link href={`/projects/${project.id}`} className="mt-auto text-neonblue hover:underline font-medium">자세히 보기 →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 기술 스택 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-neonblue drop-shadow-glow">기술 스택</h2>
        <div className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6 animate-fade-in">
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
        <h2 className="text-2xl font-bold mb-4 text-neonblue drop-shadow-glow">최근 글</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length === 0 && <div className="text-gray-500 col-span-3">작성된 글이 없습니다.</div>}
          {posts.map((post, i) => (
            <div key={post.id} className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6 flex flex-col animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="font-semibold text-lg mb-2 truncate text-neonblue">{post.title}</div>
              <div className="text-gray-400 text-sm mb-2">{new Date(post.createdAt || post.id).toLocaleDateString()}</div>
              <div className="flex-1 text-gray-200 line-clamp-2 mb-2">{post.content}</div>
              {post.file && post.file.startsWith("data:image") && <img src={post.file} alt="썸네일" className="rounded mb-2 max-h-32 object-cover border border-neonblue" />}
              <Link href={`/posts/${post.id}`} className="mt-auto text-neonblue hover:underline font-medium flex items-center"><FaFileAlt className="mr-1" />자세히 보기</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
} 