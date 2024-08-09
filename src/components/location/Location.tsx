import { Location, TextColor, TextSize } from '@/config/types';
import Text from '@components/common/atom/Text';
import CompassIcon from '@components/icons/CompassIcon';

interface LocationProps {
  location: Location | undefined;
  size?: TextSize;
  color?: TextColor;
  fill?: string;
}

export default function Location({ location, size, color, fill = 'black' }: LocationProps) {
  if (!location) return;

  const { city, district } = location;

  return (
    <div className="flex items-center gap-2">
      <CompassIcon fill={fill} />
      <Text size={size} color={color}>
        {city} {district}
      </Text>
    </div>
  );
}
