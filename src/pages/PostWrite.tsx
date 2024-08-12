import { BASEURL } from '@/config/constants';
import { PostFormData } from '@/config/types';
import useLocationData from '@/hooks/useLocationData';
import PostWriteForm from '@components/form/PostWriteForm';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const postForm = async (data: PostFormData) => {
  const response = await axios.post(`${BASEURL}/api/v1/posts`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export default function PostWrite() {
  const { location: currentLocation } = useLocationData();

  const defaultValues = {
    title: '',
    content: '',
    location: currentLocation,
    weatherTagIds: [],
    temperatureTagIds: [],
    seasonTagId: null,
    imageId: [],
  };

  const mutation = useMutation({
    mutationFn: postForm,
  });

  const onSubmit = (data: PostFormData) => {
    console.log(data);
    mutation.mutate(data);
  };

  return <PostWriteForm header="게시글 작성하기" defaultValues={defaultValues} onSubmit={onSubmit} />;
}
