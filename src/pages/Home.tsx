import { useEffect, useState } from 'react';
import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import LoginModal from '@/components/login/LoginModal';
<<<<<<< HEAD
import HomeWeatherInfo from '@components/weather/HomeWeatherInfo';
import TodayBestWearList from '@components/post/TodayBestWearList';
import Logo from '@components/common/atom/Logo';
=======
import WeatherInfo from '@/components/home/WeatherInfo';
import TodayBestWearList from '@/components/home/TodayBestWearList';
import useAuthService from '@/hooks/useAuthService';
>>>>>>> origin/refactor/issue-42

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { isLogin } = useAuthService();

  const handleLoginCheck = async () => {
    const loggedIn = await isLogin();
    setIsLoggedIn(loggedIn);
  };

  useEffect(() => {
<<<<<<< HEAD
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    if (accessToken && refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
=======
    handleLoginCheck();
>>>>>>> origin/refactor/issue-42
  }, []);

  return (
    <div className="max-w-md m-auto min-h-screen pb-[61px] flex flex-col items-center justify-start relative">
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
