"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaFileAlt, FaFileImage, FaFilePdf, FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const categories = [
  { value: "all", label: "전체" },
  { value: "project", label: "프로젝트" },
  { value: "resume", label: "이력서" },
  { value: "about", label: "자기소개" },
];

export default function PostsPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("all");
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    // posts, projects, resume, about을 모두 통합해서 보여줌
    const postsArr = JSON.parse(localStorage.getItem("posts") || "[]");
    const projectsArr = JSON.parse(localStorage.getItem("projects") || "[]");
    const resumeArr = JSON.parse(localStorage.getItem("resume") || "null");
    const aboutArr = JSON.parse(localStorage.getItem("about") || "null");
    const all = [
      ...postsArr,
      ...projectsArr.map((p: any) => ({
        ...p,
        category: "project",
        file: p.file || p.image || null,
        fileName: p.fileName || p.title + (p.image ? ".png" : "")
      })),
    ];
    if (resumeArr) {
      all.push({
        id: "resume",
        title: "이력서",
        content: resumeArr,
        category: "resume",
        createdAt: resumeArr.updatedAt || resumeArr.createdAt || Date.now(),
      });
    }
    if (aboutArr) {
      all.push({
        id: "about",
        title: "자기소개",
        content: aboutArr,
        category: "about",
        createdAt: aboutArr.updatedAt || aboutArr.createdAt || Date.now(),
      });
    }
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

  // 글 삭제
  const handleDelete = (id: any, category: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    if (category === "project") {
      const arr = JSON.parse(localStorage.getItem("projects") || "[]");
      const filtered = arr.filter((p: any) => String(p.id) !== String(id));
      localStorage.setItem("projects", JSON.stringify(filtered));
    } else if (category === "resume") {
      localStorage.removeItem("resume");
    } else if (category === "about") {
      localStorage.removeItem("about");
    } else {
      const arr = JSON.parse(localStorage.getItem("posts") || "[]");
      const filtered = arr.filter((p: any) => String(p.id) !== String(id));
      localStorage.setItem("posts", JSON.stringify(filtered));
    }
    setPosts((prev: any[]) => prev.filter((p) => String(p.id) !== String(id)));
  };

  // 글 수정 (카테고리별로 경로 다름)
  const handleEdit = (id: any, category: string) => {
    if (category === "project") {
      router.push(`/projects/${id}/edit`);
    } else if (category === "resume") {
      router.push(`/resume/edit`);
    } else if (category === "about") {
      router.push(`/about/edit`);
    } else {
      router.push(`/posts/${id}/edit`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">글 목록</h1>
        <button
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow transition"
          onClick={() => router.push('/write')}
        >
          <FaPlus className="mr-2" /> 글 작성
        </button>
      </div>
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
              <Link href={post.category === 'project' ? `/projects/${post.id}` : post.category === 'resume' ? '/resume' : post.category === 'about' ? '/about' : `/posts/${post.id}`} className="text-lg font-semibold text-blue-700 hover:underline truncate block">
                [{categories.find(c => c.value === post.category)?.label}] {post.title}
              </Link>
              <div className="text-sm text-gray-500 mt-1">{new Date(post.createdAt || post.id).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2 mt-2 md:mt-0 md:ml-4">
              {/* 파일 아이콘/미리보기 */}
              {post.file && (
                <>
                  {getFileIcon(post.file)}
                  {post.file.startsWith("data:image") ? (
                    <img src={post.file} alt="첨부" className="w-10 h-10 object-cover rounded ml-1 border" />
                  ) : (
                    <a href={post.file} download={post.fileName} className="text-blue-600 underline ml-1">{post.fileName || "첨부파일"}</a>
                  )}
                </>
              )}
              {/* 수정/삭제 버튼 */}
              <button
                className="p-2 rounded hover:bg-blue-50 text-blue-600"
                title="수정"
                onClick={() => handleEdit(post.id, post.category)}
              >
                <FaEdit />
              </button>
              <button
                className="p-2 rounded hover:bg-red-50 text-red-600"
                title="삭제"
                onClick={() => handleDelete(post.id, post.category)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 