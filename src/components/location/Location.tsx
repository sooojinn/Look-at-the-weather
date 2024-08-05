import { TextSize } from '@/config/types';
import useLocationData from '@/hooks/useLocationData';
import Text from '@components/common/atom/Text';
import CompassIcon from '@components/icons/CompassIcon';

interface LocationProps {
  size?: TextSize;
  fill?: string;
}

export default function Location({ size, fill = 'black' }: LocationProps) {
  const { location } = useLocationData();
  return (
    <div className="flex items-center gap-2">
      <CompassIcon fill={fill} />
      <Text size={size}>{location}</Text>
    </div>
  );
}
