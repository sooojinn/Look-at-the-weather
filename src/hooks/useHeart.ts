import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { deleteLike, postLike } from '@/api/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorResponse } from '@/config/types';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { showToast } from '@/components/provider/ToastProvider';

interface UseHeartProps {
  liked: boolean;
  postId: number;
  initialLikedCount?: number;
}

export function useHeart({ liked, postId, initialLikedCount }: UseHeartProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likedCount, setLikedCount] = useState(initialLikedCount);
  const [showLoginPromptModal, setShowLoginPromptModal] = useState(false);

  const isLogin = useAuthStore((state) => state.isLogin);
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    setIsLiked(liked);
    setLikedCount(initialLikedCount);
  }, [liked, initialLikedCount]);

  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      return isLiked ? await deleteLike(postId) : await postLike(postId);
    },
    onSuccess: ({ likedCount: newLikedCount }) => {
      setIsLiked((prev) => !prev);
      setLikedCount(newLikedCount);

      // 좋아요 여부 동기화를 위해 post 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['post', 'list'], refetchType: 'none' });
      queryClient.invalidateQueries({ queryKey: ['post', 'detail', postId], refetchType: 'none' });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          showToast(`${data.errorMessage}`);
        } else if (status !== 401) {
          showToast('에러가 발생했습니다. 다시 시도해주세요.');
          console.error(`${status} 에러: ${error}`);
        }
      } else {
        console.error('예상치 못한 에러가 발생했습니다.', error);
      }
    },
  });

  const handleLikeClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (isLogin) toggleLikeMutation.mutate();
    else setShowLoginPromptModal(true);
  };

  const handleCloseLoginPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLoginPromptModal(false);
  };

  const handleContinueLogin = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push('/login');
  };

  return {
    isLiked,
    likedCount,
    showLoginPromptModal,
    handleLikeClick,
    handleCloseLoginPrompt,
    handleContinueLogin,
  };
}
