'use client';

import { postLogout } from '@/api/apis';
import { setAccessToken } from '@/api/instance';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { showToast } from '../common/molecules/ToastProvider';
import Text from '../common/atom/Text';
import AlertModal from '@components/common/organism/AlertModal';
import Button from '@components/common/molecules/Button';
import { usePostStore } from '@/store/postStore';
import { useRouter } from 'next/navigation';

export default function LogoutBtn() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isLogin = useAuthStore((state) => state.isLogin);
  const { setIsLogin, authStoreClear } = useAuthStore();
  const { postStoreClear } = usePostStore();
  const router = useRouter();

  const LogoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      setAccessToken(null);
      setIsLogin(false);
      localStorage.removeItem('nickname');
      authStoreClear();
      postStoreClear();
      router.push('/');
      showToast('로그아웃되었습니다.');
    },
    onError: (error) => {
      showToast('로그아웃 실패. 다시 시도해주세요.');
      console.error(error);
    },
  });

  const handleLogoutClick = () => {
    LogoutMutation.mutate();
  };

  if (!isLogin) return null;

  return (
    <>
      <div onClick={() => setShowLogoutModal(true)} className="h-[57px] flex items-center">
        <Text color="darkGray" className="cursor-pointer underline">
          로그아웃
        </Text>
      </div>
      {showLogoutModal && (
        <AlertModal
          boldMessage="로그아웃 확인"
          regularMessage="정말 로그아웃 하시겠습니까?"
          buttons={
            <>
              <Button size="m" type="sub" onClick={() => setShowLogoutModal(false)}>
                닫기
              </Button>
              <Button size="m" onClick={handleLogoutClick}>
                확인
              </Button>
            </>
          }
        />
      )}
    </>
  );
}
