'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchTopLikedPosts } from '@/api/apis';
import TopLikedPostEmpty from '../placeholder/TopLikedPostEmpty';
import TodayBestWearCriteriaBtn from './TodayBestWearCriteriaBtn';
import HomePostListTitle from './HomePostListTitle';
import PostListStatusHandler from './PostListStatusHandler';

export default function TodayBestWearList() {
  const queryResults = useQuery({
    queryKey: ['topLikedPosts'],
    queryFn: fetchTopLikedPosts,
  });

  const topLikedPosts = queryResults.data?.topLikedPosts ?? [];

  return (
    <div>
      <HomePostListTitle>
        오늘의 베스트 룩
        <TodayBestWearCriteriaBtn />
      </HomePostListTitle>
      <PostListStatusHandler
        postList={topLikedPosts}
        queryResults={queryResults}
        isHorizontal
        PlaceholderComp={TopLikedPostEmpty}
      />
    </div>
  );
}
