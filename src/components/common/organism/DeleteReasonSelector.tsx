'use client';

import { deleteAccount } from '@/api/apis';
import { setAccessToken } from '@/api/instance';
import DeleteAccountModal from '@/components/modal/DeleteAccountModal';
import DeleteAccountSuccessModal from '@/components/modal/DeleteAccountSuccessModal';
import { useAuthStore } from '@/store/authStore';
import { showToast } from '@/components/provider/ToastProvider';
import UnderlineOptionList from '@components/common/molecules/UnderlineOptionList';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteReasonSelector() {
  const router = useRouter();
  const { setIsLogin } = useAuthStore();
  const [selectedReason, setSelectedReason] = useState('');
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);

  const deleteReasons = [
    '사용을 잘 안하게 돼요',
    '서비스 활성화가 잘 안되어 있어요',
    '개인정보 보호를 위해 삭제할 필요가 있어요',
    '서비스 기능이 미흡해요',
    '오류가 잦아요',
  ];

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      setShowWarningModal(false);
      setShowDeleteSuccessModal(true);
    },
    onError: (error) => {
      console.error(error);
      showToast('탈퇴 처리 중 에러가 발생했습니다.');
      setShowWarningModal(false);
    },
  });

  const handleReasonClick = (reason: string) => {
    setSelectedReason(reason);
    setShowWarningModal(true);
  };

  const handleDeleteClick = () => {
    deleteAccountMutation.mutate(selectedReason);
  };
  return (
    <>
      {deleteReasons && <UnderlineOptionList optionList={deleteReasons} handleOptionClick={handleReasonClick} />}
      {showWarningModal && (
        <DeleteAccountModal onCancel={() => setShowWarningModal(false)} onContinue={handleDeleteClick} />
      )}
      {showDeleteSuccessModal && (
        <DeleteAccountSuccessModal
          onContinue={() => {
            router.push('/');
            setAccessToken(null);
            setIsLogin(false);
          }}
        />
      )}
    </>
  );
}
