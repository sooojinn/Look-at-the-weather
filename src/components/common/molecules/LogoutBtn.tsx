import { postLogout } from '@/api/apis';
import { setAccessToken } from '@/api/instance';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { showToast } from './ToastProvider';
import Text from '../atom/Text';
import InfoModal from '../organism/InfoModal';

export default function LogoutBtn() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { setIsLogin } = useAuthStore();

  const LogoutMutation = useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      setAccessToken(null);
      setIsLogin(false);
      localStorage.removeItem('nickname');
      sessionStorage.removeItem('auth-storage');
      sessionStorage.removeItem('post-storage');
      // 로그아웃 시 http only cookie 삭제하는 코드 추가해야됨
    },
    onError: (error) => {
      showToast('로그아웃 실패. 다시 시도해주세요.');
      console.error(error);
    },
  });

  const handleLogoutClick = () => {
    LogoutMutation.mutate();
  };
  return (
    <>
      <div onClick={() => setShowLogoutModal(true)}>
        <Text className="cursor-pointer">로그아웃</Text>
      </div>
      {showLogoutModal && (
        <InfoModal
          message="정말 로그아웃 하시겠습니까?"
          onClose={() => setShowLogoutModal(false)}
          onContinue={handleLogoutClick}
        />
      )}
    </>
  );
}
