import { ReactNode } from 'react';
import Header from './Header';

interface ModalHeaderProps {
  children?: ReactNode;
  onClose: () => void;
  resizable?: boolean;
}

export default function ModalHeader({ children, resizable, onClose }: ModalHeaderProps) {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      {resizable && <div className="w-10 h-1 mt-2 rounded-sm bg-line-light"></div>}
      <Header onClose={onClose} hideBackBtn noBorder>
        {children}
      </Header>
    </div>
  );
}
