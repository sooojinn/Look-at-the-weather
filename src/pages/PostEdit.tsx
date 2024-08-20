import { BASEURL } from '@/config/constants';
import { PostFormData } from '@/config/types';
import { showToast } from '@components/common/molecules/ToastProvider';
import PostForm from '@components/form/PostForm';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const editPost = async ({ postId, data }: { postId: number; data: PostFormData }) => {
  const response = await axios.put(`${BASEURL}/api/v1/posts/${postId}`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export default function PostEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = location.pathname.split('/');
  const postId = +pathnames[pathnames.length - 2];

  // 임시 데이터
  const defaultValues = {
    title: '수정페이지',
    content: '테스트',
    location: {
      city: '서울시',
      district: '송파구',
    },
    weatherTagIds: [1, 2],
    temperatureTagIds: [6],
    seasonTagId: 12,
    imageId: [3, 4],
  };

  const defaultImages = [
    {
      id: 3,
      url: 'https://contents-cdn.viewus.co.kr/image/2023/12/CP-2022-0017/image-aba00dcb-3a74-48e0-b243-77e8eedd661a.jpeg',
    },
    {
      id: 4,
      url: 'https://cdn.ggilbo.com/news/photo/202108/862980_692553_1953.jpg',
    },
  ];

  const editMutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      navigate(`/post/${postId}`);
      showToast('게시물이 수정되었습니다');
    },
  });

  const onSubmit = (data: PostFormData) => {
    console.log(data);
    editMutation.mutate({ postId, data });
  };

  return <PostForm type="수정" defaultValues={defaultValues} onSubmit={onSubmit} defaultImages={defaultImages} />;
}
