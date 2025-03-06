import { ReactNode } from 'react';

interface CurrentTempProps {
  children: ReactNode;
}

export default function CurrentTemp({ children }: CurrentTempProps) {
  return <span className="mt-2 text-white font-bold text-[24px] leading-none">{children}°</span>;
}
