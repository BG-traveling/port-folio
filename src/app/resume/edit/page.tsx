"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumeEditPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [github, setGithub] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [schoolPeriod, setSchoolPeriod] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [workPeriod, setWorkPeriod] = useState("");
  const [workDesc, setWorkDesc] = useState("");
  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("resume") || "null");
    if (saved) {
      setName(saved.name || "");
      setEmail(saved.email || "");
      setPhone(saved.phone || "");
      setGithub(saved.github || "");
      setSchool(saved.school || "");
      setMajor(saved.major || "");
      setSchoolPeriod(saved.schoolPeriod || "");
      setCompany(saved.company || "");
      setPosition(saved.position || "");
      setWorkPeriod(saved.workPeriod || "");
      setWorkDesc(saved.workDesc || "");
      setFrontend(saved.frontend || "");
      setBackend(saved.backend || "");
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("resume", JSON.stringify({ name, email, phone, github, school, major, schoolPeriod, company, position, workPeriod, workDesc, frontend, backend }));
    router.push("/resume");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">이력서 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-darkcard p-6 rounded-2xl shadow-xl border border-gray-800 animate-fade-in">
        <div>
          <label className="block mb-1 font-medium text-neonblue">이름</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">이메일</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">전화번호</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">GitHub</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={github} onChange={e => setGithub(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">학교</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={school} onChange={e => setSchool(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">전공</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={major} onChange={e => setMajor(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">재학기간</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={schoolPeriod} onChange={e => setSchoolPeriod(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">회사명</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={company} onChange={e => setCompany(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">직책</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={position} onChange={e => setPosition(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">근무기간</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={workPeriod} onChange={e => setWorkPeriod(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">주요 업무</label>
          <textarea className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 min-h-[40px] text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={workDesc} onChange={e => setWorkDesc(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">교육기관 (쉼표로 구분)</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={frontend} onChange={e => setFrontend(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-neonblue">기술 (쉼표로 구분)</label>
          <input className="w-full bg-darkbg border border-gray-700 rounded px-3 py-2 text-gray-100 placeholder-gray-400 focus:ring-neonblue" value={backend} onChange={e => setBackend(e.target.value)} />
        </div>
        <button type="submit" className="w-full bg-gradient-to-r from-neonblue to-neonpurple text-white py-2 rounded-xl font-bold shadow-lg hover:from-neonpurple hover:to-neonblue hover:scale-105 transition-all duration-200 animate-fade-in">저장</button>
      </form>
    </div>
  );
} 