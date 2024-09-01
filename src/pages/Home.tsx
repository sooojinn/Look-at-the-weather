import { useEffect, useState } from 'react';
import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import LoginModal from '@/components/login/LoginModal';
import WeatherInfo from '@/components/home/WeatherInfo';
import TodayBestWearList from '@/components/home/TodayBestWearList';
import useAuthService from '@/hooks/useAuthService';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { isLogin } = useAuthService();

  const handleLoginCheck = async () => {
    const loggedIn = await isLogin();
    setIsLoggedIn(loggedIn);
  };

  useEffect(() => {
    handleLoginCheck();
  }, []);

  return (
    <div className="max-w-md m-auto min-h-screen flex flex-col items-center justify-start relative">
      <Header>로고</Header>
      <WeatherInfo />
      {isLoggedIn ? <TodayBestWearList /> : <LoginModal setIsLoggedIn={setIsLoggedIn} />}
      <FooterNavi />
    </div>
  );
}
