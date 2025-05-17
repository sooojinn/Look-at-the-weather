import { ReactNode } from 'react';
import Text from '../common/atom/Text';

interface StatusPlaceholderProps {
  ImgComp: React.ComponentType;
  boldMessage: ReactNode;
  lightMessage: ReactNode;
  size?: 'm' | 'l';
  btnText?: string;
  btnFunc?: () => void;
}

export default function StatusPlaceholder({
  ImgComp,
  boldMessage,
  lightMessage,
  size = 'l',
  btnText,
  btnFunc,
}: StatusPlaceholderProps) {
  return (
    <div className="flex flex-col flex-grow justify-center items-center">
      <div className={`${size === 'm' ? 'w-[60px] h-[61px] flex justify-center items-center' : undefined}`}>
        <ImgComp />
      </div>
      <Text weight="bold" size={size === 'm' ? 's' : 'l'} className="mt-5 mb-1.5 text-center">
        {boldMessage}
      </Text>
      <Text color="gray" size={size === 'm' ? 's' : undefined} className="text-center">
        {lightMessage}
      </Text>
      {btnText && btnFunc && (
        <button className="w-[163px] h-12 mt-10 border border-line-light rounded-[8px]" onClick={btnFunc}>
          <Text size="l">{btnText}</Text>
        </button>
      )}
    </div>
  );
}
