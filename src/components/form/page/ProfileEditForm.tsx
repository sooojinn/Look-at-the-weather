'use client';

import { useForm } from 'react-hook-form';
import Text from '@components/common/atom/Text';
import { useEffect } from 'react';
import { getUserInfos, patchEditProfile } from '@/api/apis';
import Button from '@components/common/molecules/Button';
import { useAuthStore } from '@/store/authStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showToast } from '@/components/provider/ToastProvider';
import { useRouter } from 'next/navigation';
import EmailInput from '../organism/inputs/EmailInput';
import PasswordInput from '../organism/inputs/PasswordInput';
import PasswordCheckInput from '../organism/inputs/PasswordCheckInput';
import NameInput from '../organism/inputs/NameInput';
import NicknameInput from '../organism/inputs/NicknameInput';

interface ProfileEditType {
  nickname: string;
  password: string;
}

export default function ProfileEditForm() {
  const formMethods = useForm<ProfileEditType>({
    defaultValues: {
      nickname: '',
    },
  });

  const { handleSubmit } = formMethods;
  const setNickName = useAuthStore((state) => state.setNickName);
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: userInfo,
    isError,
    error,
  } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfos,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isError) {
      showToast('사용자 정보를 가져오는 데 실패했습니다.');
      console.error(error);
    }
  }, [isError, error]);

  const editProfileMutation = useMutation({
    mutationFn: patchEditProfile,
    onSuccess: (_, variables) => {
      showToast('개인 정보가 수정되었습니다.');
      setNickName(variables.nickname);
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
      router.back();
    },
    onError: () => {
      showToast('개인 정보 수정 실패. 다시 시도해주세요.');
    },
  });

  const onSubmit = async (data: ProfileEditType) => {
    const { password, nickname } = data;
    editProfileMutation.mutate({ password, nickname });
  };
  return (
    <>
      <form className="flex flex-col flex-grow gap-4 overflow-y-auto scrollbar-hide p-5">
        <EmailInput<ProfileEditType> {...formMethods} disabled defaultValue={userInfo?.email} />
        <PasswordInput<ProfileEditType> {...formMethods} shouldValidate disabled={userInfo?.social} />
        <PasswordCheckInput<ProfileEditType> {...formMethods} disabled={userInfo?.social} />
        <NameInput<ProfileEditType> {...formMethods} disabled defaultValue={userInfo?.name} />
        <NicknameInput<ProfileEditType> {...formMethods} shouldValidate defaultValue={userInfo?.nickname} />
        <Text href="/delete-account" color="gray" size="s" weight="bold" className="mt-3 underline">
          회원탈퇴
        </Text>
      </form>
      <div className="px-5 pb-10">
        <Button onClick={handleSubmit(onSubmit)} isSubmitting={editProfileMutation.isPending}>
          수정하기
        </Button>
      </div>
    </>
  );
}
