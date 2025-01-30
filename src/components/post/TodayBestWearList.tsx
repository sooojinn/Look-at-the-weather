'use client';

import { useQuery } from '@tanstack/react-query';
import Spinner from '@components/icons/Spinner';
import Text from '@components/common/atom/Text';
import { fetchTopLikedPosts, getOutfitByTemperature } from '@/api/apis';
import HorizonScrollPostList from '@components/common/molecules/HorizonScrollPostList';
import useWeatherData from '@/hooks/useWeatherData';
import TopLikedPostEmpty from '../placeholder/TopLikedPostEmpty';
import TempOutfitPostEmpty from '../placeholder/TempOutfitPostEmpty';
import TodayBestWearCriteriaBtn from './TodayBestWearCriteriaBtn';

export default function TodayBestWearList() {
  const { weatherData } = useWeatherData();
  const { currentTemp } = weatherData;

  const {
    data: topLikedRes,
    isLoading,
    isSuccess: isTopLikedPostsSuccess,
  } = useQuery({
    queryKey: ['topLikedPosts'],
    queryFn: fetchTopLikedPosts,
  });

  const { data: outfitRes, isSuccess: isOutfitSuccess } = useQuery({
    queryKey: ['getOutfitByTemperature'],
    queryFn: () => getOutfitByTemperature(currentTemp),
    enabled: !!currentTemp,
  });

  const topLikedPosts = topLikedRes?.topLikedPosts ?? [];
  const outfitPosts = outfitRes?.posts ?? [];

  return (
    <>
      <div className="mb-[24px]">
        <Text size="l" weight="bold" className="flex justify-start items-center h-[60px] px-5">
          현재 기온에 어울리는 룩
        </Text>
        {isOutfitSuccess && outfitPosts.length ? (
          <HorizonScrollPostList postList={outfitPosts} padding="0 20px" />
        ) : (
          <TempOutfitPostEmpty />
        )}
      </div>

      <div className="flex items-center gap-[4px] px-5">
        <Text size="l" weight="bold" className="flex justify-start items-center h-[60px]">
          오늘의 베스트 룩
        </Text>
        <TodayBestWearCriteriaBtn />
      </div>

      {isTopLikedPostsSuccess &&
        (topLikedPosts.length ? (
          <HorizonScrollPostList postList={topLikedPosts} padding="0 20px" />
        ) : (
          <TopLikedPostEmpty />
        ))}
      {isLoading && (
        <div className="flex flex-grow justify-center items-center">
          <Spinner />
        </div>
      )}
    </>
  );
}
