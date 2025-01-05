import { ReactNode } from 'react';
import ArrowIcon from '@components/icons/ArrowIcon';
import Link from 'next/link';

type TextType = {
  href: string;
  children: ReactNode;
};

export default function TextWithArrow({ children, href }: TextType) {
  return (
    <Link href={href}>
      <div className="flex justify-between items-center py-4 cursor-pointer">
        {children}
        <ArrowIcon />
      </div>
    </Link>
  );
}
