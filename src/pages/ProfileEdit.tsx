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

  const onSubmit = async (data: ProfileEditType) => {
    const { password, nickname } = data;

    try {
      const response = await patchEditProfile({ password, nickname });

      if (response.status === 200) {
        alert('정보 수정 완료');
        window.location.href = '/mypage';
      } else {
        alert('정보 수정 실패, 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('Profile update failed:', error);
    }
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
    <div className="flex flex-col justify-between h-screen">
      <Header>개인정보 수정</Header>
      <form className="flex flex-col px-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 mt-5 mb-[147px]">
          <div>
            <div className="mb-2.5">
              <Label required>이메일</Label>
            </div>
            <DefaultDisabledInput defaultValue={userInfo.email} />
          </div>
          <div>
            <PasswordInput<ProfileEditType> {...formMethods} />
          </div>
          <div>
            <PasswordCheckInput<ProfileEditType> {...formMethods} />
          </div>
          <div>
            <div className="mb-2.5">
              <Label required>이름</Label>
            </div>
            <DefaultDisabledInput defaultValue={userInfo.name} />
          </div>
          <div>
            <div className="flex row items-end gap-2.5">
              <div className="w-full">
                <NicknameInput<ProfileEditType>
                  {...formMethods}
                  shouldValidate={true}
                  defaultValue={userInfo.nickname}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex row mt-auto mb-10">
          <button type="submit" className="w-full bg-primary-main rounded-lg py-3 px-4">
            <Text color="white" size="l" weight="bold">
              수정하기
            </Text>
          </button>
        </div>
      </form>
    </div>
  );
}
