import { TextColor, TextWeight } from '@/config/types';
import Text from '../atom/Text';
import { ReactNode } from 'react';

type ButtonType = 'white' | 'main';
type ButtonSize = 'm' | 'l';

interface ButtonProps {
  children: ReactNode;
  type: ButtonType;
  disabled?: boolean;
  width?: number;
  size?: ButtonSize;
  onClick: () => void;
}

export default function Button({ children, type, disabled, width, size = 'l', onClick }: ButtonProps) {
  const backgroundColors = {
    white: 'bg-background-white',
    main: 'bg-primary-main',
    disabled: 'bg-interactive-disabled',
  };

  const textColors: {
    [key in ButtonType | 'disabled']: TextColor;
  } = {
    white: 'black',
    main: 'white',
    disabled: 'disabled',
  };

  const textWeights: {
    [key in ButtonType | 'disabled']: TextWeight;
  } = {
    white: 'regular',
    main: 'bold',
    disabled: 'bold',
  };

  const btnStyle = disabled ? 'disabled' : type;

  const backgroundColor = backgroundColors[btnStyle];
  const textColor = textColors[btnStyle];
  const textWeight = textWeights[btnStyle];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ width: width ? `${width}px` : '100%' }}
      className={`${[backgroundColor]} ${type === 'white' ? 'border border-line-light' : ''} ${
        size === 'm' ? 'h-12 rounded-lg' : 'h-14 rounded-[10px]'
      }`}
    >
      <Text size="l" color={textColor} weight={textWeight}>
        {children}
      </Text>
    </button>
  );
}
