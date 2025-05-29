"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ProjectDetail() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projects") || "[]");
    const found = saved.find((p: any) => String(p.id) === String(params.id));
    setProject(found);
  }, [params.id]);

  if (!project) return <div className="container mx-auto px-4 py-8 max-w-2xl">프로젝트를 찾을 수 없습니다.</div>;

  const handleDelete = () => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const saved = JSON.parse(localStorage.getItem("projects") || "[]");
    if (saved) {
      const filtered = saved.filter((p: any) => String(p.id) !== String(params.id));
      localStorage.setItem("projects", JSON.stringify(filtered));
    }
    router.push("/projects");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-neonblue drop-shadow-glow">{project.title}</h1>
        <div className="space-x-2">
          <button onClick={() => router.push(`/projects/${project.id}/edit`)} className="px-3 py-1 bg-gradient-to-r from-neonblue to-neonpurple text-white rounded-xl shadow-lg hover:from-neonpurple hover:to-neonblue hover:scale-105 transition-all duration-200 font-bold">수정</button>
          <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 hover:scale-105 transition-all duration-200 font-bold">삭제</button>
        </div>
      </div>
      <div className="mb-2 text-gray-200">{project.description}</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techs?.map((tech: string) => (
          <span key={tech} className="px-3 py-1 bg-darkbg text-neonblue rounded-full text-xs font-semibold border border-neonblue/30">{tech}</span>
        ))}
      </div>
      {project.file && project.file.startsWith("data:image") && <img src={project.file} alt="프로젝트 이미지" className="mb-4 max-h-64 rounded border border-neonblue" />}
      <div className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6 mb-8">
        <div className="text-gray-100 whitespace-pre-line">{project.content}</div>
      </div>
      <a href="/projects" className="text-neonblue hover:underline">← 프로젝트 목록으로</a>
    </div>
  );
} 