'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 스크롤을 맨 위로 이동
  }, [pathname]);

  return null;
}
