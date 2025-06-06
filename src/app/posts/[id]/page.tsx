"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const categories = {
  project: "프로젝트",
  blog: "블로그",
  resume: "이력서",
  about: "자기소개",
};

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const found = posts.find((p: any) => String(p.id) === String(params.id));
    setPost(found);
  }, [params.id]);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <div className="text-gray-500">글을 찾을 수 없습니다.</div>
        <button className="mt-4 px-4 py-2 bg-gradient-to-r from-neonblue to-neonpurple text-white rounded-xl shadow-lg hover:from-neonpurple hover:to-neonblue hover:scale-105 transition-all duration-200 font-bold" onClick={() => router.push('/posts')}>목록으로</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <button className="mb-4 px-4 py-2 bg-darkcard text-neonblue rounded-xl shadow hover:bg-darkbg hover:scale-105 transition-all duration-200 font-bold" onClick={() => router.push('/posts')}>← 목록으로</button>
      <div className="bg-darkcard rounded-2xl shadow-xl border border-gray-800 p-6">
        <div className="mb-2 text-sm text-neonblue">{categories[post.category] || post.category} | {new Date(post.createdAt).toLocaleString()}</div>
        <h1 className="text-2xl font-bold mb-4 text-neonblue drop-shadow-glow">{post.title}</h1>
        <div className="mb-6 whitespace-pre-line text-gray-100">{post.content}</div>
        {post.file && (
          <div className="mt-4">
            <div className="font-medium mb-2 text-neonblue">첨부파일:</div>
            {post.file.startsWith("data:image") ? (
              <img src={post.file} alt={post.fileName} className="max-w-full max-h-64 border border-neonblue rounded mb-2" />
            ) : (
              <a href={post.file} download={post.fileName} className="text-neonblue underline">{post.fileName} 다운로드</a>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 