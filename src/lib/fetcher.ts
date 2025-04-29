import { cookies } from 'next/headers';

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  // 쿠키에 저장된 토큰 불러오기
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const headers = new Headers(init?.headers);

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  // Content-Type 기본값 설정
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(input, {
    ...init,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status}`);
  }

  return response.json();
}
