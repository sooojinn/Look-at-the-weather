import { TextSize } from '@/config/types';
import useLocationData from '@/hooks/useLocationData';
import Text from '@components/common/atom/Text';
import CompassIcon from '@components/icons/CompassIcon';

interface LocationProps {
  size?: TextSize;
}

export default function Location({ size }: LocationProps) {
  const { location } = useLocationData();
  return (
    <div className="flex items-center gap-2">
      <CompassIcon fill={'white'} />
      <Text size={size}>{location}</Text>
    </div>
  );
}
