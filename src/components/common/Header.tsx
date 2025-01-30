'use client';

import BackBtn from '@components/icons/BackBtn';
import CloseBtn from '@components/icons/CloseBtn';
import { ReactNode } from 'react';
import Text from './atom/Text';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  children?: ReactNode;
  hideBackBtn?: boolean;
  noBorder?: boolean;
  onClose?: () => void;
}

export default function Header({ children, hideBackBtn, noBorder, onClose }: HeaderProps) {
  const pathname = usePathname();
  const mainPageList = ['/', '/posts', '/post-write', '/mypage'];
  const isMainPage = mainPageList.includes(pathname || '/');

  const router = useRouter();
  const handleBackBtn = () => router.back();

  return (
    <header
      className={`w-full sticky top-0 h-[50px] bg-background-white flex flex-shrink-0 justify-between items-center px-5 z-20 ${
        noBorder ? '' : 'border-b border-line-lightest'
      }`}
    >
      <div className="w-6 h-6">{!isMainPage && !hideBackBtn && <BackBtn onClick={handleBackBtn} />}</div>
      <div className="flex justify-center items-center">
        <Text size="xl" weight="bold">
          {children}
        </Text>
      </div>
      <div className="w-6 h-6">{onClose && <CloseBtn onClick={onClose} />}</div>
    </header>
  );
}
