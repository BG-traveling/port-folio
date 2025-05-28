"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AboutEditPage() {
  const router = useRouter();
  const [intro, setIntro] = useState("");
  const [goals, setGoals] = useState("");
  const [techInterests, setTechInterests] = useState("");
  const [personalInterests, setPersonalInterests] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("about") || "null");
    if (saved) {
      setIntro(saved.intro || "");
      setGoals(saved.goals || "");
      setTechInterests(saved.techInterests || "");
      setPersonalInterests(saved.personalInterests || "");
      setEmail(saved.email || "");
      setGithub(saved.github || "");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("about", JSON.stringify({ intro, goals, techInterests, personalInterests, email, github }));
    router.push("/about");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">자기소개 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block mb-1 font-medium">소개</label>
          <textarea className="w-full border rounded px-3 py-2 min-h-[60px]" value={intro} onChange={e => setIntro(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium">목표</label>
          <textarea className="w-full border rounded px-3 py-2 min-h-[40px]" value={goals} onChange={e => setGoals(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium">기술적 관심사 (쉼표로 구분)</label>
          <input className="w-full border rounded px-3 py-2" value={techInterests} onChange={e => setTechInterests(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium">개인적 관심사 (쉼표로 구분)</label>
          <input className="w-full border rounded px-3 py-2" value={personalInterests} onChange={e => setPersonalInterests(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium">이메일</label>
          <input className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium">GitHub</label>
          <input className="w-full border rounded px-3 py-2" value={github} onChange={e => setGithub(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">저장</button>
      </form>
    </div>
  );
} 