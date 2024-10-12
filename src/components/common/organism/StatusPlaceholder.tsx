import { ReactNode } from 'react';
import Text from '../atom/Text';

interface StatusPlaceholderProps {
  ImgComp: React.ComponentType;
  boldMessage: ReactNode;
  lightMessage: ReactNode;
  btnText?: string;
  btnFunc?: () => void;
}

export default function StatusPlaceholder({
  ImgComp,
  boldMessage,
  lightMessage,
  btnText,
  btnFunc,
}: StatusPlaceholderProps) {
  return (
    <div className="flex flex-col flex-grow justify-center items-center">
      <ImgComp />
      <Text weight="bold" size="xl" className="mt-5 mb-1.5 text-center">
        {boldMessage}
      </Text>
      <Text color="gray" className="text-center">
        {lightMessage}
      </Text>
      {btnText && btnFunc && (
        <button className="w-[164px] h-14 mt-10 border border-line-light rounded-[10px]" onClick={btnFunc}>
          <Text size="l">{btnText}</Text>
        </button>
      )}
    </div>
  );
}
