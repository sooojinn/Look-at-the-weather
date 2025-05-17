import { BASEURL } from '@/config/constants';
import { NextRequest, NextResponse } from 'next/server';

async function proxyRequest(req: NextRequest) {
  try {
    const { method } = req;
    const { pathname, search } = req.nextUrl;
    const apiUrl = `${BASEURL}${pathname.replace('/api', '')}${search}`;

    const contentType = req.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const isFile = contentType.includes('multipart/form-data');

    const headers = new Headers(req.headers);
    headers.delete('host');
    headers.delete('content-length');

    let body: any = undefined;

    if (method !== 'GET' && method !== 'HEAD') {
      if (isFile) {
        body = await req.formData();
        headers.delete('content-type'); // FormData 사용 시 수동 설정 금지
      } else if (isJson) {
        const json = await req.json();
        body = JSON.stringify(json);
        headers.set('content-type', 'application/json'); // 명시적 설정
      }
    }

    const response = await fetch(apiUrl, {
      method,
      headers,
      credentials: 'include',
      body,
    });

    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : null;

    const proxyResponse = NextResponse.json(responseData, { status: response.status });

    const setCookie = response.headers.get('set-cookie');
    if (setCookie) {
      proxyResponse.headers.set('set-cookie', setCookie);
    }

    return proxyResponse;
  } catch (error) {
    console.error('프록시 처리 에러:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
export const PUT = proxyRequest;
export const DELETE = proxyRequest;
export const PATCH = proxyRequest;
