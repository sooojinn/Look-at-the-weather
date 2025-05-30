import { TextColor, TextWeight } from '@/config/types';
import Text from './Text';
import { ReactNode } from 'react';

type ButtonType = 'main' | 'white' | 'sub';
type ButtonSize = 'm' | 'l';

interface ButtonProps {
  children: ReactNode;
  type?: ButtonType;
  disabled?: boolean;
  strongDisabled?: boolean;
  isSubmitting?: boolean;
  width?: number;
  size?: ButtonSize;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  children,
  type = 'main',
  disabled,
  strongDisabled,
  isSubmitting,
  width,
  size = 'l',
  onClick,
}: ButtonProps) {
  const backgroundColors = {
    main: 'bg-primary-main',
    white: 'bg-background-white',
    sub: 'bg-background-white',
    disabled: strongDisabled ? 'bg-disabled' : 'bg-background-disabled',
  };

  const textColors: {
    [key in ButtonType | 'disabled']: TextColor;
  } = {
    main: 'white',
    white: 'main',
    sub: 'lightBlack',
    disabled: strongDisabled ? 'gray' : 'disabled',
  };

  const textWeights: {
    [key in ButtonType | 'disabled']: TextWeight;
  } = {
    main: 'medium',
    white: 'medium',
    sub: 'regular',
    disabled: 'medium',
  };

  const borders = {
    main: 'border-transparent',
    white: 'border-primary-main',
    sub: 'border-line-light',
    disabled: 'border-transparent',
  };

  const btnStyle = disabled ? 'disabled' : type;

  const backgroundColor = backgroundColors[btnStyle];
  const textColor = textColors[btnStyle];
  const textWeight = textWeights[btnStyle];
  const borderColor = borders[btnStyle];

  return (
    <button
      onClick={onClick}
      disabled={disabled || isSubmitting}
      style={{ width: width ? `${width}px` : '100%' }}
      className={`${backgroundColor} border ${borderColor} ${size === 'm' ? 'h-12 rounded-lg' : 'h-14 rounded-[10px]'}`}
    >
      <Text size="l" color={textColor} weight={textWeight}>
        {children}
      </Text>
    </button>
  );
}
