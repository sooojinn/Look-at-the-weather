'use client';

import { deleteImage, editPost } from '@/api/apis';
import { ImageItem, PostFormData } from '@/config/types';
import { useDeletedImagesStore } from '@/store/deletedImagesStroe';
import { showToast } from '@/components/provider/ToastProvider';
import PostForm from '@/components/form/template/PostForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { usePostManageStore } from '@/store/postManageStore';
import { tagNameToId, tagNamesToIds } from '@/lib/utils';
import { useEffect } from 'react';

export default function PostEdit({ postId }: { postId: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { postData } = usePostManageStore((state) => ({
    postData: state.postData,
  }));
  const deletedDefaultImageIds = useDeletedImagesStore((state) => state.deletedDefaultImageIds);

  if (!postData) router.back();

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
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId], refetchType: 'none' });
      queryClient.invalidateQueries({ queryKey: ['post', 'list'], refetchType: 'none' });
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

  useEffect(() => {
    if (!postData) {
      router.back();
    }
  }, [postData, router]);

  return <PostForm type="수정" defaultValues={defaultValues} onSubmit={onSubmit} />;
}
