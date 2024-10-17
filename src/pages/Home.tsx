import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import Logo from '@components/common/atom/Logo';
import LoginModal from '@/components/login/LoginModal';
import HomeWeatherInfo from '@components/weather/HomeWeatherInfo';
import TodayBestWearList from '@/components/post/TodayBestWearList';
import { useAuthStore } from '@/store/authStore';

export default function Home() {
  const { isLogin } = useAuthStore();

  return (
    <div className="max-w-md m-auto min-h-screen pb-[61px] flex flex-col items-center justify-start relative">
      {isLogin || <LoginModal />}
      <Header>
        <Logo />
      </Header>
      <HomeWeatherInfo />
      {isLogin && <TodayBestWearList />}
      <FooterNavi />
    </div>
  );
}
