import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 로그인 요청인지 확인
  if (request.nextUrl.pathname === '/api/proxy/login' && request.method === 'POST') {
    const clonedReq = request.clone();

    // 원래 요청 실행
    const response = await fetch(clonedReq);

    if (response.ok) {
      const data = await response.json();
      const accessToken = data?.accessToken;

      // access token을 쿠키에 저장
      if (accessToken) {
        const newResponse = new NextResponse(JSON.stringify(data), {
          status: response.status,
          headers: response.headers,
        });

        newResponse.cookies.set({
          name: 'accessToken',
          value: accessToken,
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          path: '/',
          maxAge: 60 * 60,
        });

        return newResponse;
      }

      return response;
    }
  }

  return NextResponse.next();
}
