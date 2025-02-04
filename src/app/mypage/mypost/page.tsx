'use client';

import Header from '@/components/common/organism/Header';
import FooterNavi from '@/components/common/organism/FooterNavi';
import VirtualInfiniteScroll from '@components/common/template/VirtualInfiniteScroll';
import MyPostEmpty from '@/components/placeholder/MyPostEmpty';
import ProtectedRoute from '@/components/route/ProtectedRoute';
import { getMyPosts } from '@/api/apis';

export default function MyPost() {
  return (
    <ProtectedRoute>
      <Header>내 게시물</Header>
      <div className="flex-grow">
        <VirtualInfiniteScroll
          queryKey={['post', 'list', 'myPosts']}
          queryFn={getMyPosts}
          headerText="내 게시물"
          placeholderComp={MyPostEmpty}
        />
      </div>
      <FooterNavi />
    </ProtectedRoute>
  );
}
