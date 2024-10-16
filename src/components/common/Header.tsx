import BackBtn from '@components/icons/BackBtn';
import CloseBtn from '@components/icons/CloseBtn';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Text from './atom/Text';

interface HeaderProps {
  children?: ReactNode;
  hideBackBtn?: boolean;
  noBorder?: boolean;
  onClose?: () => void;
}

export default function Header({ children, hideBackBtn, noBorder, onClose }: HeaderProps) {
  const location = useLocation();
  const mainPageList = ['/', '/post', '/post-write', '/mypage'];
  const isMainPage = mainPageList.includes(location.pathname);

  const navigate = useNavigate();
  const handleBackBtn = () => navigate(-1);
  return (
    <header
      className={`w-full sticky top-0 bg-background-white flex justify-between items-center px-5 py-4 z-20 ${
        noBorder ? '' : 'border-b border-line-lightest'
      }`}
    >
      <div className="w-6 h-6">{!isMainPage && !hideBackBtn && <BackBtn onClick={handleBackBtn} />}</div>
      <div className="flex justify-center items-center">
        <Text size="2xl" color="black" weight="bold">
          {children}
        </Text>
      </div>
      <div className="w-6 h-6">{onClose && <CloseBtn onClick={onClose} />}</div>
    </header>
  );
}
