import FooterNavi from '@/components/common/organism/FooterNavi';
import Header from '@/components/common/organism/Header';
import MyLikedPosts from '@/components/post/page/MyLikedPosts';
import InitQuery from '@/components/provider/InitQuery';
import { BASEURL } from '@/config/constants';
import { fetchWithAuth } from '@/lib/fetcher';

export default async function MyLikedPostsPage() {
  const myLikedPostsData = await fetchWithAuth(`${BASEURL}/likes/posts?page=0&size=10`);

  return (
    <>
      <Header>내가 좋아요한 게시물</Header>
      <InitQuery
        queryKey={['post', 'list', 'myLikedPosts']}
        data={{
          pages: [myLikedPostsData],
          pageParams: [0],
        }}
      />
      <MyLikedPosts />
      <FooterNavi />
    </>
  );
}
