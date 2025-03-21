import { PostMeta } from '@/config/types';
import VirtualPostGrid from './VirtualPostGrid';
import PostListSkeleton from '../../skeleton/PostListSkeleton';
import HorizonScrollPostList from './HorizonScrollPostList';

export default function PostListStatusHandler({
  postList,
  queryResults,
  isHorizontal,
  PlaceholderComp,
}: {
  postList: PostMeta[];
  queryResults: any;
  isHorizontal?: boolean;
  PlaceholderComp: React.FC;
}) {
  const { isSuccess, isPending, isError } = queryResults;

  const ListComponent = isHorizontal ? HorizonScrollPostList : VirtualPostGrid;

  return (
    <>
      {isSuccess &&
        (postList.length ? (
          <ListComponent postList={postList} />
        ) : (
          <div className="w-full h-full flex justify-center items-center my-4">
            <PlaceholderComp />
          </div>
        ))}
      {(isPending || isError) && <PostListSkeleton isHorizontal={isHorizontal} />}
    </>
  );
}
