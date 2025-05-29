"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ProjectEditPage() {
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techs, setTechs] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("projects") || "[]");
    const found = saved.find((p: any) => String(p.id) === String(params.id));
    if (found) {
      setTitle(found.title);
      setDescription(found.description);
      setTechs(found.techs?.join(", ") || "");
      setImage(found.image || null);
    }
  }, [params.id]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setMessage("제목과 설명을 입력해주세요.");
      return;
    }
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const idx = projects.findIndex((p: any) => String(p.id) === String(params.id));
    if (idx === -1) {
      setMessage("프로젝트를 찾을 수 없습니다.");
      return;
    }
    projects[idx] = {
      ...projects[idx],
      title,
      description,
      techs: techs.split(",").map((t: string) => t.trim()).filter(Boolean),
      image,
      content: description,
    };
    localStorage.setItem("projects", JSON.stringify(projects));
    router.push(`/projects/${params.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">프로젝트 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-darkcard p-6 rounded-2xl shadow-xl border border-gray-800 animate-fade-in">
        <div>
          <label className="block mb-1 font-medium text-neonblue">제목</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">설명</label>
          <textarea className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 min-h-[80px] text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">기술 (쉼표로 구분)</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={techs} onChange={e => setTechs(e.target.value)} placeholder="예: React, Node.js" />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">이미지 첨부 (선택)</label>
          <input type="file" accept="image/*" onChange={handleImage} className="text-gray-100" />
          {image && <img src={image} alt="미리보기" className="mt-2 max-h-40 rounded border border-neonblue" />}
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-neonblue to-neonpurple text-white py-2 rounded-xl font-bold shadow-lg hover:from-neonpurple hover:to-neonblue hover:scale-105 transition-all duration-200 animate-fade-in">저장</button>
        {message && <div className="mt-2 text-red-400 font-medium">{message}</div>}
      </form>
    </div>
  );
} 