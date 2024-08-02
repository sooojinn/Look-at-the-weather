import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const location = useLocation();
  const mainPageList = ['/', '/post', '/postwrite', '/mypage'];
  const isMainPage = mainPageList.includes(location.pathname);

  const navigate = useNavigate();
  const handleBackBtn = () => navigate(-1);
  return (
    <header className="w-full sticky top-0 bg-background-white flex justify-between border-b border-line-lightest px-5 py-4 text-2xl">
      <div className="w-6 h-6">
        {/* 메인 페이지가 아니면 뒤로가기 버튼 생성 */}
        <button className={`${isMainPage ? 'hidden' : 'block'}`} onClick={handleBackBtn}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z" fill="#171719" />
          </svg>
        </button>
      </div>
      <div className="font-bold">{children}</div>
      <div className="w-6 h-6"></div>
    </header>
  );
}
