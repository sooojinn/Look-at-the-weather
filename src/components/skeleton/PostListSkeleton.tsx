import PostItemSkeleton from './PostItemSkeleton';
import { v4 as uuidv4 } from 'uuid';

export default function PostListSkeleton({ isHorizontal }: { isHorizontal?: boolean }) {
  return isHorizontal ? (
    <div className="overflow-hidden">
      <div className="mx-5 flex gap-1">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={uuidv4()} className="w-[calc((100%-8px)/3)] flex-shrink-0">
            <PostItemSkeleton key={index} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full grid grid-cols-2 gap-[3px] overflow-hidden">
      {Array.from({ length: 8 }).map((_, index) => (
        <PostItemSkeleton key={index} />
      ))}
    </div>
  );
}
