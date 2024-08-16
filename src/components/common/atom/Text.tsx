import { TextColor, TextSize, TextWeight, TextMargin } from '@/config/types';
import { ReactNode } from 'react';

type TextType = {
  size?: TextSize;
  color?: TextColor;
  weight?: TextWeight;
  href?: string;
  children: ReactNode;
  margin?: TextMargin;
};

export default function Text({
  children,
  size = 'm',
  color = 'lightBlack',
  weight = 'regular',
  href,
  margin,
}: TextType) {
  const textSize = {
    xs: 'text-xs',
    s: 'text-s',
    m: 'text-m',
    l: 'text-l',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };

  const textColor = {
    black: 'text-black',
    lightBlack: 'text-lightBlack',
    darkGray: 'text-darkGray',
    gray: 'text-gray',
    lightGray: 'text-lightGray',
    white: 'text-white',
    main: 'text-primary-main',
    disabled: 'text-disabled',
    blue: 'text-primary-main',
  };

  const textWeight = {
    regular: 'font-regular',
    bold: 'font-bold',
  };

  return (
    <>
      {href ? (
        <a href={href} className={`${margin} ${textSize[size]} ${textColor[color]} ${textWeight[weight]}`}>
          {children}
        </a>
      ) : (
        <div className={`${margin} ${textSize[size]} ${textColor[color]} ${textWeight[weight]}`}>{children}</div>
      )}
    </>
  );
}
