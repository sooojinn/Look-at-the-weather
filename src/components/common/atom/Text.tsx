import { TextColor, TextSize, TextWeight } from '@/config/types';
import { ReactNode } from 'react';

type TextType = {
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  href?: string;
  children: ReactNode;
};

export default function Text({ children, size = 'm', color = 'lightBlack', weight = 'nomal', href }: TextType) {
  return (
    <>
      {href ? (
        <a href={href} className={`text-${size} text-${color} font-${weight}`}>
          {children}
        </a>
      ) : (
        <div className={`text-${size} text-${color} font-${weight}`}>{children}</div>
      )}
    </>
  );
}
