'use client';

import { GeoPoint, Location } from '@/config/types';
import { fetchCurrentGeoPoint } from '@/lib/utils';
import { useGeoLocationStore } from '@/store/locationStore';
import { showToast } from '@components/common/molecules/ToastProvider';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import useLocationPermission from './useLocationPermission';
import { getLocationFromGeoPoint } from '@/api/apis';
import useQueryStatus from './useQueryStatus';

export const useGeoPointQuery = () => {
  const customGeoPoint = useGeoLocationStore((state) => state.customGeoPoint);
  const { isLocationAllowed } = useLocationPermission();

  const getGeoPoint = async () => {
    // store에 저장된 위치가 있는 경우(위치를 직접 설정한 경우)
    if (customGeoPoint) {
      return customGeoPoint;
    }

    // 그 외의 경우 geolocation api로 현재 위치 반환
    const currentGeoPoint = await fetchCurrentGeoPoint();
    return currentGeoPoint;
  };

  return useQuery({
    queryKey: ['geoPoint', customGeoPoint, isLocationAllowed],
    queryFn: getGeoPoint,
    staleTime: 1000 * 60 * 5,
    enabled: !!getGeoPoint(),
  });
};

// 위치 정보('OO시 OO구')를 패칭
export const useLocationQuery = (geoPoint: GeoPoint | undefined): UseQueryResult<Location | undefined, Error> =>
  useQuery({
    queryKey: ['location', geoPoint?.latitude, geoPoint?.longitude], // 의존성에 위도와 경도 추가 -> 위도와 경도 값이 바뀌면 리패칭
    queryFn: () => getLocationFromGeoPoint(geoPoint as GeoPoint),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    retry: 1,
    enabled: !!geoPoint,
  });

export default function useLocationData() {
  const geoPointQuery = useGeoPointQuery();
  const geoPoint = geoPointQuery.data;

  const locationQuery = useLocationQuery(geoPoint);
  const location = locationQuery.data;

  const queries = [geoPointQuery, locationQuery];
  const queryStatus = useQueryStatus(queries);
  const { isError, handleRefetch } = queryStatus;

  useEffect(() => {
    if (isError) {
      showToast('현재 위치 정보를 불러올 수 없어요.', '재시도', handleRefetch);
    }
  }, [isError]);

  return { location, ...queryStatus };
}
