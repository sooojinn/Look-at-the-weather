'use client';

import { TextColor, TextSize } from '@/config/types';
import Text from '@components/common/atom/Text';
import LocationIcon from '@components/icons/LocationIcon';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Skeleton from '../skeleton/Skeleton';
import LocationTooltip from '@/components/location/LocationTooltip';

interface LocationComponentProps {
  city?: string;
  district?: string;
  size?: TextSize;
  color?: TextColor;
  isLoading?: boolean;
}

export default function LocationComponent({ city, district, size, color, isLoading }: LocationComponentProps) {
  const router = useRouter();
  const pathname = usePathname() || '';
  const currentPage = pathname.replace('/', '');

  const [showTooltip, setShowTooltip] = useState(false);

  const handleLocationClick = () => {
    router.push(`/search-address?from=${currentPage}`);
  };

  useEffect(() => {
    const lastTooltipClosedDate = localStorage.getItem('lastTooltipClosedDate');
    const currentDate = new Date().toISOString().split('T')[0];

    if (!lastTooltipClosedDate || lastTooltipClosedDate !== currentDate) {
      setShowTooltip(true);
    }
  }, []);

  const handleTooltipClose = () => {
    setShowTooltip(false);
    const currentDate = new Date().toISOString().split('T')[0];
    localStorage.setItem('lastTooltipClosedDate', currentDate);
  };

  return (
    <div className="w-fit flex items-center gap-1 relative">
      <div className="w-fit flex items-center gap-1.5 cursor-pointer" onClick={handleLocationClick}>
        <LocationIcon fill={color} />
        {isLoading ? (
          <Skeleton className={`w-[80px] ${size === 'm' ? 'h-[21px]' : 'h-6'} `} />
        ) : (
          <Text size={size} color={color} className="whitespace-nowrap">
            {city || district ? `${city} ${district}` : '위치 정보 없음'}
          </Text>
        )}
      </div>
      {showTooltip && !isLoading && (
        <div className="absolute left-full ml-1">
          <LocationTooltip onClose={handleTooltipClose} />
        </div>
      )}
    </div>
  );
}
