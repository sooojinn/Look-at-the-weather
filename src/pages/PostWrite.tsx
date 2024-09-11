import { BASEURL } from '@/config/constants';
import { PostFormData } from '@/config/types';
import useLocationData from '@/hooks/useLocationData';
import { showToast } from '@components/common/molecules/ToastProvider';
import PostForm from '@components/form/PostForm';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const uploadPost = async (data: PostFormData) => {
  const response = await axios.post(`${BASEURL}/posts`, data, {
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
    city: currentLocation?.city || '',
    district: currentLocation?.district || '',
    weatherTagIds: [],
    temperatureTagIds: [],
    seasonTagId: null,
    imageId: [],
  };

  const uploadMutation = useMutation({
    mutationFn: uploadPost,
    onSuccess: () => {
      navigate(-1);
      showToast('게시물이 등록되었습니다');
    },
  });

  const onSubmit = (data: PostFormData) => {
    console.log(data);
    uploadMutation.mutate(data);
  };

  return <PostForm type="작성" defaultValues={defaultValues} onSubmit={onSubmit} />;
}
