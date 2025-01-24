'use client';
import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import Logo from '@components/common/atom/Logo';
import HomeWeatherWidget from '@/components/weather/HomeWeatherWidget';
import TodayBestWearList from '@/components/post/TodayBestWearList';
import GuidePanel from '@components/common/organism/GuidePanel';

export default function Home() {
  return (
    <>
      <Header>
        <Logo />
      </Header>
      <div className="flex-grow pb-5">
        <HomeWeatherWidget />
        <GuidePanel />
        <TodayBestWearList />
      </div>
      <FooterNavi />
    </>
  );
}
