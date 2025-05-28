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
        <h1 className="text-4xl font-bold">프로젝트</h1>
        <Link href="/projects/write" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ 새 프로젝트</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techs?.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{tech}</span>
                ))}
              </div>
              {project.image && <img src={project.image} alt="프로젝트 이미지" className="mb-2 max-h-32 rounded" />}
              <Link href={`/projects/${project.id}`} className="text-blue-600 hover:text-blue-800">
                자세히 보기 →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 