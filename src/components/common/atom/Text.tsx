import { ReactNode } from 'react';

type TextType = {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  color?: 'black' | 'lightBlack' | 'darkGray' | 'gray' | 'lightGray' | 'white';
  weight?: 'nomal' | 'bold';
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
