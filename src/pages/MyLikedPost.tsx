import { PostList } from '@components/post/PostList';
import Header from '@components/common/Header';
import { getMyLikedPosts } from '@/api/apis';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import Spinner from '@components/icons/Spinner';
import FooterNavi from '@components/common/FooterNavi';
import { showToast } from '@components/common/molecules/ToastProvider';
import StatusPlaceholder from '@components/common/organism/StatusPlaceholder';
import NoPost from '@components/icons/NoPost';
import { useNavigate } from 'react-router-dom';

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
    <div className="h-screen flex flex-col pb-[61px]">
      <Header>내가 좋아요한 게시물</Header>
      {isSuccess && (postList.length ? <PostList postList={postList} /> : <MyLikedPostEmpty />)}
      <div ref={pageEndRef}></div>
      {(isLoading || isFetchingNextPage) && (
        <div className="my-5 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <FooterNavi />
    </div>
  );
}

function MyLikedPostEmpty() {
  const navigate = useNavigate();
  return (
    <StatusPlaceholder
      ImgComp={NoPost}
      boldMessage="좋아요한 게시물이 없어요"
      lightMessage={
        <>
          맘에 드는 코디를 좋아요 하면
          <br />
          언제든 다시 볼 수 있어요.
        </>
      }
      btnText="둘러보기"
      btnFunc={() => navigate('/post')}
    />
  );
}
