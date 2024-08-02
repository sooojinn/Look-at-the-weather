import { TextSize } from '@/config/types';
import Text from '@components/common/atom/Text';
import { ReactNode } from 'react';

interface WeatherMessageProps {
  children: ReactNode;
  size: TextSize;
}

export default function WeatherMessage({ children, size }: WeatherMessageProps) {
  return (
    <Text size={size} weight="bold">
      {children}
    </Text>
  );
}
