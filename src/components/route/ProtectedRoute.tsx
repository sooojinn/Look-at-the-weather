'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { ReactNode, useEffect, useState } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const isLogin = useAuthStore((state) => state.isLogin);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!isLogin && hydrated) {
      router.replace('/login');
    }
  }, [isLogin, hydrated]);

  if (!isLogin || !hydrated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
