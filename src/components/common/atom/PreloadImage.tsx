import { useEffect } from 'react';
import { PreloadImageProps } from '@/config/types';

export default function PreloadImage({ url, onLoad, onError }: PreloadImageProps) {
  useEffect(() => {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      if (onLoad) onLoad();
    };

    img.onerror = () => {
      if (onError) onError();
    };
  }, [url, onLoad, onError]);

  return null;
}
