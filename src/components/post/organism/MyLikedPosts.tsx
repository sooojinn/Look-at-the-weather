'use client';

import { getMyLikedPosts } from '@/api/apis';
import VirtualInfiniteScroll from './VirtualInfiniteScroll';
import MyLikedPostEmpty from '@/components/placeholder/MyLikedPostEmpty';

export default function MyLikedPosts() {
  return (
    <div className="flex-grow">
      <VirtualInfiniteScroll
        queryKey={['post', 'list', 'myLikedPosts']}
        queryFn={getMyLikedPosts}
        headerText="내가 좋아요한 게시물"
        placeholderComp={MyLikedPostEmpty}
      />
    </div>
  );
}
