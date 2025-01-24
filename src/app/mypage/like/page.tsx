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
      <div className="min-h-screen flex flex-col">
        <Header>내가 좋아요한 게시물</Header>
        <VirtualInfiniteScroll
          queryKey="myLikedPosts"
          queryFn={getMyLikedPosts}
          headerText="내가 좋아요한 게시물"
          placeholderComp={MyLikedPostEmpty}
        />
        <FooterNavi />
      </div>
    </ProtectedRoute>
  );
}
