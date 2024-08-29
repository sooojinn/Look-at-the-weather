import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import LoginModal from '@/components/login/LoginModal';
import HomeWeatherInfo from '@components/weather/HomeWeatherInfo';
import TodayBestWearList from '@components/post/TodayBestWearList';
import Logo from '@components/common/atom/Logo';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="max-w-md m-auto min-h-screen pb-[61px] flex flex-col relative">
      {isLoggedIn || <LoginModal setIsLoggedIn={setIsLoggedIn} />}
      <Header>
        <Logo />
      </Header>
      <HomeWeatherInfo />
      <TodayBestWearList />
      <FooterNavi />
    </div>
  );
}
