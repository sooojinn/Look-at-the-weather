import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { ReactNode } from 'react';
import Text from '../atom/Text';
import BackgroundShadow from './BackgroundShadow';

interface AlertModalProps {
  boldMessage: ReactNode;
  regularMessage: ReactNode;
  buttons: ReactNode;
}

export default function AlertModal({ boldMessage, regularMessage, buttons }: AlertModalProps) {
  const [isClient, setIsClient] = useState(false);

  // 클라이언트에서만 렌더링 되도록 설정
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return ReactDOM.createPortal(
    <BackgroundShadow>
      <div className="min-w-[300px] bg-white p-6 flex flex-col text-center gap-6 rounded-2xl">
        <div className="flex flex-col items-center text-center gap-4">
          <Text size="l" weight="bold">
            {boldMessage}
          </Text>
          <Text color="darkGray" className="flex flex-col gap-4">
            {regularMessage}
          </Text>
        </div>

        <div className="flex justify-center gap-2">{buttons}</div>
      </div>
    </BackgroundShadow>,
    document.body,
  );
}
