import { BASEURL } from '@/config/constants';
import { PostFormData } from '@/config/types';
import { useGeoPointQuery, useLocationQuery } from '@/hooks/useLocationAndWeatherData';
import { showToast } from '@components/common/molecules/ToastProvider';
import PostForm from '@components/form/PostForm';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePostStore } from '@/store/postStore';

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
  const { data: geoPoint } = useGeoPointQuery();
  const { data: currentLocation } = useLocationQuery(geoPoint);

  const postId = usePostStore((state) => state.postId);

  const navigate = useNavigate();
  // const location = useLocation();
  // useLocation 으로 전달 시 url 변경으로 setState 초기화, postId로 api 재요청 진행방법 고려
  console.log(postId);

  const defaultValues = {
    title: '',
    content: '',
    location: currentLocation || { city: '', district: '' },
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
