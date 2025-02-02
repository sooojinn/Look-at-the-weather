'use client';

import Header from '@components/common/Header';
import FooterNavi from '@components/common/FooterNavi';
import VirtualInfiniteScroll from '@components/common/template/VirtualInfiniteScroll';
import MyPostEmpty from '@/components/placeholder/MyPostEmpty';
import ProtectedRoute from '@/router/ProtectedRoute';
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
