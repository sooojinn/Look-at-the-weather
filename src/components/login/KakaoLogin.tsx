import { KAKAO_REST_API_KEY, REDIRECT_URI } from '@/config/constants';

export default function KakaoLogin() {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = url;
  };

  return (
    <button type="button" onClick={handleKakaoLogin}>
      로그인 하기
    </button>
  );
}
