import { useEffect, useState } from 'react';
import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import Logo from '@components/common/atom/Logo';
import LoginModal from '@/components/login/LoginModal';
import HomeWeatherInfo from '@components/weather/HomeWeatherInfo';
import TodayBestWearList from '@/components/post/TodayBestWearList';
import useAuthService from '@/hooks/useAuthService';

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginCheck = async () => {
    const accessToken = localStorage.getItem('accessToken');
    setIsLoggedIn(!!accessToken);
  };

  // const { refreshAccessToken } = useAuthService();

  // refreshAccessToken();
  useEffect(() => {
    handleLoginCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) setShowLoginModal(false);
    else setShowLoginModal(true);
  }, [isLoggedIn]);

  return (
    <div className="max-w-md m-auto min-h-screen pb-[61px] flex flex-col items-center justify-start relative">
      {showLoginModal && <LoginModal />}
      <Header>
        <Logo />
      </Header>
      <HomeWeatherInfo />
      {isLoggedIn && <TodayBestWearList />}
      <FooterNavi />
    </div>
  );
}
