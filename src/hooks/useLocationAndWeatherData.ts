import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { fetchGeoPoint, fetchLocation } from '@/lib/geo';
import { GeoPoint, Location } from '@/config/types';
import { getDailyWeatherInfo, getHourlyWeatherInfo } from '@/lib/weather';

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

const useHourlyWeatherQuery = (geoPoint: GeoPoint | undefined) =>
  useQuery({
    queryKey: ['hourlyWeather', geoPoint?.latitude, geoPoint?.longitude],
    queryFn: () => getHourlyWeatherInfo(geoPoint as GeoPoint),
    staleTime: calHourlyWeatherStaleTime(), // 매 정각에 리패칭
    gcTime: 1000 * 60 * 60,
    retry: 1,
    enabled: !!geoPoint,
  });

const useDailyWeatherQuery = (geoPoint: GeoPoint | undefined) =>
  useQuery({
    queryKey: ['dailyWeather', geoPoint?.latitude, geoPoint?.longitude],
    queryFn: () => getDailyWeatherInfo(geoPoint as GeoPoint),
    staleTime: calDailyWeatherStaleTime(), // 매일 2시 11분이 지나면 리패칭
    gcTime: 1000 * 60 * 60,
    retry: 1,
    enabled: !!geoPoint,
  });

export default function useLocationAndWeatherData() {
  const geoPointQuery = useGeoPointQuery();
  const geoPoint = geoPointQuery.data;

  const locationQuery = useLocationQuery(geoPoint);
  const hourlyWeatherQuery = useHourlyWeatherQuery(geoPoint);
  const dailyWeatherQuery = useDailyWeatherQuery(geoPoint);

  const queries = [locationQuery, hourlyWeatherQuery, dailyWeatherQuery];

  const isLoading = queries.some((query) => query.isLoading);
  const isSuccess = queries.every((query) => query.isSuccess);
  const isError = !isLoading && queries.some((query) => query.isError);

  const handleRefetch = () => {
    queries.forEach((query) => {
      if (query.isError) query.refetch();
    });
  };

  return {
    location: locationQuery.data,
    weatherData: { ...hourlyWeatherQuery.data, ...dailyWeatherQuery.data },
    isLoading,
    isSuccess,
    isError,
    handleRefetch,
  };
}

function calHourlyWeatherStaleTime() {
  const now = new Date();
  const currentMinutes = now.getMinutes();

  // 현재 시간을 기준으로 다음 정각을 계산
  let nextRefetchTime = new Date(now);
  if (currentMinutes > 0) {
    // 다음 정각으로 설정 (현재 시간이 정각이 아니면 시간 +1)
    nextRefetchTime.setHours(nextRefetchTime.getHours() + 1);
  }
  nextRefetchTime.setMinutes(0, 0, 0); // 분, 초, 밀리초를 0으로 설정

  // 밀리초 단위로 차이 계산
  return nextRefetchTime.getTime() - now.getTime();
}

function calDailyWeatherStaleTime() {
  const now = new Date();

  // 다음 2시 11분을 계산하기 위해 날짜 설정
  const nextTargetTime = new Date();
  nextTargetTime.setHours(2, 11, 0, 0); // 2시 11분 00초로 설정

  // 현재 시간이 2시 11분 이후인 경우 다음 날 2시 11분으로 설정
  if (now > nextTargetTime) {
    nextTargetTime.setDate(nextTargetTime.getDate() + 1);
  }

  // staleTime을 밀리초 단위로 계산
  const staleTime = nextTargetTime.getTime() - now.getTime();

  return staleTime;
}
