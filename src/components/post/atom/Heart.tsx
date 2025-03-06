import Text from '../../common/atom/Text';
import RedHeartIcon from '@components/icons/hearts/RedHeartIcon';
import EmptyHeartIcon from '@components/icons/hearts/EmptyHeartIcon';

interface HeartProps {
  fill?: string;
  isLiked?: boolean;
  hasUserNumber?: boolean;
  likedCount?: number;
}

export default function Heart({ fill = 'white', isLiked = false, hasUserNumber, likedCount }: HeartProps) {
  return (
    <>
      <div className="flex items-center gap-x-2">
        {isLiked ? <RedHeartIcon /> : <EmptyHeartIcon fill={fill} />}
        {hasUserNumber && <Text>{likedCount || 0}</Text>}
      </div>
    </>
  );
}
