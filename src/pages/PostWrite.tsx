import { BASEURL } from '@/config/constants';
import { PostFormData } from '@/config/types';
import useLocationData from '@/hooks/useLocationData';
import { showToast } from '@components/common/molecules/ToastProvider';
import PostWriteForm from '@components/form/PostWriteForm';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    onSuccess: () => {
      navigate(-1);
      showToast('게시물이 등록되었습니다');
    },
  });

  const onSubmit = (data: PostFormData) => {
    console.log(data);
    mutation.mutate(data);
  };

  return <PostWriteForm header="게시글 작성하기" defaultValues={defaultValues} onSubmit={onSubmit} />;
}
