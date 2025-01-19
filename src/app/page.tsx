'use client';
import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import Logo from '@components/common/atom/Logo';
import HomeWeatherWidget from '@/components/weather/HomeWeatherWidget';
import TodayBestWearList from '@/components/post/TodayBestWearList';
import GuidePanel from '@components/common/organism/GuidePanel';

export default function Home() {
  return (
    <div className="max-w-md min-h-screen flex flex-col items-center justify-start relative">
      <Header>
        <Logo />
      </Header>
      <HomeWeatherWidget />
      <GuidePanel />
      <TodayBestWearList />
      <FooterNavi />
    </div>
  );
}
