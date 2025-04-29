'use client';

import { getMyPosts } from '@/api/apis';
import VirtualInfiniteScroll from '../organism/VirtualInfiniteScroll';
import MyPostEmpty from '@/components/placeholder/MyPostEmpty';

export default function MyPosts() {
  return (
    <div className="flex-grow">
      <VirtualInfiniteScroll
        queryKey={['post', 'list', 'myPosts']}
        queryFn={getMyPosts}
        headerText="내 게시물"
        placeholderComp={MyPostEmpty}
      />
    </div>
  );
}
