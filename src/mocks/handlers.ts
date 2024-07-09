import { HttpResponse, http } from 'msw';
import { BASEURL } from '../constants/constants';

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
  http.post(`${BASEURL}/api/v1/email/verify-code`, async () => {
    return HttpResponse.json({
      success: true,
      message: '이메일 검증이 완료되었습니다',
    });
  }),
  //닉네임 중복확인
  http.get(`${BASEURL}/api/v1/users/nickname-check/{nickname}`, async () => {
    return HttpResponse.json({
      isAvailable: true,
      message: '닉네임 사용 가능합니다.',
    });
  }),
  //이메일 찾기
  http.post(`${BASEURL}/api/v1/users/email`, async () => {
    return HttpResponse.json({ email: 'user@example.com' });
  }),
  //비밀번호 찾기
  http.post(`${BASEURL}/api/v1/users/password`, async () => {
    return HttpResponse.json({
      success: true,
      message: '일치하는 계정이 있습니다.',
    });
  }),
  // 로그인
  http.post(`${BASEURL}/api/v1/auth/login`, async ({ request }) => {
    const data = {
      accessToken: '12345',
      refreshToken: '1234',
    };

    const result: any = await request.json();

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
