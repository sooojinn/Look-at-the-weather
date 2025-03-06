import { useGeoLocationStore } from '@/store/locationStore';
import Text from '../common/atom/Text';
import LocationIcon from '../icons/LocationIcon';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useLocationPermission from '@/hooks/useLocationPermission';
import { fetchCurrentLocation } from '@/lib/utils';
import LocationPermissionModal from '../modal/LocationPermissionModal';

export default function CurrentLocationBtn({ isPostForm }: { isPostForm: boolean }) {
  const setCustomGeoPoint = useGeoLocationStore((state) => state.setCustomGeoPoint);
  const setPostFormLocation = useGeoLocationStore((state) => state.setPostFormLocation);
  const { isLocationAllowed } = useLocationPermission();

  const [showLocationPermissionModal, setShowLocationPermissionModal] = useState(false);
  const router = useRouter();

  const handleCurrentLocationClick = async () => {
    if (!isLocationAllowed) {
      setShowLocationPermissionModal(true);
      return;
    }
    if (isPostForm) {
      const currentLocation = await fetchCurrentLocation();
      setPostFormLocation(currentLocation);
    } else {
      setCustomGeoPoint(null);
    }
    router.back();
  };

  return (
    <>
      <div
        onClick={handleCurrentLocationClick}
        className="w-full h-12 py-2 flex gap-1 rounded-[10px] justify-center items-center border cursor-pointer"
      >
        <LocationIcon fill="rgb(var(--color-label-600))" />
        <Text size="l" weight="medium">
          현재 위치로 찾기
        </Text>
      </div>
      {showLocationPermissionModal && <LocationPermissionModal onClose={() => setShowLocationPermissionModal(false)} />}
    </>
  );
}
