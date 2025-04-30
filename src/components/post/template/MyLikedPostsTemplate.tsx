import FetchErrorPlaceholder from '@/components/placeholder/FetchErrorPlaceholder';
import MyLikedPosts from '@/components/post/organism/MyLikedPosts';
import InitQuery from '@/components/provider/InitQuery';
import { BASEURL } from '@/config/constants';
import { fetchWithAuth } from '@/lib/fetcher';

export default async function MyLikedPostsTemplate() {
  try {
    const myLikedPostsData = await fetchWithAuth(`${BASEURL}/likes/posts?page=0&size=10`);

    return (
      <>
        <InitQuery
          queryKey={['post', 'list', 'myLikedPosts']}
          data={{
            pages: [myLikedPostsData],
            pageParams: [0],
          }}
        />
        <MyLikedPosts />
      </>
    );
  } catch (e) {
    console.error('내가 좋아요한 게시물 데이터 패칭 실패: ', e);
    return <FetchErrorPlaceholder />;
  }
}
