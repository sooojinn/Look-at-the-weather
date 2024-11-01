import { AxiosError } from 'axios';
import { useState } from 'react';
import Text from './Text';
import { deleteLike, postLike } from '@/api/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast } from '../molecules/ToastProvider';
import { ErrorResponse } from '@/config/types';
import { PostDetail } from '@pages/PostDetail';
import RedHeartIcon from '@components/icons/hearts/RedHeartIcon';
import EmptyHeartIcon from '@components/icons/hearts/EmptyHeartIcon';
import { useAuthStore } from '@/store/authStore';
import AlertModal from '../organism/AlertModal';
import Button from '../molecules/Button';
import { useNavigate } from 'react-router-dom';

interface HeartProps {
  fill?: string;
  liked?: boolean;
  postId: number;
  hasUserNumber?: boolean;
  likedCount?: number;
}

export default function Heart({
  fill = 'white',
  liked = false,
  postId,
  hasUserNumber,
  likedCount: initialLikedCount,
}: HeartProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likedCount, setLikedCount] = useState(initialLikedCount);
  const [showLoginPromptModal, setShowLoginPromptModal] = useState(false);

  const isLogin = useAuthStore((state) => state.isLogin);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      return isLiked ? await deleteLike(postId) : await postLike(postId);
    },
    onSuccess: (res) => {
      setIsLiked((prev) => !prev);
      setLikedCount(res.data.likedCount);
      queryClient.setQueryData(['postDetail', postId], (oldData: PostDetail) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          likeByUser: !oldData.likeByUser,
          likedCount: res.data.likedCount,
        };
      });
      queryClient.removeQueries({ queryKey: ['myLikedPosts'] });
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
    if (isLogin) toggleLikeMutation.mutate();
    else setShowLoginPromptModal(true);
  };

  return (
    <div onClick={handleClick} className="flex row gap-x-2">
      {isLiked ? <RedHeartIcon /> : <EmptyHeartIcon fill={fill} />}
      {hasUserNumber && <Text color="lightGray">{likedCount || 0}</Text>}
      {showLoginPromptModal && (
        <AlertModal
          boldMessage={
            <>
              해당 기능은 로그인 후<br />
              사용 가능합니다.
            </>
          }
          regularMessage="로그인하시겠습니까?"
          buttons={
            <>
              <Button
                size="m"
                type="sub"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLoginPromptModal(false);
                }}
              >
                취소
              </Button>
              <Button size="m" onClick={() => navigate('/login')}>
                로그인
              </Button>
            </>
          }
        />
      )}
    </div>
  );
}
