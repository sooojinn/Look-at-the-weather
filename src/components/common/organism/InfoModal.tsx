import { ReactNode } from 'react';
import Text from '../atom/Text';
import Button from '../molecules/Button';
import BackgroundShadow from './BackgroundShadow';

interface InfoModalProps {
  message: ReactNode;
  onClose: () => void;
  onContinue?: () => void;
}

export default function InfoModal({ message, onClose, onContinue }: InfoModalProps) {
  return (
    <BackgroundShadow>
      <div className="bg-white p-6 flex flex-col text-center gap-6 rounded-lg">
        <Text>{message}</Text>
        <div className="flex gap-2">
          <Button size="m" type={onContinue ? 'sub' : 'main'} onClick={onClose}>
            닫기
          </Button>
          {onContinue && (
            <Button size="m" onClick={onContinue}>
              확인
            </Button>
          )}
        </div>
      </div>
    </BackgroundShadow>
  );
}
