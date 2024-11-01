import { ReactNode } from 'react';
import Text from '../atom/Text';
import BackgroundShadow from './BackgroundShadow';
import WarningIcon from '@components/icons/WarningIcon';

interface AlertModalProps {
  showWarningIcon?: boolean;
  boldMessage?: ReactNode;
  regularMessage: ReactNode;
  lightMessage?: ReactNode;
  buttons?: ReactNode;
}

export default function AlertModal({
  showWarningIcon,
  boldMessage,
  regularMessage,
  lightMessage,
  buttons,
}: AlertModalProps) {
  return (
    <BackgroundShadow>
      <div className="bg-white p-6 flex flex-col text-center gap-6 rounded-lg">
        <div className="flex flex-col justify-center items-center gap-4">
          {showWarningIcon && <WarningIcon />}
          <div className="flex flex-col items-center text-center gap-[6px]">
            {boldMessage && (
              <Text size="l" weight="bold">
                {boldMessage}
              </Text>
            )}
            <Text color={boldMessage ? 'gray' : 'lightBlack'} className="flex flex-col gap-4">
              {regularMessage}
            </Text>
            {lightMessage && (
              <Text size="xs" color="gray">
                {lightMessage}
              </Text>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-2">{buttons}</div>
      </div>
    </BackgroundShadow>
  );
}
