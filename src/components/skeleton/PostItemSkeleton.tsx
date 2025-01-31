import PostImgSkeleton from './PostImgSkeleton';
import Skeleton from './Skeleton';

export default function PostItemSkeleton() {
  return (
    <div className="w-full">
      <PostImgSkeleton />
      <div style={{ paddingInline: '9%' }} className="my-2.5">
        <Skeleton fontSize={14} className="w-[70px]" />
        <div className="min-h-[39px] flex flex-wrap gap-x-2 mt-1">
          <Skeleton fontSize={13} className="w-[30px]" />
          <Skeleton fontSize={13} className="w-[40px]" />
          <Skeleton fontSize={13} className="w-[40px]" />
          <Skeleton fontSize={13} className="w-[30px]" />
        </div>
      </div>
    </div>
  );
}
