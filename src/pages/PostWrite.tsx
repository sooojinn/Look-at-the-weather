import useLocationData from '@/hooks/useLocationData';
import PostWriteForm from '@components/form/PostWriteForm';

export default function PostWrite() {
  const { location: currentLocation } = useLocationData();

  const defaultValues = {
    title: '',
    content: '',
    location: currentLocation,
    weatherTagIds: [],
    temperatureTagIds: [],
    seasonTagId: null,
  };

  return <PostWriteForm header="게시글 수정하기" defaultValues={defaultValues} />;
}
