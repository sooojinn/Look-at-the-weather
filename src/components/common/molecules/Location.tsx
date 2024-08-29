import { Location, TextColor, TextSize } from '@/config/types';
import { useGeoPermissionStore } from '@/store/geoPermissionStore';
import Text from '@components/common/atom/Text';
import CompassIcon from '@components/icons/CompassIcon';
import ExclamationMarkIcon from '@components/icons/ExclamationMarkIcon';
import WarningModal from '../organism/WarningModal';
import { useState } from 'react';
import Button from './Button';

interface LocationProps {
  location?: Location;
  size?: TextSize;
  color?: TextColor;
}

export default function Location({ location, size, color = 'black' }: LocationProps) {
  if (!location) return;

  const { city, district } = location;
  const isLocationDenied = useGeoPermissionStore((state) => state.isLocationDenied);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <WarningModal
          mainMessage="내 위치 설정"
          subMessage="사용기기의 설정에서 위치 정보 접근을 허용해주시길 바랍니다."
          detailMessage={[
            '*iOS: 설정 > 개인정보 보호 및 보안 > 위치 서비스 > 현재 사용 중인 브라우저 > 허용',
            '*Android: 설정 > 애플리케이션 > 현재 사용 중인 브라우저 > 권한 > 허용',
          ]}
          buttons={
            <Button type="sub" size="m" width={100} onClick={() => setShowModal(false)}>
              닫기
            </Button>
          }
        />
      )}
      <div className="flex items-center gap-2">
        <CompassIcon fill={color} />
        <Text size={size} color={color}>
          {city} {district}
        </Text>
        {isLocationDenied && (
          <div className="cursor-pointer" onClick={() => setShowModal(true)}>
            <ExclamationMarkIcon width={14} fill={color} />
          </div>
        )}
      </div>
    </>
  );
}
