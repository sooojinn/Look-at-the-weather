import { KAKAO_REST_API_KEY, REDIRECT_URI } from '@/config/constants';
import Image from 'next/image';
import kakaoSymbol from '@/assets/kakao_symbol.png';

export default function KakaoLogin() {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = url;
  };

  return (
    <button
      type="button"
      className="w-full h-14 bg-[#FEE500] rounded-xl flex justify-center items-center gap-3"
      onClick={handleKakaoLogin}
    >
      <Image src={kakaoSymbol} width={20} height={20} alt="카카오" />
      <span className="text-l font-medium text-black/85">카카오 로그인</span>
    </button>
  );
}
