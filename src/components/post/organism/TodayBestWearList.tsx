'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchTopLikedPosts } from '@/api/apis';
import TopLikedPostEmpty from '../../placeholder/TopLikedPostEmpty';
import PostListStatusHandler from './PostListStatusHandler';

export default function TodayBestWearList() {
  const queryResults = useQuery({
    queryKey: ['post', 'list', 'topLikedPosts'],
    queryFn: fetchTopLikedPosts,
  });

  const topLikedPosts = queryResults.data?.topLikedPosts ?? [];

  return (
    <PostListStatusHandler
      postList={topLikedPosts}
      queryResults={queryResults}
      isHorizontal
      PlaceholderComp={TopLikedPostEmpty}
    />
  );
}
