import { GeoPoint, Location } from '@/config/types';
import { fetchGeoPoint, fetchLocation } from '@/lib/geo';
import { showToast } from '@components/common/molecules/ToastProvider';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useGeoPointQuery = () =>
  useQuery({
    queryKey: ['geoPoint'],
    queryFn: fetchGeoPoint,
    staleTime: 0, // 컴포넌트가 마운트될 때마다 패칭
  });

// 위치 정보('OO시 OO구')를 패칭
export const useLocationQuery = (geoPoint: GeoPoint | undefined): UseQueryResult<Location | undefined, Error> =>
  useQuery({
    queryKey: ['location', geoPoint?.latitude, geoPoint?.longitude], // 의존성에 위도와 경도 추가 -> 위도와 경도 값이 바뀌면 리패칭
    queryFn: () => fetchLocation(geoPoint as GeoPoint),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    retry: 1,
    enabled: !!geoPoint,
  });

export default function useLocationData() {
  const geoPointQuery = useGeoPointQuery();
  const geoPoint = geoPointQuery.data;

  const locationQuery = useLocationQuery(geoPoint);
  const isLoading = geoPointQuery.isLoading || locationQuery.isLoading;

  useEffect(() => {
    if (locationQuery.isError) {
      showToast('현재 지역 정보를 불러올 수 없어요.', '재시도', locationQuery.refetch);
    }
  }, [locationQuery.isError]);

  return { geoPoint: geoPointQuery.data, location: locationQuery.data, isLocationLoading: isLoading };
}
