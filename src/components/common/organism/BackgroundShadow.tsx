import { ReactNode, useEffect, useState } from 'react';

export default function BackgroundShadow({
  children,
  isBackdropVisible = true,
}: {
  children: ReactNode;
  isBackdropVisible?: boolean;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 실행되도록 설정
  }, []);

  useEffect(() => {
    if (isClient) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isClient]);

  if (!isClient) {
    return null; // 서버 사이드에서는 렌더링하지 않음
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-opacity-black50 z-50 
      ${isBackdropVisible ? 'transform bg-opacity-100' : 'transform bg-opacity-0'} transition-transform duration-300`}
    >
      {children}
    </div>
  );
}
