import { BASEURL } from '@/config/constants';
import { NextRequest, NextResponse } from 'next/server';

async function proxyRequest(req: NextRequest) {
  try {
    const { method, headers } = req;
    const pathname = req.nextUrl.pathname.replace('/api', '');
    const query = req.nextUrl.search;
    const apiUrl = `${BASEURL}${pathname}${query}`;

    let body = null;
    if (method !== 'GET' && method !== 'HEAD') {
      body = await req.json();
    }

    const response = await fetch(apiUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'include',
    });

    console.log(apiUrl);

    const responseText = await response.text();
    let responseData = null;

    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch {
      console.warn('JSON 파싱 실패, 응답을 그대로 반환:', responseText);
    }

    const proxyResponse = NextResponse.json(responseData, { status: response.status });

    // Set-Cookie 헤더를 클라이언트에 수동으로 설정
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      proxyResponse.headers.set('set-cookie', setCookie);
    }

    return proxyResponse;
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return proxyRequest(req);
}
export async function POST(req: NextRequest) {
  return proxyRequest(req);
}
export async function PUT(req: NextRequest) {
  return proxyRequest(req);
}
export async function DELETE(req: NextRequest) {
  return proxyRequest(req);
}
export async function PATCH(req: NextRequest) {
  return proxyRequest(req);
}
