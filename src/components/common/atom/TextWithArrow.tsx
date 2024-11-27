import { ReactNode } from 'react';
import ArrowIcon from '@components/icons/ArrowIcon';
import { NavLink } from 'react-router-dom';

type TextType = {
  href: string;
  children: ReactNode;
};

export default function TextWithArrow({ children, href }: TextType) {
  return (
    <NavLink to={href}>
      <div className="flex justify-between items-center py-4 cursor-pointer">
        {children}
        <ArrowIcon />
      </div>
    </NavLink>
  );
}
