import { HttpResponse, http } from 'msw';
import { BASEURL } from '../constants/constants';

type EmailFindRequestBody = {
  name: string;
  nickname: string;
};

type PasswordFindRequestBody = {
  name: string;
  nickname: string;
  email: string;
};

type LoginRequestBody = {
  email: string;
  password: string;
};

type EmailVerifyRequestBody = {
  email: string;
  code: string;
};

export const handlers = [
  // 회원가입
  http.post(`${BASEURL}/api/v1/users/register`, async () => {
    return HttpResponse.json({
      success: true,
      message: '회원가입 완료',
    });
  }),
  // 이메일 인증
  http.post(`${BASEURL}/api/v1/email/send-verification`, async () => {
    return HttpResponse.json({
      success: true,
      message: '이메일로 코드를 발송하였습니다.',
    });
  }),
  // 이메일 발송성공
  http.post(`${BASEURL}/api/v1/email/verify-code`, async ({ request }) => {
    const result = (await request.json()) as EmailVerifyRequestBody;
    const email = result?.email;
    const code = result?.code;
    if (email === 'test123@naver.com' && code === '123456') {
      return HttpResponse.json(
        {
          success: true,
          message: '이메일 검증이 완료되었습니다',
        },
        { status: 200 },
      );
    } else {
      return HttpResponse.json(
        {
          errorCode: 'FAIL_EMAIL_VERIFICATION',
          errorMessage: '이메일 검증이 실패하였습니다.',
        },
        { status: 400 },
      );
    }
  }),
  //닉네임 중복확인
  http.get(`${BASEURL}/api/v1/users/nickname-check/:nickname`, async ({ request }) => {
    const url = new URL(request.url);
    const nickname = url.pathname.split('/').pop() as string;
    const existingNicknames = ['우승찬', '김양선', '박서연', ''];
    const isAvailable = !existingNicknames.includes(nickname);

    if (isAvailable) {
      return HttpResponse.json({
        isAvailable: true,
        message: '사용가능한 닉네임입니다.',
      });
    } else {
      return HttpResponse.json({
        isAvailable: false,
        message: '이미 사용 중인 닉네임입니다.',
      });
    }
  }),
  //이메일 찾기
  http.post(`${BASEURL}/api/v1/users/email`, async ({ request }) => {
    const result = (await request.json()) as EmailFindRequestBody;

    const name = result?.name;
    const nickname = result?.nickname;

    if (name === '우승찬' && nickname === '아이스베어') {
      return HttpResponse.json({
        email: 'test123@naver.com',
      });
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: '일치하는 사용자가 없습니다.',
      });
    }
  }),
  //비밀번호 찾기
  http.post(`${BASEURL}/api/v1/users/password`, async ({ request }) => {
    const result = (await request.json()) as PasswordFindRequestBody;

    const email = result?.email;
    const name = result?.name;
    const nickname = result?.nickname;

    if (email === 'test123@naver.com' && name === '우승찬' && nickname === '아이스베어') {
      return new HttpResponse(
        JSON.stringify({
          success: true,
          message: '일치하는 계정이 있습니다.',
        }),
        {
          status: 200,
        },
      );
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: '일치하는 계정이 없습니다.',
      });
    }
  }),
  // 로그인
  http.post(`${BASEURL}/api/v1/auth/login`, async ({ request }) => {
    const data = {
      accessToken: '12345',
      refreshToken: '1234',
    };

    const result = (await request.json()) as LoginRequestBody;

    const email = result?.email;
    const password = result?.password;

    if (email === 'test123@naver.com' && password === '123123123') {
      return new HttpResponse(JSON.stringify(data), {
        status: 200,
      });
    } else {
      return new HttpResponse(null, {
        status: 400,
        statusText: `login_faild`,
      });
    }
  }),
];
