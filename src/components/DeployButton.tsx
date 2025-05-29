'use client';
import { FaRocket } from 'react-icons/fa';

export default function DeployButton() {
  const handleDeploy = async () => {
    try {
      const response = await fetch('/api/deploy', { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        alert('배포가 시작되었습니다! 잠시 후 웹사이트가 업데이트됩니다.');
      } else {
        alert('배포 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('배포 요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <button
      onClick={handleDeploy}
      className="flex items-center gap-2 bg-gradient-to-r from-neonblue to-neonpurple text-white px-4 py-2 rounded-xl shadow-lg hover:from-neonpurple hover:to-neonblue hover:scale-105 transition-all duration-200 animate-fade-in"
    >
      <FaRocket /> 배포하기
    </button>
  );
} 