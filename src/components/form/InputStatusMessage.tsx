import Text from '@components/common/atom/Text';
import { ReactNode } from 'react';

interface InputStatusMessageProps {
  children: ReactNode;
  status: 'success' | 'normal';
  isVisible: boolean;
}

export default function InputStatusMessage({ children, status, isVisible }: InputStatusMessageProps) {
  if (!isVisible) return null;

  return (
    <div className="mt-1 ml-1">
      <Text size="xs" color={status === 'success' ? 'success' : 'gray'}>
        {children}
      </Text>
    </div>
  );
}
