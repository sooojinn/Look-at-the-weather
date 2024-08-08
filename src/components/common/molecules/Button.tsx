import { TextColor, TextWeight } from '@/config/types';
import Text from '../atom/Text';
import { ReactNode } from 'react';

type ButtonType = 'white' | 'main' | 'disabled';

interface ButtonProps {
  children: ReactNode;
  type: ButtonType;
  width?: number;
  height?: number;
  radius?: number;
  onClick: () => void;
}

export default function Button({ children, type, width, height = 48, radius = 8, onClick }: ButtonProps) {
  const backgroundColor = {
    white: 'bg-background-white',
    main: 'bg-primary-main',
    disabled: 'bg-interactive-disabled',
  };

  const textColor: {
    [key in ButtonType]: TextColor;
  } = {
    white: 'black',
    main: 'white',
    disabled: 'disabled',
  };

  const textWeight: {
    [key in ButtonType]: TextWeight;
  } = {
    white: 'regular',
    main: 'bold',
    disabled: 'bold',
  };

  return (
    <button
      onClick={onClick}
      style={{ width: width ? `${width}px` : '100%', height: `${height}px`, borderRadius: `${radius}px` }}
      className={`${[backgroundColor[type]]} ${type === 'white' ? 'border border-line-light' : ''}`}
    >
      <Text size="l" color={textColor[type]} weight={textWeight[type]}>
        {children}
      </Text>
    </button>
  );
}
