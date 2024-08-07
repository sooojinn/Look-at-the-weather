import Header from '@components/common/Header';
import PostWriteForm from '@components/form/PostWriteForm';

export default function () {
  return (
    <>
      <Header isModal={true}>게시글 작성하기</Header>
      <PostWriteForm />
    </>
  );
}
