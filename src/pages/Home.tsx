import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import FooterNavi from '../components/common/FooterNavi';
import Header from '../components/common/Header';
import LoginModal from '../components/login/LoginModal';
import WeatherInfo from '../components/home/WeatherInfo';
import TodayBestWearList from '../components/home/TodayBestWearList';

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
    <div className="max-w-md m-auto min-h-screen pb-[61px] flex flex-col items-center justify-start relative">
      {isLoggedIn || <LoginModal setIsLoggedIn={setIsLoggedIn} />}
      <Header>로고</Header>
      <WeatherInfo />
      <TodayBestWearList />
      <FooterNavi />
    </div>
  );
}
