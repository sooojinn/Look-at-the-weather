import Skeleton from '../common/atom/Skeleton';
import Image from 'next/image';

interface WeatherImgProps {
  weatherType: string;
  height: number;
  isLoading: boolean;
}

export default function WeatherImg({ weatherType, height, isLoading }: WeatherImgProps) {
  const weatherImgSrc = `/weatherImages/${weatherType}.png`;

  return (
    <div style={{ height: `${height}px` }}>
      {isLoading ? (
        <div style={{ width: `${height * 1.2}px` }} className="h-full flex justify-center items-center">
          <Skeleton className="w-4/5 h-2/3" />
        </div>
      ) : (
        <Image src={weatherImgSrc} className="h-full object-contain" width={133} height={130} alt={`${weatherType}`} />
      )}
    </div>
  );
}
