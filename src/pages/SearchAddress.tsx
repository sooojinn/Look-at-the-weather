import { AddressItem, fetchCurrentLocation } from '@/lib/utils';
import { useGeoLocationStore } from '@/store/locationStore';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import LocationPermissionModal from '@components/common/organism/LocationPermissionModal';
import InputWithLabel from '@components/form/InputWithLabel';
import LocationIcon from '@components/icons/LocationIcon';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import useDebounce from '@/hooks/useDebounce';
import useLocationPermission from '@/hooks/useLocationPermission';
import { searchAddresses } from '@/api/apis';

interface AddressForm {
  address: string;
}

export default function SearchAddress() {
  const formMethods = useForm<AddressForm>();
  const { handleSubmit, watch } = formMethods;
  const navigate = useNavigate();
  const location = useLocation();

  const { isPostFormLocation } = location.state;
  const { isLocationAllowed } = useLocationPermission();

  const setCustomGeoPoint = useGeoLocationStore((state) => state.setCustomGeoPoint);
  const setPostFormLocation = useGeoLocationStore((state) => state.setPostFormLocation);

  const [showLocationPermissionModal, setShowLocationPermissionModal] = useState(false);
  const [addressList, setAddressList] = useState<AddressItem[]>([]);

  const addressInputValue = watch('address');
  const debouncedAddress = useDebounce(addressInputValue, 500);

  useEffect(() => {
    if (debouncedAddress) {
      handleSubmit(onSubmit)(); // 디바운스된 값으로 자동 제출
    } else {
      setAddressList([]);
    }
  }, [debouncedAddress]); // 디바운스된 값이 변경될 때만 작동

  // 현재 위치로 설정 버튼
  const handleCurrentLocationClick = async () => {
    if (!isLocationAllowed) {
      setShowLocationPermissionModal(true);
      return;
    }
    if (isPostFormLocation) {
      const currentLocation = await fetchCurrentLocation();
      setPostFormLocation(currentLocation);
    } else {
      setCustomGeoPoint(null);
    }
    navigate(-1);
  };

  const onSubmit = async ({ address }: AddressForm) => {
    try {
      const nextAddressList = await searchAddresses(address);
      setAddressList(nextAddressList);
    } catch (error) {
      console.error(error);
      setAddressList([]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header>주소 검색</Header>
      <div className="px-5 pt-10 pb-5 flex flex-col gap-5">
        <Text size="xl" weight="bold">
          해당 지역의 룩을 보기 위해
          <br />
          현재 계신 주소를 알려주세요
        </Text>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <InputWithLabel name="address" placeholder="지번 or 도로명으로 검색" search {...formMethods} />
        </form>
        <div
          onClick={handleCurrentLocationClick}
          className="w-full h-12 py-2 flex gap-1 rounded-[10px] justify-center items-center border cursor-pointer"
        >
          <LocationIcon fill="rgb(var(--color-label-600))" />
          <Text size="l" weight="medium">
            현재 위치로 찾기
          </Text>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {!addressList.length && (
          <div className="mt-3 px-4">
            <Text size="s" color="darkGray" weight="bold" className="mb-2">
              이렇게 검색해 보세요
            </Text>
            <Text size="xs" color="darkGray">
              • 도로명 + 건물번호 (화곡로 398)
              <br />• 지역명(동/리)+ 번지 (등촌동 639-11)
            </Text>
          </div>
        )}
        {addressList.map(({ address_name, latitude, longitude, city, district }) => (
          <div
            key={address_name}
            onClick={() => {
              if (isPostFormLocation) {
                setPostFormLocation({ city, district });
              } else {
                setCustomGeoPoint({ latitude, longitude });
              }
              navigate(-1);
            }}
            className="px-5 py-[18px] border-b border-line-light hover:bg-background-light cursor-pointer"
          >
            <Text>{address_name}</Text>
          </div>
        ))}
      </div>
      {showLocationPermissionModal && <LocationPermissionModal onClose={() => setShowLocationPermissionModal(false)} />}
    </div>
  );
}
