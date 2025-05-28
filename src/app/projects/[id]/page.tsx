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
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <div className="space-x-2">
          <button onClick={() => router.push(`/projects/${project.id}/edit`)} className="px-3 py-1 bg-yellow-400 text-white rounded">수정</button>
          <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded">삭제</button>
        </div>
      </div>
      <div className="mb-2 text-gray-600">{project.description}</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.techs?.map((tech: string) => (
          <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{tech}</span>
        ))}
      </div>
      {project.image && <img src={project.image} alt="프로젝트 이미지" className="mb-4 max-h-64 rounded" />}
      <div className="text-gray-800 whitespace-pre-line mb-8">{project.content}</div>
      <a href="/projects" className="text-blue-600 hover:underline">← 프로젝트 목록으로</a>
    </div>
  );
} 