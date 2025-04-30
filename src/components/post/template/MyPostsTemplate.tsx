import FetchErrorPlaceholder from '@/components/placeholder/FetchErrorPlaceholder';
import InitQuery from '@/components/provider/InitQuery';
import { BASEURL } from '@/config/constants';
import { fetchWithAuth } from '@/lib/fetcher';
import MyPosts from '../organism/MyPosts';

export default async function MyPostsTemplate() {
  try {
    const myPostsData = await fetchWithAuth(`${BASEURL}/posts/me?page=0&size=10`);
    return (
      <>
        <InitQuery
          queryKey={['post', 'list', 'myPosts']}
          data={{
            pages: [myPostsData],
            pageParams: [0],
          }}
        />
        <MyPosts />
      </>
    );
  } catch (e) {
    console.error('내 게시물 데이터 패칭 실패: ', e);
    return <FetchErrorPlaceholder />;
  }
}
