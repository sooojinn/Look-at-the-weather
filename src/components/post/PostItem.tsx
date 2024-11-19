import { PostMeta } from '@/config/types';
import PostImg from './PostImg';
import Text from '@components/common/atom/Text';
import Tags from './Tags';
import { useNavigate } from 'react-router';
import Heart from '@components/common/atom/Heart';
import PostImgBlind from './PostImgBlind';

export default function PostItem({ ...post }: PostMeta) {
  const {
    postId,
    thumbnail,
    likeByUser,
    location: { city, district },
    weatherTags,
    temperatureTags,
    seasonTag,
    reportPost: isReported,
  } = post;

  const navigate = useNavigate();

  const onClickPostHandler = (id: number) => {
    navigate(`/post/${id}`, { state: { id: id } });
  };

  const tags = [...(weatherTags || []), ...(temperatureTags || []), seasonTag || ''];

  return (
    <div className="cursor-pointer" onClick={() => onClickPostHandler(postId)}>
      <div className="relative">
        {isReported && <PostImgBlind />}
        <PostImg imgUrl={thumbnail} />
        <div className="absolute right-3 bottom-3">
          <Heart liked={likeByUser} postId={postId} />
        </div>
      </div>
      <div className="my-2.5 px-5">
        <Text>
          {city} {district}
        </Text>
        <Tags tags={tags} />
      </div>
    </div>
  );
}
