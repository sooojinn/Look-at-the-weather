import FooterNavi from '@/components/common/FooterNavi';
import Header from '@/components/common/Header';
import Logo from '@components/common/atom/Logo';
import HomeWeatherInfo from '@components/weather/HomeWeatherInfo';
import TodayBestWearList from '@/components/post/TodayBestWearList';
import GuidePanel from '@components/common/organism/GuidePanel';
import TempGuideModal from '@components/common/molecules/TempGuideModal';
import ManualGuide from '@components/common/template/ManualGuide';
import { useGuideManageStore } from '@/store/guideManageStore';

export default function Home() {
  const { isLookGuideModalOpen, isManualGuideModalOpen } = useGuideManageStore();
  return (
    <div className="max-w-md min-h-screen pb-[61px] flex flex-col items-center justify-start relative">
      <Header>
        <Logo />
      </Header>
      <HomeWeatherInfo />
      <GuidePanel />
      <TodayBestWearList />
      <FooterNavi />
      {isLookGuideModalOpen && <TempGuideModal />}
      {isManualGuideModalOpen && <ManualGuide />}
    </div>
  );
}
