'use client';

import ReactDOM from 'react-dom';
import { ReactNode } from 'react';
import Text from '../atom/Text';
import BackgroundShadow from '../atom/BackgroundShadow';

interface AlertModalProps {
  boldMessage: ReactNode;
  regularMessage: ReactNode;
  buttons: ReactNode;
}

export default function AlertModal({ boldMessage, regularMessage, buttons }: AlertModalProps) {
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
