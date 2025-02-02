'use client';

import { getMyLikedPosts } from '@/api/apis';
import VirtualInfiniteScroll from '@components/common/template/VirtualInfiniteScroll';
import FooterNavi from '@components/common/FooterNavi';
import Header from '@components/common/Header';
import ProtectedRoute from '@/router/ProtectedRoute';
import MyLikedPostEmpty from '@/components/placeholder/MyLikedPostEmpty';

export default function MyLikedPost() {
  return (
    <ProtectedRoute>
      <Header>내가 좋아요한 게시물</Header>
      <div className="flex-grow">
        <VirtualInfiniteScroll
          queryKey={['post', 'list', 'myLikedPosts']}
          queryFn={getMyLikedPosts}
          headerText="내가 좋아요한 게시물"
          placeholderComp={MyLikedPostEmpty}
        />
      </div>
      <FooterNavi />
    </ProtectedRoute>
  );
}
