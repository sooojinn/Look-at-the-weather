'use client';

import { getMyLikedPosts } from '@/api/apis';
import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';
import NoPostImg from '@components/icons/placeholders/NoPostImg';
import VirtualInfiniteScroll from '@components/common/template/VirtualInfiniteScroll';
import FooterNavi from '@components/common/FooterNavi';
import Header from '@components/common/Header';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/router/ProtectedRoute';

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

function MyLikedPostEmpty() {
  const router = useRouter();
  return (
    <StatusPlaceholder
      ImgComp={NoPostImg}
      boldMessage="좋아요한 게시물이 없어요"
      lightMessage={
        <>
          맘에 드는 룩을 좋아요 하면
          <br />
          언제든 다시 볼 수 있어요.
        </>
      }
      btnText="둘러보기"
      btnFunc={() => router.push('/post')}
    />
  );
}
