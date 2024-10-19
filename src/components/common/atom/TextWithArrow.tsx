import { ReactNode } from 'react';
import Text from './Text';
import ArrowIcon from '@components/icons/ArrowIcon';
import { NavLink } from 'react-router-dom';

type TextType = {
  href: string;
  children: ReactNode;
};

export default function TextWithArrow({ children, href }: TextType) {
  return (
    <NavLink to={href}>
      <div className="flex justify-between items-center py-[18px] cursor-pointer">
        <Text size="l" weight="bold">
          {children}
        </Text>
        <ArrowIcon fill="#171719" />
      </div>
    </NavLink>
  );
}
