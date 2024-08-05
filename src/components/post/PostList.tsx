import { PostMeta } from '@/config/types';
import Tags from '@/components/post/Tags';
import Text from '@components/common/atom/Text';
import PostListImg from './PostListImg';

interface PostListProps {
  postList: PostMeta[];
}

export function PostList({ postList }: PostListProps) {
  return (
    <div className="w-full post-list">
      {postList.map((post) => {
        const tags = [...post.WeatherTag, ...post.TempTag, post.SeasonTag];
        return (
          <div className="min-h-[312px] h-auto" key={post.postId}>
            <a href={`post/${post.postId}`}>
              <PostListImg imgUrl={post.thumbnail} liked={post.likeByUser} postId={post.postId} />
              <div className="mt-2.5 px-5">
                <Text>{post.location}</Text>
                <div>
                  <Tags tags={tags} />
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
}
