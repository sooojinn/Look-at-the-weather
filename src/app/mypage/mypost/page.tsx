import Header from '@/components/common/organism/Header';
import FooterNavi from '@/components/common/organism/FooterNavi';
import MyPostsTemplate from '@/components/post/template/MyPostsTemplate';

export default async function MyPostsPage() {
  return (
    <>
      <Header>내 게시물</Header>
      <MyPostsTemplate />
      <FooterNavi />
    </>
  );
}
