import Heart from '@components/post/Heart';

interface PostListImgProps {
  imgUrl: string;
  liked: boolean;
  postId: number;
}

export default function PostListImg({ imgUrl, liked, postId }: PostListImgProps) {
  return (
    <div className="w-full h-[232px] relative">
      <img src={imgUrl} className="w-full h-full object-cover" alt="thumbnail" />
      <div className="w-10 h-10 flex justify-center items-center absolute right-0 bottom-0">
        <Heart liked={liked} postId={postId} />
      </div>
    </div>
  );
}
