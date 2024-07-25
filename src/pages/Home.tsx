import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import FooterNavi from '../components/common/FooterNavi';
import Header from '../components/common/Header';
import LoginForm from '../components/login/LoginForm';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const accessToken = localStorage.getItem('accessToken');
  //   const refreshToken = Cookies.get('refreshToken');
  //   if (accessToken && refreshToken) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  return (
    <div className="max-w-md m-auto min-h-screen flex flex-col items-center justify-start relative">
      {isLoggedIn || (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        </>
      )}

      {/* 로고와 날씨 정보 */}
      <div className="w-full sticky top-0 bg-white">
        <Header>로고</Header>
        {/* <div className="w-full p-4 mt-6 text-xl font-bold flex justify-center items-center ">로고</div> */}
        <div className="w-full p-4 bg-blue-200 h-[292px]">날씨 정보</div>
      </div>

      {/* 홈 화면 컨텐츠 */}
      <div className="w-full max-w-md flex flex-col">
        {/* 최신 게시물 목록 */}
        {isLoggedIn && (
          <>
            <div className="w-full px-5 test-4 font-bold flex justify-start items-center bg-yellow-50 h-[60px]">
              <p>Today Best Wear</p>
            </div>
            <div className="w-full post-list">
              <div className="h-[312px] bg-green-100"></div>
              <div className="h-[312px] bg-green-100"></div>
            </div>
          </>
        )}
      </div>
      <FooterNavi />
    </div>
  );
}
