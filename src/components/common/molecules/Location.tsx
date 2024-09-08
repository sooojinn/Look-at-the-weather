import { Location, TextColor, TextSize } from '@/config/types';
import Text from '@components/common/atom/Text';
import LocationIcon from '@components/icons/LocationIcon';
import { useNavigate } from 'react-router-dom';

interface LocationProps {
  location?: Location;
  size?: TextSize;
  color?: TextColor;
}

export default function Location({ location, size, color = 'black' }: LocationProps) {
  const navigate = useNavigate();

  const handleLocationClick = () => {
    navigate('/search-address');
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={handleLocationClick}>
      <LocationIcon fill={color} />
      <Text size={size} color={color}>
        {location ? `${location.city} ${location.district}` : '위치 정보 없음'}
      </Text>
    </div>
  );
}
