'use client';

import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useState } from 'react';
import Header from '@/components/common/Header';
import Button from '@components/common/molecules/Button';
import { useMutation } from '@tanstack/react-query';
import { ErrorResponse } from '@/config/types';
import { postFindEmail } from '@/api/apis';
import NicknameInput from '@components/form/inputs/NicknameInput';
import NameInput from '@components/form/inputs/NameInput';
import AlertModal from '@components/common/organism/AlertModal';
import { FindEmailForm } from '@/config/types';
import { useRouter } from 'next/navigation';
import useProfileManageStore from '@/store/profileManageStore';

export default function FindEmail() {
  const formMethods = useForm<FindEmailForm>();
  const { handleSubmit, getValues } = formMethods;

  const [showModal, setShowModal] = useState(false);

  const setUserInfo = useProfileManageStore.getState().setUserInfo;

  const router = useRouter();

  const findEmailMutation = useMutation({
    mutationFn: postFindEmail,
    onSuccess: ({ email }) => {
      router.push('/find-email/result');
      setUserInfo({
        name: getValues('name'),
        email: email,
      });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.errorCode === 'NOT_MATCH_EMAIL') {
        setShowModal(true);
      } else {
        console.error('이메일 찾기 오류:', error);
      }
    },
  });

  const onSubmit = async (data: FindEmailForm) => {
    findEmailMutation.mutate(data);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header>이메일 찾기</Header>
      <form className="flex flex-col justify-between h-screen p-5 pb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <NameInput<FindEmailForm> {...formMethods} />
          <NicknameInput<FindEmailForm> {...formMethods} />
        </div>
        <Button>이메일 찾기</Button>
      </form>
      {showModal && (
        <AlertModal
          boldMessage="이메일 찾기 결과"
          regularMessage="가입된 계정 정보가 없습니다."
          buttons={<Button onClick={() => setShowModal(false)}>확인</Button>}
        />
      )}
    </div>
  );
}
