import { Location, TextColor, TextSize } from '@/config/types';
import Text from '@components/common/atom/Text';
import CompassIcon from '@components/icons/CompassIcon';
import ExclamationMarkIcon from '@components/icons/ExclamationMarkIcon';
import WarningModal from '../organism/WarningModal';
import { useState } from 'react';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { AddressItem, searchAddresses } from '@/lib/geo';
import { useGeoLocationStore } from '@/store/locationStore';
import InputWithLabel from '@components/form/InputWithLabel';

interface LocationProps {
  location?: Location;
  size?: TextSize;
  color?: TextColor;
}

export default function Location({ location, size, color = 'black' }: LocationProps) {
  const isLocationDenied = useGeoLocationStore((state) => state.isLocationDenied);
  const customGeoPoint = useGeoLocationStore((state) => state.customGeoPoint);

  const [showLocationPermissionModal, setShowLocationPermissionModal] = useState(false);
  const [showLocationInputModal, setShowLocationInputModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        <CompassIcon fill={color} />
        <Text size={size} color={color}>
          {location ? `${location.city} ${location.district}` : '위치 정보 없음'}
        </Text>
        {isLocationDenied && !customGeoPoint && (
          <div
            className="cursor-pointer"
            onClick={() => {
              setShowLocationPermissionModal(true);
            }}
          >
            <ExclamationMarkIcon width={14} fill={color} />
          </div>
        )}
        {(!isLocationDenied || customGeoPoint) && (
          <button onClick={() => setShowLocationInputModal(true)}>
            <Text color="white">변경</Text>
          </button>
        )}
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
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const setCustomGeoPoint = useGeoLocationStore((state) => state.setCustomGeoPoint);
  const isLocationDenied = useGeoLocationStore((state) => state.isLocationDenied);
  const customGeoPoint = useGeoLocationStore((state) => state.customGeoPoint);
  const [addressList, setAddressList] = useState<AddressItem[]>([]);

  const handleCurrentLocationClick = () => {
    setCustomGeoPoint(null);
  };

  const onSubmit = async (data: any) => {
    try {
      const nextAddressList = await searchAddresses(data);
      setAddressList(nextAddressList);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="w-[300px] bg-white p-6 flex flex-col items-center gap-4 rounded-lg">
        <Text size="l" color="black" weight="bold">
          위치 변경
        </Text>
        <form className="w-full" onSubmit={(e) => e.preventDefault()}>
          <InputWithLabel
            name="address"
            placeholder="(예) 서울 중구 태평로1가"
            register={register}
            setValue={setValue}
          />
          {addressList.map(({ address_name, latitude, longitude }) => (
            <div key={latitude} onClick={() => setCustomGeoPoint({ latitude, longitude })} className="p-1">
              <Text>{address_name}</Text>
            </div>
          ))}
          {!isLocationDenied && !!customGeoPoint && (
            <div
              onClick={handleCurrentLocationClick}
              className="w-full mt-4 py-2 flex justify-center items-center border"
            >
              <Text>현재 위치로 설정</Text>
            </div>
          )}
          <div className="w-full mt-6 flex gap-2">
            <Button type="sub" size="m" onClick={onClose}>
              닫기
            </Button>
            <Button
              size="m"
              isSubmitting={isSubmitting}
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              검색
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
