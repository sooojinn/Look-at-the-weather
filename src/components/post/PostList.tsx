import { PostMeta } from '@/config/types';
import Tags from '@/components/post/Tags';
import Text from '@components/common/atom/Text';
import PostListImg from './PostListImg';
import { getTagNameById } from '@/lib/weather';

interface PostListProps {
  postList: PostMeta[];
}

export function PostList({ postList }: PostListProps) {
  for (let i = 0; i < postList.length; i++) {
    console.log(postList[i]);
  }

  return (
    <div className="w-full post-list">
      {postList.map((post) => {
        const tags = [...(post.weatherTagIds || []), ...(post.temperatureTagIds || []), post.seasonTagId || ''].map(
          (tag) => getTagNameById(tag),
        );
        return (
          <div className="min-h-[312px] h-auto" key={post.postId}>
            <a href={`post/${post.postId}`}>
              <PostListImg imgUrl={post.thumbnail} liked={post.likeByUser} postId={post.postId} />
              <div className="mt-2.5 px-5">
                <Text>
                  {post.location.city} {post.location.district}
                </Text>
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
