import { Location, TextColor, TextSize } from '@/config/types';
import Text from '@components/common/atom/Text';
import CloseBtn from '@components/icons/CloseBtn';
import LocationIcon from '@components/icons/LocationIcon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LocationProps {
  location?: Location;
  size?: TextSize;
  color?: TextColor;
}

export default function Location({ location, size, color = 'black' }: LocationProps) {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLocationClick = () => {
    navigate('/search-address');
  };

  useEffect(() => {
    // 로컬 스토리지에서 저장된 날짜 가져오기
    const lastShownDate = localStorage.getItem('tooltipLastShown');
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식

    if (!lastShownDate || lastShownDate !== currentDate) {
      // 툴팁을 보여주고 현재 날짜를 저장
      setShowTooltip(true);
      localStorage.setItem('tooltipLastShown', currentDate);
    }
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-[6px] cursor-pointer" onClick={handleLocationClick}>
        <LocationIcon fill={color} />
        <Text size={size} color={color}>
          {location ? `${location.city} ${location.district}` : '위치 정보 없음'}
        </Text>
      </div>
      {showTooltip && <LocationTooltip onClose={() => setShowTooltip(false)} />}
    </div>
  );
}

function LocationTooltip({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute -top-10 -left-2 flex gap-2 px-3 py-2 bg-primary-main rounded-md">
      <Text size="xs" color="white">
        위치를 변경하려면 클릭해 주세요
      </Text>
      <CloseBtn width={16} fill="white" onClick={onClose} />
      <div className="absolute bottom-[-5px] left-[10px] w-0 h-0 border-primary-main border-t-[5px] border-r-[5px] border-r-transparent border-l-[5px] border-l-transparent"></div>
    </div>
  );
}
