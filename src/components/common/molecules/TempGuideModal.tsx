import { useGuideManageStore } from '@/store/guideManageStore';
import Text from '../atom/Text';
import CloseBtn from '@components/icons/CloseBtn';
import YellowShirts from '@components/icons/clothes/YellowShirts';
import YellowJacket from '@components/icons/clothes/YellowJacket';
import { useQuery } from '@tanstack/react-query';
import { getOutfitGuide } from '@/api/apis';
import useLocationData from '@/hooks/useLocationData';
import useWeatherData from '@/hooks/useWeatherData';
import { useEffect } from 'react';

export default function TempGuideModal() {
  const { isLookGuideModalOpen, setIsLookGuideModal } = useGuideManageStore();

  const { geoPoint } = useLocationData();
  const { weatherData } = useWeatherData(geoPoint);
  const { currentTemp } = weatherData;

  const { data: response } = useQuery({
    queryKey: ['getOutfitGuide', currentTemp],
    queryFn: () => getOutfitGuide(currentTemp),
    staleTime: Infinity,
  });

  useEffect(() => {
    console.log('response', response);
  }, [response]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-black70 flex justify-center items-center z-50">
      <div className="absolute bottom-0 bg-white px-5 rounded-t-3xl max-w-md w-full">
        <div className="flex justify-end py-[13px]">
          <CloseBtn onClick={() => setIsLookGuideModal(!isLookGuideModalOpen)} />
        </div>
        <div className="flex flex-col text-center items-center mb-[40px]">
          <div className="flex flex-col gap-2 mb-5">
            <Text color="main" weight="bold">
              오늘의 추천 룩
            </Text>
            <Text size="2xl" weight="bold">
              자켓, 셔츠, 가디건, 간절기 야상 등
            </Text>
          </div>
          <div className="flex justify-center w-full h-[180px] bg-background-lightGray mb-4">
            <YellowShirts />
            <YellowJacket />
          </div>
          <div>
            <Text color="gray" size="s">
              12℃~16℃ 에 적합한 룩이에요
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
