'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.replace('/login');
    }
  }, [isLogin]);

  if (!isLogin) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
