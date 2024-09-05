import { Location, TextColor, TextSize } from '@/config/types';
import Text from '@components/common/atom/Text';
import CompassIcon from '@components/icons/CompassIcon';
import ExclamationMarkIcon from '@components/icons/ExclamationMarkIcon';
import WarningModal from '../organism/WarningModal';
import { useState } from 'react';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { getGeoPointFromAddress } from '@/lib/geo';
import { useGeoLocationStore } from '@/store/locationStore';

interface LocationProps {
  location?: Location;
  size?: TextSize;
  color?: TextColor;
}

export default function Location({ location, size, color = 'black' }: LocationProps) {
  const isLocationDenied = useGeoLocationStore((state) => state.isLocationDenied);
  const [showLocationPermissionModal, setShowLocationPermissionModal] = useState(false);
  const [showLocationInputModal, setShowLocationInputModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <CompassIcon fill={color} />
        {location && (
          <Text size={size} color={color}>
            {location.city} {location.district}
          </Text>
        )}
        {isLocationDenied && (
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowLocationPermissionModal(true);
            }}
          >
            <ExclamationMarkIcon width={14} fill={color} />
          </div>
        )}
        {isLocationDenied || <button onClick={() => setShowLocationInputModal(true)}>변경</button>}
      </div>
      {showLocationPermissionModal && (
        <LocationPermissionModal
          onClose={() => setShowLocationPermissionModal(false)}
          onDirectInputClick={() => {
            setShowLocationPermissionModal(false);
            setShowLocationInputModal(true);
          }}
        />
      )}
      {showLocationInputModal && <LocationInpputModal onClose={() => setShowLocationInputModal(false)} />}
    </>
  );
}

function LocationInpputModal({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit } = useForm();
  const setGeoPoint = useGeoLocationStore((state) => state.setGeoPoint);

  const onSubmit = async (data: any) => {
    const geoPoint = await getGeoPointFromAddress(data);
    setGeoPoint(geoPoint);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 flex flex-col items-center gap-6 rounded-lg">
        <Text color="black">주소를 입력해 주세요.</Text>
        <form onSubmit={(e) => e.preventDefault()}>
          <input {...register('address')} placeholder="Enter address" autoComplete="off" className="input text-black" />
          <div className="mt-6 flex gap-2">
            <Button type="sub" size="m" onClick={onClose}>
              닫기
            </Button>
            <Button
              size="m"
              onClick={() => {
                handleSubmit(onSubmit)();
                onClose();
              }}
            >
              확인
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LocationPermissionModal({
  onClose,
  onDirectInputClick,
}: {
  onClose: () => void;
  onDirectInputClick: () => void;
}) {
  return (
    <WarningModal
      mainMessage="내 위치 설정"
      subMessage="사용기기의 설정에서 위치 정보 접근을 허용해주시길 바랍니다."
      detailMessage={[
        '*iOS: 설정 > 개인정보 보호 및 보안 > 위치 서비스 > 현재 사용 중인 브라우저 > 허용',
        '*Android: 설정 > 애플리케이션 > 현재 사용 중인 브라우저 > 권한 > 허용',
      ]}
      buttons={
        <>
          <Button type="sub" size="m" onClick={onClose}>
            닫기
          </Button>
          <Button size="m" onClick={onDirectInputClick}>
            직접 입력
          </Button>
        </>
      }
    />
  );
}
