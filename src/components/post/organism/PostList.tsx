import { PostMeta } from '@/config/types';
import { v4 as uuidv4 } from 'uuid';
import PostItem from './PostItem';

interface PostListProps {
  postList: PostMeta[];
}

export function PostList({ postList }: PostListProps) {
  return (
    <div className="w-full grid grid-cols-2 gap-[3px]">
      {postList.map((post) => (
        <PostItem key={uuidv4()} {...post} />
      ))}
    </div>
  );
}
