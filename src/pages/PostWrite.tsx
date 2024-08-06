import FooterNavi from '@/components/common/FooterNavi';
import Header from '@components/common/Header';
import PostWriteForm from '@components/post/PostWriteForm';

export default function () {
  return (
    <div className="pb-[61px]">
      <Header isModal={true}>게시글 작성하기</Header>
      <PostWriteForm />
      <FooterNavi />
    </div>
  );
}
