import { useEffect, useState } from 'react';
import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import Logo from '@components/common/atom/Logo';
import LoginModal from '@/components/login/LoginModal';
import HomeWeatherInfo from '@components/weather/HomeWeatherInfo';
import TodayBestWearList from '@/components/post/TodayBestWearList';
import useAuthService from '@/hooks/useAuthService';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { isLogin, getAccessToken } = useAuthService();

  const handleLoginCheck = async () => {
    const loggedIn = await isLogin();
    setIsLoggedIn(loggedIn);
    console.log(loggedIn);
    console.log(getAccessToken());
  };

  // const { refreshAccessToken } = useAuthService();

  // refreshAccessToken();
  useEffect(() => {
    handleLoginCheck();
  }, []);

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
