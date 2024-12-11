import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import Logo from '@components/common/atom/Logo';
import HomeWeatherInfo from '@components/weather/HomeWeatherInfo';
import TodayBestWearList from '@/components/post/TodayBestWearList';

export default function Home() {
  return (
    <div className="max-w-md min-h-screen flex flex-col items-center justify-start relative">
      <Header>
        <Logo />
      </Header>
      <HomeWeatherInfo />
      <TodayBestWearList />
      <FooterNavi />
    </div>
  );
}
