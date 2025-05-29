"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      const reader = new FileReader();
      reader.onload = (ev) => setFileData(ev.target?.result as string);
      reader.readAsDataURL(f);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage("제목과 내용을 입력해주세요.");
      return;
    }

    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const newPost = {
      id: Date.now(),
      title,
      content,
      file: fileData,
      createdAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    router.push("/posts");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">글 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-darkcard p-6 rounded-2xl shadow-xl border border-gray-800 animate-fade-in">
        <div>
          <label className="block mb-1 font-medium text-neonblue">제목</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">내용</label>
          <textarea className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 min-h-[200px] text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">파일 첨부 (이미지)</label>
          <input type="file" accept="image/*" onChange={handleFile} className="text-gray-100" />
          {fileData && fileData.startsWith("data:image") && (
            <img src={fileData} alt="미리보기" className="mt-2 max-h-40 rounded border border-neonblue" />
          )}
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-neonblue to-neonpurple text-white py-2 rounded-xl font-bold shadow-lg hover:from-neonpurple hover:to-neonblue hover:scale-105 transition-all duration-200 animate-fade-in">저장</button>
        {message && <div className="mt-2 text-red-400 font-medium">{message}</div>}
      </form>
    </div>
  );
} 