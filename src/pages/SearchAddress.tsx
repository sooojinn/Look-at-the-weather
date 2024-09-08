import { AddressItem, searchAddresses } from '@/lib/geo';
import { useGeoLocationStore } from '@/store/locationStore';
import Header from '@components/common/Header';
import Text from '@components/common/atom/Text';
import LocationPermissionModal from '@components/common/organism/LocationPermissionModal';
import InputWithLabel from '@components/form/InputWithLabel';
import LocationIcon from '@components/icons/LocationIcon';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function SearchAddress() {
  const { register, setValue, handleSubmit } = useForm();

  const setCustomGeoPoint = useGeoLocationStore((state) => state.setCustomGeoPoint);
  const isLocationDenied = useGeoLocationStore((state) => state.isLocationDenied);
  const customGeoPoint = useGeoLocationStore((state) => state.customGeoPoint);
  const [showLocationPermissionModal, setShowLocationPermissionModal] = useState(false);
  const [addressList, setAddressList] = useState<AddressItem[]>([]);
  const navigate = useNavigate();

  const handleCurrentLocationClick = () => {
    if (isLocationDenied) {
      setShowLocationPermissionModal(true);
      return;
    }
    setCustomGeoPoint(null);
    navigate(-1);
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
    <div className="flex flex-col h-screen">
      <Header>주소 검색</Header>
      <div className="px-5 pt-10 pb-5 flex flex-col gap-5">
        <Text color="black" size="xl" weight="bold">
          해당 지역의 룩엣더웨더를 보기 위해
          <br />
          현재 계신 주소를 알려주세요
        </Text>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <InputWithLabel
            name="address"
            placeholder="지번 or 도로명으로 검색"
            search
            register={register}
            setValue={setValue}
          />
        </form>
        {(isLocationDenied || !!customGeoPoint) && (
          <div
            onClick={handleCurrentLocationClick}
            className="w-full h-14 py-2 flex gap-1 rounded-[10px] justify-center items-center border cursor-pointer"
          >
            <LocationIcon fill="#171719" />
            <Text size="l" color="black" weight="bold">
              현재 위치로 찾기
            </Text>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {!addressList.length && (
          <div className="mt-3 px-4">
            <Text color="black" weight="bold">
              이렇게 검색해 보세요
            </Text>
            <div className="mt-2">
              <Text>
                <span className="mx-2">•</span>도로명 + 건물번호 (화곡로 398)
              </Text>
              <Text>
                <span className="mx-2">•</span>지역명(동/리)+ 번지 (등촌동 639-11)
              </Text>
            </div>
          </div>
        )}
        {addressList.map(({ address_name, latitude, longitude }) => (
          <div
            key={address_name}
            onClick={() => {
              setCustomGeoPoint({ latitude, longitude });
              navigate('/');
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
