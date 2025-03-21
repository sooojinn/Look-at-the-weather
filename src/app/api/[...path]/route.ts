import { BASEURL } from '@/config/constants';
import { NextRequest, NextResponse } from 'next/server';

async function proxyRequest(req: NextRequest) {
  try {
    const { method } = req;
    const { pathname, search } = req.nextUrl;
    const apiUrl = `${BASEURL}${pathname.replace('/api', '')}${search}`;

    const headers = req.headers;
    const isJson = headers.get('content-type')?.includes('application/json');
    const hasBody = headers.get('content-length');

    let body: any = null;
    if (method !== 'GET' && method !== 'HEAD' && isJson && hasBody) {
      try {
        body = await req.json();
      } catch {
        console.warn('요청 본문 JSON 파싱 실패');
      }
    }

    const response = await fetch(apiUrl, {
      method,
      headers,
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseText = await response.text();

    let responseData: any = null;
    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch {
      console.warn('응답 JSON 파싱 실패, 원본 텍스트 반환:', responseText);
      responseData = responseText;
    }

    const proxyResponse = NextResponse.json(responseData, { status: response.status });

    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      proxyResponse.headers.set('set-cookie', setCookie);
    }

    return proxyResponse;
  } catch (error) {
    console.error('프록시 처리 에러:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const PATCH = proxyRequest;
