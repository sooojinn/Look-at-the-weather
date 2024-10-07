import { useEffect, useState } from 'react';
import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import Logo from '@components/common/atom/Logo';
import LoginModal from '@/components/login/LoginModal';
import HomeWeatherInfo from '@components/weather/HomeWeatherInfo';
import TodayBestWearList from '@/components/post/TodayBestWearList';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLoginCheck = async () => {
    setIsLoggedIn(isLoggedIn);
  };

  useEffect(() => {
    handleLoginCheck();
    console.log('로그인 성공, 쿠키 확인:', document.cookie);
  }, [isLoggedIn]);

  return (
    <div className="max-w-md m-auto min-h-screen pb-[61px] flex flex-col items-center justify-start relative">
      {isLoggedIn || <LoginModal setIsLoggedIn={setIsLoggedIn} />}
      <Header>
        <Logo />
      </Header>
      <HomeWeatherInfo />
      {isLoggedIn && <TodayBestWearList />}
      <FooterNavi />
    </div>
  );
}
