import BackBtn from '@components/icons/BackBtn';
import CloseBtn from '@components/icons/CloseBtn';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Text from './atom/Text';

interface HeaderProps {
  children?: ReactNode;
  showBackBtn?: boolean;
  onClose?: () => void;
}

export default function Header({ children, showBackBtn = true, onClose }: HeaderProps) {
  const location = useLocation();
  const mainPageList = ['/', '/post', '/postwrite', '/mypage'];
  const isMainPage = mainPageList.includes(location.pathname);

  const navigate = useNavigate();
  const handleBackBtn = () => navigate(-1);
  return (
    <header className="w-full sticky top-0 bg-background-white flex justify-between border-b border-line-lightest px-5 py-4 z-10">
      <div className="w-6 h-6">
        {!isMainPage && showBackBtn && (
          <button onClick={handleBackBtn}>
            <BackBtn />
          </button>
        )}
      </div>
      <div className="flex justify-center items-center">
        <Text size="2xl" color="black" weight="bold">
          {children}
        </Text>
      </div>
      <div className="w-6 h-6">
        {onClose && (
          <button onClick={onClose}>
            <CloseBtn />
          </button>
        )}
      </div>
    </header>
  );
}
