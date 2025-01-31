'use client';

import { getOutfitByTemperature } from '@/api/apis';
import useWeatherData from '@/hooks/useWeatherData';
import { useQuery } from '@tanstack/react-query';
import TempOutfitPostEmpty from '../placeholder/TempOutfitPostEmpty';
import HomePostListTitle from './HomePostListTitle';
import PostListStatusHandler from './PostListStatusHandler';

export default function OutfitListByTemperature() {
  const { weatherData } = useWeatherData();
  const { currentTemp } = weatherData;

  const queryResults = useQuery({
    queryKey: ['getOutfitByTemperature'],
    queryFn: () => getOutfitByTemperature(currentTemp),
    enabled: !!currentTemp,
  });

  const outfitPosts = queryResults.data?.posts ?? [];

  return (
    <div>
      <HomePostListTitle>현재 기온에 어울리는 룩</HomePostListTitle>
      <PostListStatusHandler
        postList={outfitPosts}
        queryResults={queryResults}
        isHorizontal
        PlaceholderComp={TempOutfitPostEmpty}
      />
    </div>
  );
}
