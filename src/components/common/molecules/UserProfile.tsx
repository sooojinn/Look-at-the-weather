'use client';

import { useAuthStore } from '@/store/authStore';
import Text from '../atom/Text';
import TextWithArrow from '../atom/TextWithArrow';
import Image from 'next/image';
import userIcon from '@/assets/user_icon.png';

export default function UserProfile() {
  const nickName = useAuthStore((state) => state.nickName);
  const isLogin = useAuthStore((state) => state.isLogin);

  return isLogin ? (
    <div className="flex gap-3 items-center py-5">
      <Image src={userIcon} alt="Preloaded" width={40} height={40} />
      <Text size="xl" weight="bold">
        {nickName}
      </Text>
    </div>
  ) : (
    <TextWithArrow href="/login">
      <div>
        <Text size="xl" weight="bold">
          로그인 및 회원가입
        </Text>
        <Text color="gray">로그인 후 모든 기능을 이용해보세요.</Text>
      </div>
    </TextWithArrow>
  );
}
