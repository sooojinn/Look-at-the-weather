import BackBtn from '@components/icons/BackBtn';
import CloseBtn from '@components/icons/CloseBtn';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  children?: ReactNode;
  isModal?: boolean;
  onClose?: () => void;
}

export default function Header({ children, isModal = false, onClose }: HeaderProps) {
  const location = useLocation();
  const mainPageList = ['/', '/post', '/postwrite', '/mypage'];
  const isMainPage = mainPageList.includes(location.pathname);

  const navigate = useNavigate();
  const handleBackBtn = () => navigate(-1);
  return (
    <header className="w-full sticky top-0 bg-background-white flex justify-between border-b border-line-lightest px-5 py-4 text-2xl z-10">
      <div className="w-6 h-6">
        {/* 메인 페이지가 아니면 뒤로가기 버튼 생성 */}
        <button className={`${isMainPage ? 'hidden' : 'block'}`} onClick={handleBackBtn}>
          <BackBtn />
        </button>
      </div>
      <div className="flex justify-center items-center font-bold">{children}</div>
      <div className="w-6 h-6">
        <button onClick={onClose}>{isModal && <CloseBtn />}</button>
      </div>
    </header>
  );
}
