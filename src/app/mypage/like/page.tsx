import FooterNavi from '@/components/common/organism/FooterNavi';
import Header from '@/components/common/organism/Header';
import MyLikedPostsTemplate from '@/components/post/template/MyLikedPostsTemplate';

export default function MyLikedPostsPage() {
  return (
    <>
      <Header>내가 좋아요한 게시물</Header>
      <MyLikedPostsTemplate />
      <FooterNavi />
    </>
  );
}
