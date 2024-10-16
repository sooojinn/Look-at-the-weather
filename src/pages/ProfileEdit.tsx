import Header from '@/components/common/Header';
import DefaultDisabledInput from '@components/form/DefaultDisabledInpust';
import { useForm } from 'react-hook-form';
import Text from '@components/common/atom/Text';
import Label from '@components/form/Label';
import PasswordInput from '@components/form/inputs/PasswordInput';
import PasswordCheckInput from '@components/form/inputs/PasswordCheckInput';
import { useEffect, useState } from 'react';
import { getUserInfos, patchEditProfile } from '@/api/apis';
import NicknameInput from '@components/form/inputs/NicknameInput';
import Button from '@components/common/molecules/Button';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '@components/common/molecules/ToastProvider';
import { useNavigate } from 'react-router-dom';

interface ProfileEditType {
  nickname: string;
  password: string;
}

export default function ProfileEdit() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    nickname: '',
    name: '',
  });

  const formMethods = useForm<ProfileEditType>({
    defaultValues: {
      nickname: '',
    },
  });
  const { handleSubmit } = formMethods;
  const setNickName = useAuthStore((state) => state.setNickName);
  const navigate = useNavigate();

  const editProfileMutation = useMutation({
    mutationFn: patchEditProfile,
    onSuccess: (_, variables) => {
      showToast('개인 정보가 수정되었습니다.');
      setNickName(variables.nickname);
      navigate(-1);
    },
    onError: () => {
      showToast('개인 정보 수정 실패. 다시 시도해주세요.');
    },
  });

  const onSubmit = async (data: ProfileEditType) => {
    const { password, nickname } = data;
    editProfileMutation.mutate({ password, nickname });
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfos();
        const { email, nickname, name } = response.data;
        setUserInfo({ email, nickname, name });
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header>개인정보 수정</Header>
      <form className="flex flex-col flex-grow justify-between p-5 pb-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 pb-10">
          <div>
            <div className="mb-2.5">
              <Label required>이메일</Label>
            </div>
            <DefaultDisabledInput defaultValue={userInfo.email} />
          </div>
          <PasswordInput<ProfileEditType> {...formMethods} />
          <PasswordCheckInput<ProfileEditType> {...formMethods} />
          <div>
            <div className="mb-2.5">
              <Label required>이름</Label>
            </div>
            <DefaultDisabledInput defaultValue={userInfo.name} />
          </div>
          <NicknameInput<ProfileEditType> {...formMethods} shouldValidate={true} defaultValue={userInfo.nickname} />
          <Text href="/delete-account" color="gray" size="s" weight="bold" className="mt-3 underline">
            회원탈퇴
          </Text>
        </div>
        <Button>수정하기</Button>
      </form>
    </div>
  );
}
