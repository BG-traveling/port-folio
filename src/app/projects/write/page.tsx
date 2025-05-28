"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { value: "project", label: "프로젝트" },
  { value: "blog", label: "블로그" },
  { value: "resume", label: "이력서" },
  { value: "about", label: "자기소개" },
];

export default function ProjectWritePage() {
  const router = useRouter();
  const [category, setCategory] = useState(categories[0].value);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techs, setTechs] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setFileName(f.name);
      const reader = new FileReader();
      reader.onload = (ev) => setFileData(ev.target?.result as string);
      reader.readAsDataURL(f);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setMessage("제목과 설명을 입력해주세요.");
      return;
    }
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const newProject = {
      id: Date.now(),
      category,
      title,
      description,
      techs: techs.split(",").map(t => t.trim()).filter(Boolean),
      file: fileData,
      fileName,
      createdAt: new Date().toISOString(),
      content: description,
    };
    projects.unshift(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));
    router.push("/projects");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">프로젝트 등록</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block mb-1 font-medium">카테고리</label>
          <select className="w-full border rounded px-3 py-2" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">제목</label>
          <input className="w-full border rounded px-3 py-2" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">설명</label>
          <textarea className="w-full border rounded px-3 py-2 min-h-[80px]" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium">기술 (쉼표로 구분)</label>
          <input className="w-full border rounded px-3 py-2" value={techs} onChange={e => setTechs(e.target.value)} placeholder="예: React, Node.js" />
        </div>
        <div>
          <label className="block mb-1 font-medium">파일 첨부 (이미지, PDF, 문서 등)</label>
          <input type="file" accept="image/*,application/pdf,.doc,.docx,.ppt,.pptx,.hwp,.txt" onChange={handleFile} />
          {file && <div className="mt-1 text-sm text-gray-600">첨부: {file.name}</div>}
          {fileData && fileData.startsWith("data:image") && <img src={fileData} alt="미리보기" className="mt-2 max-h-40 rounded" />}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">저장</button>
        {message && <div className="mt-2 text-red-600 font-medium">{message}</div>}
      </form>
    </div>
  );
} 