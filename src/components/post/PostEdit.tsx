'use client';

import { deleteImage, editPost } from '@/api/apis';
import { ImageItem, PostFormData } from '@/config/types';
import { useDeletedImagesStore } from '@/store/deletedImagesStroe';
import { showToast } from '@components/common/molecules/ToastProvider';
import PostForm from '@components/form/PostForm';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { usePostManageStore } from '@/store/postManageStore';
import ProtectedRoute from '@/router/ProtectedRoute';
import { tagNameToId, tagNamesToIds } from '@/lib/utils';

export default function PostEdit({ postId }: { postId: number }) {
  const router = useRouter();
  const { postData } = usePostManageStore((state) => ({
    postData: state.postData,
  }));
  const deletedDefaultImageIds = useDeletedImagesStore((state) => state.deletedDefaultImageIds);

  const {
    title = '',
    content = '',
    location: { city = '', district = '' } = {},
    gender = '',
    temperature = '',
    weatherTags = [],
    temperatureTags = [],
    seasonTag = '',
    images = { image: [] },
  } = postData || {};

  const imageList = postData?.images.image;
  const imageIds = imageList?.map((img: ImageItem) => img.imageId);

  const defaultValues = {
    title: title || '',
    content: content || '',
    city: city || '',
    district: district || '',
    temperature: temperature || '',
    gender: tagNameToId(gender) as string | null,
    weatherTagIds: tagNamesToIds(weatherTags) || [],
    temperatureTagIds: tagNamesToIds(temperatureTags) || [],
    seasonTagId: tagNameToId(seasonTag) ?? null,
    imageIds: imageIds || [],
    images: images?.image || [],
  };

  const editMutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      router.back();
      showToast('게시물이 수정되었습니다.');
    },
    onError: (error) => {
      console.error(error);
      showToast('게시물을 수정하는 데 실패했습니다.');
    },
  });

  const deleteDefaultImageMutation = useMutation({
    mutationFn: deleteImage,
    onError: (error) => {
      console.error(error);
      showToast('게시물을 수정하는 데 실패했습니다.');
    },
  });

  const deleteDefaultImages = (imageIds: number[]) => {
    imageIds.forEach((id) => {
      deleteDefaultImageMutation.mutate(id);
    });
  };

  const onSubmit = (data: PostFormData) => {
    if (deletedDefaultImageIds.length) {
      deleteDefaultImages(deletedDefaultImageIds);
    }
    editMutation.mutate({ postId, data });
  };

  return (
    <ProtectedRoute>
      <PostForm type="수정" defaultValues={defaultValues} onSubmit={onSubmit} />
    </ProtectedRoute>
  );
}
