import { PostMeta } from '@/config/types';
import PostListImg from './PostListImg';
import Text from '@components/common/atom/Text';
import Tags from './Tags';
import { useNavigate } from 'react-router';

export default function PostItem({ ...post }: PostMeta) {
  const {
    postId,
    thumbnail,
    likeByUser,
    location: { city, district },
    weatherTags,
    temperatureTags,
    seasonTag,
    reportPost,
  } = post;

  const navigate = useNavigate();

  const onClickPostHandler = (id: number) => {
    navigate(`/post/${id}`, { state: { id: id } });
  };

  const tags = [...(weatherTags || []), ...(temperatureTags || []), seasonTag || ''];

  return (
    <div className="min-h-[312px] h-auto cursor-pointer" onClick={() => onClickPostHandler(postId)}>
      <PostListImg imgUrl={thumbnail} liked={likeByUser} postId={postId} isReported={reportPost} />
      <div className="mt-2.5 px-5">
        <Text>
          {city} {district}
        </Text>
        <Tags tags={tags} />
      </div>
    </div>
  );
}
