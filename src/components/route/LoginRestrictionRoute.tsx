'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ReactNode, useEffect } from 'react';

interface LoginRestrictionRoute {
  children: ReactNode;
}

const LoginRestrictionRoute = ({ children }: LoginRestrictionRoute) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const router = useRouter();

  useEffect(() => {
    console.log(isLogin);
    if (isLogin) {
      router.back();
    }
  }, [isLogin, router]);

  return <>{children}</>;
};

export default LoginRestrictionRoute;
