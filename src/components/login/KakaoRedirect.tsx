'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Text from '@components/common/atom/Text';
import Spinner from '@components/icons/Spinner';
import { showToast } from '@/components/provider/ToastProvider';
import { useAuthStore } from '@/store/authStore';
import { getKakaoUserInfos } from '@/api/apis';
import { useRouter } from 'next/navigation';
import { useFetchAndSetNickname } from '@/hooks/useFetchAndSetNickname';

export default function KakaoRedirect({ code }: { code: string }) {
  const router = useRouter();
  const { setIsLogin } = useAuthStore();
  const fetchAndSetNickname = useFetchAndSetNickname();

  const { isSuccess, error, isLoading } = useQuery({
    queryKey: ['kakaoUserInfo', code],
    queryFn: () => getKakaoUserInfos(code),
    enabled: !!code,
  });

  useEffect(() => {
    const handleLogin = async () => {
      if (isSuccess) {
        setIsLogin(true);
        await fetchAndSetNickname();
        router.push('/');
      }

      if (error) {
        console.error('로그인에 실패했습니다:', error);
        showToast('카카오 로그인 실패. 다시 시도해 주세요.');
        router.push('/');
      }
    };
    handleLogin();
  }, [isSuccess, error]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center relative">
      {isLoading && (
        <div className="flex flex-col justify-center items-center gap-7">
          <Spinner width={60} />
          <Text weight="bold">잠시만 기다려 주세요..</Text>
        </div>
      )}
    </div>
  );
}
