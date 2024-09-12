import { ReactNode } from 'react';
import Text from './Text';
import { ArrowIcon } from '@components/icons/ArrowIcons';

type TextType = {
  href: string;
  children: ReactNode;
};

export default function TextWithArrow({ children, href }: TextType) {
  return (
    <div className="flex justify-between py-[18px]">
      <span>
        <Text size="l" weight="bold" href={href}>
          {children}
        </Text>
      </span>
      <span>
        <ArrowIcon fill="#171719" />
      </span>
    </div>
  );
}
