'use client';

import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useState } from 'react';
import Header from '@/components/common/organism/Header';
import Button from '@components/common/molecules/Button';
import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from '@/config/types';
import { postFindPassword } from '@/api/apis';
import EmailInput from '@components/form/organism/inputs/EmailInput';
import NameInput from '@components/form/organism/inputs/NameInput';
import NicknameInput from '@components/form/organism/inputs/NicknameInput';
import AlertModal from '@components/common/organism/AlertModal';
import { FindPasswordForm } from '@/config/types';
import { useRouter } from 'next/navigation';
import useProfileManageStore from '@/store/profileManageStore';
import LoginRestrictionRoute from '@/components/route/LoginRestrictionRoute';

export default function FindPassword() {
  const formMethods = useForm<FindPasswordForm>();
  const { handleSubmit } = formMethods;

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const findPasswordMutation = useMutation({
    mutationFn: postFindPassword,
    onSuccess: ({ userId }) => {
      const setUserInfo = useProfileManageStore.getState().setUserInfo;
      setUserInfo({
        userId: userId,
      });

      router.push(`password-reset`);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.errorCode === 'NOT_EXIST_USER') {
        setShowModal(true);
      } else {
        console.error('비밀번호 찾기 오류: ', error);
      }
    },
  });

  const onSubmit = async (data: FindPasswordForm) => {
    findPasswordMutation.mutate(data);
  };

  return (
    <LoginRestrictionRoute>
      <Header>비밀번호 찾기</Header>
      <form className="flex flex-col justify-between h-screen p-5 pb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <EmailInput<FindPasswordForm> {...formMethods} />
          <NameInput<FindPasswordForm> {...formMethods} />
          <NicknameInput<FindPasswordForm> {...formMethods} />
        </div>
        <Button>비밀번호 찾기</Button>
      </form>
      {showModal && (
        <AlertModal
          boldMessage="비밀번호 찾기 결과"
          regularMessage="가입된 계정 정보가 없습니다."
          buttons={<Button onClick={() => setShowModal(false)}>확인</Button>}
        />
      )}
    </LoginRestrictionRoute>
  );
}
