'use client';

import Header from '@/components/common/organism/Header';
import Text from '@components/common/atom/Text';
import Button from '@/components/common/atom/Button';
import { useRouter } from 'next/navigation';
import useProfileManageStore from '@/store/profileManageStore';

export default function FindEmailResult() {
  const router = useRouter();
  const { name, email, clearUserInfo } = useProfileManageStore((state) => ({
    name: state.name,
    email: state.email,
    clearUserInfo: state.clearUserInfo,
  }));

  const onClickCloseBtn = () => {
    clearUserInfo();
    router.push('/');
  };

  const onClickLoginBtn = () => {
    clearUserInfo();
    router.push('/login');
  };

  return (
    <>
      <Header onClose={() => onClickCloseBtn()}>이메일 찾기</Header>
      <div className="flex flex-col justify-between h-screen flex-grow p-5 pb-10">
        <div>
          <div className="px-20 mb-4">
            <Text size="l" weight="bold">
              {name} 님의 가입된 이메일 정보는 아래와 같습니다.
            </Text>
          </div>
          <div className="w-full h-14 py-3 flex justify-center items-center bg-background-light rounded-[10px]">
            <Text size="l" weight="bold">
              {email}
            </Text>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button type="white" onClick={() => router.push('/find-password')}>
            비밀번호 찾기
          </Button>
          <Button onClick={onClickLoginBtn}>로그인하기</Button>
        </div>
      </div>
    </>
  );
}
