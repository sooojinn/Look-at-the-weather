import { PostMeta } from '@/config/types';

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
            <img src={post.thumbnail} className="w-full h-[232px] object-cover" alt="thumbnail" />
            <div className="mt-2.5 px-5">
              <div className="text-m">{post.location}</div>
              <div>
                {tags.map((tag, index) => (
                  <span key={index} className="inline-block h-auto mr-2 text-[13px] text-gray">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
