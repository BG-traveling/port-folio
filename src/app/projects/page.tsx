"use client";
import Link from 'next/link'
import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projects") || "[]");
    if (saved) setProjects(saved);
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-neonblue drop-shadow-glow">프로젝트</h1>
        <Link href="/projects/write" className="bg-gradient-to-r from-neonblue to-neonpurple text-white px-4 py-2 rounded-xl shadow-lg hover:from-neonpurple hover:to-neonblue hover:scale-105 transition-all duration-200 animate-fade-in font-bold">+ 새 프로젝트</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  )
} 