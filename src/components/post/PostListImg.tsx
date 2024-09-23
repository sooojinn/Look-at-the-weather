import Heart from '@components/common/atom/Heart';
import Text from '@components/common/atom/Text';

interface PostListImgProps {
  imgUrl: string;
  liked: boolean;
  postId: number;
  isReported?: boolean;
  isMyPost?: boolean;
}

export default function PostListImg({ imgUrl, liked, postId, isReported, isMyPost }: PostListImgProps) {
  return (
    <div className="w-full h-[232px] relative">
      {isReported && (
        <div className="w-full h-full bg-dimmer-bg flex flex-col justify-center items-center absolute">
          <Text color="white">신고로 인해</Text>
          <Text color="white">제제된 게시물입니다</Text>
        </div>
      )}
      <img src={imgUrl} className="w-full h-full object-cover" alt="thumbnail" />
      {isMyPost || (
        <div className="w-10 h-10 flex justify-center items-center absolute right-0 bottom-0">
          <Heart liked={liked} postId={postId} />
        </div>
      )}
    </div>
  );
}
