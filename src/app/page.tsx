'use client';
import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import Logo from '@components/common/atom/Logo';
import HomeWeatherWidget from '@/components/weather/HomeWeatherWidget';
import TodayBestWearList from '@/components/post/TodayBestWearList';
import GuidePanel from '@components/common/organism/GuidePanel';
import TempGuideModal from '@components/common/molecules/TempGuideModal';
import ManualGuide from '@components/common/molecules/ManualGuide';
import { useGuideManageStore } from '@/store/guideManageStore';

export default function Home() {
  const { isLookGuideModalOpen, isManualGuideModalOpen } = useGuideManageStore();
  return (
    <div className="max-w-md min-h-screen flex flex-col items-center justify-start relative">
      <Header>
        <Logo />
      </Header>
      <HomeWeatherWidget />
      <GuidePanel />
      <TodayBestWearList />
      <FooterNavi />
      {isLookGuideModalOpen && <TempGuideModal />}
      {isManualGuideModalOpen && <ManualGuide />}
    </div>
  );
}
