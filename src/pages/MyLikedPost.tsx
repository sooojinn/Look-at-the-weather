import { PostList } from '@components/post/PostList';
import Header from '@components/common/Header';
import { getMyLikedPosts } from '@/api/apis';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import FooterNavi from '@components/common/FooterNavi';
import { showToast } from '@components/common/molecules/ToastProvider';
import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';
import NoPostImg from '@components/icons/placeholders/NoPostImg';
import { useNavigate } from 'react-router-dom';
import InfiniteScrollLoading from '@components/common/molecules/InfiniteScrollLoading';

export default function MyLikedPost() {
  const { isFetchingNextPage, isLoading, isError, error, isSuccess, pageEndRef, postList } = useInfiniteScroll(
    ['myLikedPosts'],
    getMyLikedPosts,
    10,
  );

  if (isError) {
    console.error(error.message);
    showToast('내가 좋아요한 게시물을 불러오는 데 실패했습니다.');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header>내가 좋아요한 게시물</Header>
      {isSuccess && (postList.length ? <PostList postList={postList} /> : <MyLikedPostEmpty />)}
      <div ref={pageEndRef}></div>
      {(isLoading || isFetchingNextPage) && <InfiniteScrollLoading />}
      <FooterNavi />
    </div>
  );
}

function MyLikedPostEmpty() {
  const navigate = useNavigate();
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
      btnFunc={() => navigate('/post')}
    />
  );
}
