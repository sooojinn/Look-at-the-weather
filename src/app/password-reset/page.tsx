'use client';

import Header from '@/components/common/Header';
import Button from '@components/common/molecules/Button';
import { showToast } from '@components/common/molecules/ToastProvider';
import PasswordCheckInput from '@components/form/inputs/PasswordCheckInput';
import PasswordInput from '@components/form/inputs/PasswordInput';
import { patchPasswordReset } from '@/api/apis';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AlertModal from '@components/common/organism/AlertModal';
import { useRouter } from 'next/navigation';
import useProfileManageStore from '@/store/profileManageStore';
import LoginRestrictionRoute from '@/router/LoginRestrictionRoute';
import { useEffect } from 'react';

interface PasswordResetForm {
  userId: number | undefined;
  password: string;
  confirmPassword: string;
}

export default function PasswordReset() {
  const formMethods = useForm<PasswordResetForm>({ mode: 'onChange' });
  const { handleSubmit, setValue, reset } = formMethods;

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { userId, clearUserInfo } = useProfileManageStore((state) => ({
    userId: state.userId,
    clearUserInfo: state.clearUserInfo,
  }));

  setValue('userId', userId);

  const passwordResetMutation = useMutation({
    mutationFn: patchPasswordReset,
    onSuccess: () => setShowModal(true),
    onError: (error) => {
      console.error('비밀번호 재설정 실패: ', error);
      showToast('비밀번호 재설정에 실패했습니다.');
      reset();
    },
  });

  const onSubmit = async (data: PasswordResetForm) => {
    passwordResetMutation.mutate(data);
  };

  useEffect(() => {
    if (!userId) {
      router.back();
    }
  }, [userId, router]);

  return (
    <LoginRestrictionRoute>
      <Header>비밀번호 재설정</Header>
      <form className="flex flex-col justify-between h-screen p-5 pb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <PasswordInput<PasswordResetForm> isPasswordReset shouldValidate {...formMethods} />
          <PasswordCheckInput<PasswordResetForm> {...formMethods} />
        </div>
        <Button>비밀번호 재설정하기</Button>
      </form>
      {showModal && (
        <AlertModal
          boldMessage="비밀번호 재설정 완료"
          regularMessage="비밀번호 변경이 완료되었습니다."
          buttons={
            <Button
              onClick={() => {
                setShowModal(false);
                router.push('/');
                clearUserInfo();
              }}
            >
              확인
            </Button>
          }
        />
      )}
    </LoginRestrictionRoute>
  );
}
