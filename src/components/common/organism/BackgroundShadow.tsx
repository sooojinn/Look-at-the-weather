import { ReactNode, useEffect } from 'react';

export default function BackgroundShadow({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">{children}</div>;
}
