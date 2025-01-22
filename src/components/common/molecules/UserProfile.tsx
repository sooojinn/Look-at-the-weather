'use client';

import { useAuthStore } from '@/store/authStore';
import Text from '../atom/Text';
import TextWithArrow from '../atom/TextWithArrow';

export default function UserProfile() {
  const nickName = useAuthStore((state) => state.nickName);
  const isLogin = useAuthStore((state) => state.isLogin);

  return isLogin ? (
    <div className="flex gap-3 items-center py-5">
      <img src="/assets/user_icon.png" alt="Preloaded" />
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
