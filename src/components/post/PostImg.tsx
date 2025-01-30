import { useEffect, useRef, useState } from 'react';
import placeholderImg from 'public/assets/placeholder_img.svg';
import Image from 'next/image';

interface PostListImgProps {
  imgUrl: string;
}

export default function PostImg({ imgUrl }: PostListImgProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01 },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Image
      width={250}
      height={250}
      ref={imgRef}
      src={isLoaded ? imgUrl : placeholderImg}
      className="w-full h-auto object-cover aspect-custom flex-shrink-0"
      alt="thumbnail"
      priority
    />
  );
}
