import useLocationData from '@/hooks/useLocationData';
import Text from '@components/common/atom/Text';
import CompassIcon from '@components/icons/CompassIcon';

export default function Location() {
  const { location } = useLocationData();
  return (
    <div className="flex items-center gap-2">
      <CompassIcon fill={'white'} />
      <Text size="l">{location}</Text>
    </div>
  );
}
