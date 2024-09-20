import { PostMeta } from '@/config/types';
import Tags from '@/components/post/Tags';
import Text from '@components/common/atom/Text';
import PostListImg from './PostListImg';
import { useNavigate } from 'react-router-dom';

interface PostListProps {
  postList: PostMeta[];
}

export function PostList({ postList }: PostListProps) {
  const navigate = useNavigate();

  const onClickPostHandler = (id: number) => {
    navigate(`/post/${id}`, { state: { id: id } });
  };

  return (
    <div className="w-full post-list">
      {postList.map((post, index) => {
        const tags = [...(post.weatherTags || []), ...(post.temperatureTags || []), post.seasonTag || ''];
        return (
          <div className="min-h-[312px] h-auto" key={`${post.postId}-${index}`}>
            <div onClick={() => onClickPostHandler(post.postId)}>
              <PostListImg imgUrl={post.thumbnail} liked={post.likeByUser} postId={post.postId} />
              <div className="mt-2.5 px-5">
                <Text>
                  {post.location.city} {post.location.district}
                </Text>
                <div>
                  <Tags tags={tags} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
