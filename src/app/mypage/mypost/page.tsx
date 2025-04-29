import Header from '@/components/common/organism/Header';
import FooterNavi from '@/components/common/organism/FooterNavi';
import MyPosts from '@/components/post/page/MyPosts';
import { fetchWithAuth } from '@/lib/fetcher';
import InitQuery from '@/components/provider/InitQuery';
import { BASEURL } from '@/config/constants';

export default async function MyPostsPage() {
  const myPostsData = await fetchWithAuth(`${BASEURL}/posts/me?page=0&size=10`);
  return (
    <>
      <Header>내 게시물</Header>
      <InitQuery
        queryKey={['post', 'list', 'myPosts']}
        data={{
          pages: [myPostsData],
          pageParams: [0],
        }}
      />
      <MyPosts />
      <FooterNavi />
    </>
  );
}
