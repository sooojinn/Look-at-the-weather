import LoginPromptModal from '@/components/modal/LoginPromptModal';
import { useHeart } from '@/hooks/useHeart';
import Heart from '../atom/Heart';

interface HeartProps {
  fill?: string;
  liked?: boolean;
  postId: number;
  hasUserNumber?: boolean;
  likedCount?: number;
}

export default function PostHeart({
  fill = 'white',
  liked = false,
  postId,
  hasUserNumber,
  likedCount: initialLikedCount,
}: HeartProps) {
  const { isLiked, likedCount, showLoginPromptModal, handleLikeClick, handleCloseLoginPrompt, handleContinueLogin } =
    useHeart({ liked, postId, initialLikedCount });

  return (
    <>
      <div onClick={handleLikeClick}>
        <Heart fill={fill} isLiked={isLiked} likedCount={likedCount} hasUserNumber={hasUserNumber} />
      </div>
      {showLoginPromptModal && <LoginPromptModal onCancel={handleCloseLoginPrompt} onContinue={handleContinueLogin} />}
    </>
  );
}
