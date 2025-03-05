import { useGuideManageStore } from '@/store/guideManageStore';
import Text from '../atom/Text';
import CloseBtn from '@components/icons/CloseBtn';
import { useQuery } from '@tanstack/react-query';
import { getOutfitGuide } from '@/api/apis';
import useWeatherData from '@/hooks/useWeatherData';
import Image from 'next/image';

export default function TempGuideModal() {
  const { isLookGuideModalOpen, setIsLookGuideModal } = useGuideManageStore();

  const { weatherData } = useWeatherData();
  const { currentTemp } = weatherData;

  const {
    data: response,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ['outfitGuide', currentTemp],
    queryFn: () => getOutfitGuide(currentTemp),
    staleTime: Infinity,
  });

  if (isLoading) return null;
  if (isError) return null;
  if (!response) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-opacity-black50 flex justify-center items-center z-50">
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
              {response.outfit} 등
            </Text>
          </div>
          <div className="flex justify-evenly w-full h-[180px] bg-background-lightGray mb-4">
            {isSuccess && (
              <>
                <Image
                  src={response.outfitImages[0]}
                  alt="outfit 1"
                  width={109}
                  height={100}
                  className="h-full w-auto"
                />
                <Image
                  src={response.outfitImages[1]}
                  alt="outfit 2"
                  width={109}
                  height={100}
                  className="h-full w-auto"
                />
              </>
            )}
          </div>
          <div>
            <Text color="gray" size="s">
              {response.categorySentence}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
