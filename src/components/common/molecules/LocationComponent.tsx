import { TextColor, TextSize } from '@/config/types';
import Text from '@components/common/atom/Text';
import LocationIcon from '@components/icons/LocationIcon';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationComponentProps {
  isPostFormLocation?: boolean;
  city?: string;
  district?: string;
  size?: TextSize;
  color?: TextColor;
}

export default function LocationComponent({ isPostFormLocation, city, district, size, color }: LocationComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const showTooltipPage = ['/'];
  const isShowTooltipPage = showTooltipPage.includes(location.pathname);

  const [showTooltip, setShowTooltip] = useState(true);

  const handleLocationClick = () => {
    navigate('/search-address', { state: { isPostFormLocation } });
  };

  useEffect(() => {
    if (isShowTooltipPage) {
      const lastTooltipClosedDate = localStorage.getItem('lastTooltipClosedDate');
      const currentDate = new Date().toISOString().split('T')[0];

      if (!lastTooltipClosedDate || lastTooltipClosedDate !== currentDate) {
        setShowTooltip(true);
      }
    }
  }, []);

  // const handleTooltipClose = () => {
  //   setShowTooltip(false);
  //   const currentDate = new Date().toISOString().split('T')[0];
  //   localStorage.setItem('lastTooltipClosedDate', currentDate);
  // };

  return (
    <div className="flex pt-[24px] w-full h-[60px] items-center">
      <div className="flex flex-row items-center gap-[6px] cursor-pointer" onClick={handleLocationClick}>
        <div>
          <LocationIcon fill={color} />
        </div>
        <div>
          <Text size={size} color={color}>
            {city || district ? `${city} ${district}` : '위치 정보 없음'}
          </Text>
        </div>
      </div>
      <div>{showTooltip && <LocationTooltip />}</div>
    </div>
  );
}

function LocationTooltip() {
  return (
    <div className="flex items-center">
      <div className="w-[8px] h-0 border-primary-main border-t-[5px] border-r-[5px] border-b-[5px] border-t-transparent border-l-transparent border-b-transparent"></div>
      <div className="flex px-3 py-[5px] bg-primary-main rounded-md z-10">
        <Text size="xs" color="white">
          클릭해서 위치를 변경할 수 있어요!
        </Text>
      </div>
    </div>
  );
}
