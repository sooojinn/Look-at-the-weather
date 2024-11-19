import { useState } from 'react';
import placeholderImg from '/assets/placeholder_img.svg';

interface PostListImgProps {
  imgUrl: string;
}

export default function PostImg({ imgUrl }: PostListImgProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={isLoaded ? imgUrl : placeholderImg}
      onLoad={() => setIsLoaded(true)}
      onError={() => setIsLoaded(true)}
      className="w-full h-auto object-cover aspect-[3/4]"
      alt="thumbnail"
    />
  );
}
