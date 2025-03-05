import Text from '../../common/atom/Text';
import RedHeartIcon from '@components/icons/hearts/RedHeartIcon';
import EmptyHeartIcon from '@components/icons/hearts/EmptyHeartIcon';
import LoginPromptModal from '@/components/modal/LoginPromptModal';
import { useHeart } from '@/hooks/useHeart';

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
  const { isLiked, likedCount, showLoginPromptModal, handleLikeClick, handleCloseLoginPrompt, handleContinueLogin } =
    useHeart({ liked, postId, initialLikedCount });

  return (
    <>
      <div onClick={handleLikeClick} className="flex items-center gap-x-2">
        {isLiked ? <RedHeartIcon /> : <EmptyHeartIcon fill={fill} />}
        {hasUserNumber && <Text>{likedCount || 0}</Text>}
      </div>
      {showLoginPromptModal && <LoginPromptModal onCancel={handleCloseLoginPrompt} onContinue={handleContinueLogin} />}
    </>
  );
}
