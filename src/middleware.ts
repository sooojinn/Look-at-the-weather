import { NextRequest, NextResponse } from 'next/server';

// 미로그인 사용자 접근 제한 경로
const protectedRoutes = [
  '/post-write',
  '/post/edit',
  '/post/report',
  '/profile-edit',
  '/mypage/mypost',
  '/mypage/like',
  '/delete-account',
];

// 로그인 사용자 접근 제한 경로
const restrictedRoutesForLoggedInUser = ['/login', '/signup', '/find-email', '/find-password', '/password-reset'];

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const { pathname } = req.nextUrl;
  const isLogin = Boolean(accessToken);

  // API 요청인 경우: Authorization 헤더 주입
  if (pathname.startsWith('/api')) {
    if (!accessToken) {
      return NextResponse.next();
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);

    return NextResponse.rewrite(req.nextUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 로그인 보호 경로에 미로그인 접근 시 로그인 페이지로 이동
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !isLogin) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 로그인 유저가 로그인/회원가입 등의 페이지 접근 시 홈으로 리디렉션
  const isRestrictedProuteForLoggedInUser = restrictedRoutesForLoggedInUser.some((route) => pathname.startsWith(route));

  if (isLogin && isRestrictedProuteForLoggedInUser) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/post-write',
    '/post/edit',
    '/post/report',
    '/profile-edit',
    '/mypage/mypost',
    '/mypage/like',
    '/delete-account',
    '/login',
    '/signup',
    '/find-email',
    '/find-password',
    '/password-reset',
  ],
};
