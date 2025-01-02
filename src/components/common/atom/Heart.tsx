import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Text from './Text';
import { deleteLike, postLike } from '@/api/apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast } from '../molecules/ToastProvider';
import { ErrorResponse } from '@/config/types';
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

  if (!isLogin) return null;

  useEffect(() => {
    setIsLiked(liked);
    setLikedCount(initialLikedCount);
  }, [liked, initialLikedCount]);

  const toggleLikeMutation = useMutation({
    mutationFn: async () => {
      return isLiked ? await deleteLike(postId) : await postLike(postId);
    },
    onSuccess: ({ likedCount }) => {
      setIsLiked((prev) => !prev);
      setLikedCount(likedCount);
      queryClient.removeQueries({ queryKey: ['myLikedPosts'] });
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

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // if (isLogin) toggleLikeMutation.mutate();
    // else setShowLoginPromptModal(true);
    toggleLikeMutation.mutate();
  };

  return (
    <div onClick={handleClick} className="flex items-center gap-x-2">
      {isLiked ? <RedHeartIcon /> : <EmptyHeartIcon fill={fill} />}
      {hasUserNumber && <Text>{likedCount || 0}</Text>}
      {showLoginPromptModal && (
        <AlertModal
          boldMessage="로그인 필요"
          regularMessage={
            <>
              해당 기능은 로그인 후 사용 가능합니다.
              <br />
              로그인 하시겠습니까?
            </>
          }
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
