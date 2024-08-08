import PostWriteForm from '@components/form/PostWriteForm';

export default function PostWrite() {
  const defaultValues = {
    title: '',
    content: '',
    location: null,
    weatherTagIds: [],
    temperatureTagIds: [],
    seasonTagId: null,
  };

  return <PostWriteForm header="게시글 수정하기" defaultValues={defaultValues} />;
}
