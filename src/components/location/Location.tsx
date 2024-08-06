import { TextSize } from '@/config/types';
import useLocationData from '@/hooks/useLocationData';
import Text from '@components/common/atom/Text';
import CompassIcon from '@components/icons/CompassIcon';
import { Location } from '@components/post/PostWriteForm';
import { useEffect } from 'react';

interface LocationProps {
  size?: TextSize;
  fill?: string;
  onLocationChange?: (location: Location) => void;
}

export default function Location({ size, fill = 'black', onLocationChange }: LocationProps) {
  const { location } = useLocationData();

  useEffect(() => {
    if (onLocationChange && location) {
      const [city, district] = location.split(' ');
      onLocationChange({ city, district }); // 위치가 변경될 때 부모 컴포넌트로 전달
    }
  }, [location, onLocationChange]);

  return (
    <div className="flex items-center gap-2">
      <CompassIcon fill={fill} />
      <Text size={size}>{location}</Text>
    </div>
  );
}
