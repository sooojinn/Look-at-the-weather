import { BASEURL } from '@/config/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function proxyRequest(req: NextRequest) {
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
    });

    console.log(apiUrl);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(errorData, { status: response.status });
    }

    const responseText = await response.text(); // 응답 본문을 문자열로 가져옴
    let responseData = null;

    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch (error) {
      console.warn('⚠️ JSON 파싱 실패, 응답을 그대로 반환:', responseText);
    }
    return NextResponse.json(responseData, { status: response.status });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// ✅ HTTP 메서드별 API Route
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
