import FooterNavi from '@/components/common/FooterNavi';
import Header from '@components/common/Header';

export default function () {
  return (
    <div>
      <Header isModal={true}>게시글 작성하기</Header>
      게시글 작성 페이지
      <FooterNavi />
    </div>
  );
}
