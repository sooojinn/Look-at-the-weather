import { editPost } from '@/api/apis';
import { TAGS } from '@/config/constants';
import { PostFormData } from '@/config/types';
import { showToast } from '@components/common/molecules/ToastProvider';
import PostForm from '@components/form/PostForm';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

function tagNameToId(tagName: string) {
  const tag = TAGS.find((tag) => tagName === tag.name);
  return tag?.id as number;
}

function tagNamesToIds(tagNames: string[]) {
  return tagNames.map((tagName) => tagNameToId(tagName));
}

export default function PostEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { postData, postId } = location.state;
  console.log(postData);

  const {
    title,
    content,
    location: { city, district },
    weatherTags,
    temperatureTags,
    seasonTag,
  } = postData;

  const imageList: { imageId: number; url: string }[] = postData.images.image;
  const imageId = imageList.map((img) => img.imageId);
  const defaultImages = imageList.map(({ imageId, url }) => ({ id: imageId, url }));

  const defaultValues = {
    title,
    content,
    city,
    district,
    weatherTagIds: tagNamesToIds(weatherTags),
    temperatureTagIds: tagNamesToIds(temperatureTags),
    seasonTagId: tagNameToId(seasonTag),
    imageId,
  };

  const editMutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      navigate(`/post/${postId}`);
      showToast('게시물이 수정되었습니다.');
    },
    onError: (error) => {
      console.error(error);
      showToast('게시물을 수정하는 데 실패했습니다.');
    },
  });

  const onSubmit = (data: PostFormData) => {
    console.log(data);
    editMutation.mutate({ postId, data });
  };

  return <PostForm type="수정" defaultValues={defaultValues} onSubmit={onSubmit} defaultImages={defaultImages} />;
}
