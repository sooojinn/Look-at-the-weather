import { BASEURL } from '@/config/constants';
import axios from 'axios';
import { useEffect } from 'react';

export default function KakaoRedirect() {
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const postCode = async () => {
      // api 확실하게 물어보기
      const response = await axios.post(
        `${BASEURL}/api/v1/oauth/kakao?code=${code}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    };
    postCode();
  });

  return <div>로그인 중입니다...</div>;
}
