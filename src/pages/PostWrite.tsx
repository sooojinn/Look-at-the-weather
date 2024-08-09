import useLocationData from '@/hooks/useLocationData';
import PostWriteForm from '@components/form/PostWriteForm';

export default function PostWrite() {
  const { location, isFetched } = useLocationData();

  const defaultValues = {
    title: '',
    content: '',
    location: location,
    weatherTagIds: [],
    temperatureTagIds: [],
    seasonTagId: null,
  };

  return <>{isFetched && <PostWriteForm header="게시글 수정하기" defaultValues={defaultValues} />}</>;
}
