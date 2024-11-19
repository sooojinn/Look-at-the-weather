interface PostListImgProps {
  imgUrl: string;
}

export default function PostImg({ imgUrl }: PostListImgProps) {
  return <img src={imgUrl} className="w-full h-auto object-cover aspect-[3/4]" alt="thumbnail" />;
}
