import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  if (!accessToken) {
    return NextResponse.next();
  }

  // 원래 요청의 헤더를 수정
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('Authorization', `Bearer ${accessToken}`);

  // 요청을 리라이트하여 Authorization 헤더 포함
  return NextResponse.rewrite(req.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}

// 특정 경로에만 미들웨어 적용
export const config = {
  matcher: '/api/:path*', // API 요청에만 적용
};
