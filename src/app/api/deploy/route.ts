import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // GitHub Personal Access Token을 환경 변수에서 가져옵니다
    const token = process.env.PERSONAL_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      return NextResponse.json({ success: false, error: 'Missing environment variables' }, { status: 500 });
    }

    // GitHub API를 호출하여 워크플로우를 트리거합니다
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'deploy',
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to trigger deployment');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Deployment error:', error);
    return NextResponse.json({ success: false, error: 'Deployment failed' }, { status: 500 });
  }
} 