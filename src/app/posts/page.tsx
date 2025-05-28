"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFileAlt, FaFileImage, FaFilePdf } from "react-icons/fa";

const categories = [
  { value: "all", label: "전체" },
  { value: "project", label: "프로젝트" },
  { value: "blog", label: "블로그" },
  { value: "resume", label: "이력서" },
  { value: "about", label: "자기소개" },
];

export default function PostsPage() {
  const [selected, setSelected] = useState("all");
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // posts와 projects를 합쳐서 보여줌
    const postsArr = JSON.parse(localStorage.getItem("posts") || "[]");
    const projectsArr = JSON.parse(localStorage.getItem("projects") || "[]");
    const all = [
      ...postsArr,
      ...projectsArr.map((p: any) => ({
        ...p,
        category: "project",
        file: p.file || p.image || null,
        fileName: p.fileName || p.title + (p.image ? ".png" : "")
      })),
    ];
    all.sort((a, b) => (b.createdAt || b.id) - (a.createdAt || a.id));
    setPosts(all);
  }, []);

  const filtered = selected === "all"
    ? posts
    : posts.filter((p) => p.category === selected);

  const getFileIcon = (file: string) => {
    if (!file) return null;
    if (file.startsWith("data:image")) return <FaFileImage className="inline mr-1 text-blue-400" />;
    if (file.startsWith("data:application/pdf")) return <FaFilePdf className="inline mr-1 text-red-500" />;
    return <FaFileAlt className="inline mr-1 text-gray-500" />;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">글 목록</h1>
      <div className="flex space-x-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`px-4 py-2 rounded-full border transition-colors duration-150 ${selected === cat.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}`}
            onClick={() => setSelected(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <ul className="space-y-4">
        {filtered.length === 0 && <li className="text-gray-500">글이 없습니다.</li>}
        {filtered.map((post) => (
          <li key={post.id} className="bg-white rounded-xl shadow p-5 flex flex-col md:flex-row md:items-center md:justify-between border hover:shadow-lg transition-shadow">
            <div className="flex-1 min-w-0">
              <Link href={post.category === 'project' ? `/projects/${post.id}` : `/posts/${post.id}`} className="text-lg font-semibold text-blue-700 hover:underline truncate block">
                [{categories.find(c => c.value === post.category)?.label}] {post.title}
              </Link>
              <div className="text-sm text-gray-500 mt-1">{new Date(post.createdAt || post.id).toLocaleString()}</div>
            </div>
            {post.file && (
              <div className="mt-2 md:mt-0 md:ml-4 flex items-center">
                {getFileIcon(post.file)}
                {post.file.startsWith("data:image") ? (
                  <img src={post.file} alt="첨부" className="w-10 h-10 object-cover rounded ml-1 border" />
                ) : (
                  <a href={post.file} download={post.fileName} className="text-blue-600 underline ml-1">{post.fileName || "첨부파일"}</a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 