import { EmptyHeartIcon, RedHeartIcon } from '@components/icons/heartIcons';
import { AxiosError } from 'axios';
import { useState } from 'react';
import Text from './Text';
import { deleteLike, postLike } from '@/api/apis';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '../molecules/ToastProvider';

interface HeartProps {
  fill?: string;
  liked?: boolean;
  postId: number;
  hasUserNumber?: boolean;
  likedCount?: number;
  isMyPost?: boolean;
}

interface ErrorResponse {
  errorCode: string;
  errorMessage: string;
}

export default function Heart({
  fill = 'white',
  liked = false,
  postId,
  hasUserNumber,
  likedCount: initialLikedCount,
  isMyPost,
}: HeartProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likedCount, setLikedCount] = useState(initialLikedCount);

  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      return isLiked ? await deleteLike(postId) : await postLike(postId);
    },
    onSuccess: (res) => {
      setIsLiked((prev) => !prev);
      setLikedCount(res.data.likedCount);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const { errorMessage } = error.response.data;
        console.error(errorMessage, error);
        showToast(`${errorMessage}`);
      } else {
        console.error('예상치 못한 에러가 발생했습니다.', error);
      }
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (isMyPost) showToast('내 게시물엔 좋아요를 누를 수 없습니다.');
    else toggleLikeMutation.mutate();
  };

  return (
    <div onClick={handleClick} className="flex row gap-x-2">
      {isLiked ? <RedHeartIcon /> : <EmptyHeartIcon fill={fill} />}
      {hasUserNumber && <Text color="lightGray">{likedCount || 0}</Text>}
    </div>
  );
}
