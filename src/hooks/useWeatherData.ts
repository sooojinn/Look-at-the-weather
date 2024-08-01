import { useQuery } from '@tanstack/react-query';
import { fetchGeoPoint, fetchLocation } from '../lib/geo';
import { getDailyWeatherInfo, getHourlyWeatherInfo } from '../lib/weather';
import { GeoPoint, WeatherInfo } from '../config/types';

interface UseWeatherDataReturn extends WeatherInfo {
  location: string | undefined;
  isLoading: boolean;
}

export default function useWeatherData(): UseWeatherDataReturn {
  const geoPointQuery = useQuery({
    queryKey: ['geoPoint'],
    queryFn: fetchGeoPoint,
    staleTime: 0, // 컴포넌트가 마운트될 때마다 패칭
  });

  const { data: geoPoint } = geoPointQuery;

  // 위치 정보('OO시 OO구')를 패칭
  const locationQuery = useQuery({
    queryKey: ['location', geoPoint?.latitude, geoPoint?.longitude], // 의존성에 위도와 경도 추가 -> 위도와 경도 값이 바뀌면 리패칭
    queryFn: () => fetchLocation(geoPoint as GeoPoint),
    staleTime: 1000 * 60 * 60 * 60,
    enabled: !!geoPoint, // geoPoint가 null이 아닐 때만 패칭
  });

  // 시간별 날씨 정보(기온, 하늘 상태, 강수 형태) 패칭
  const hourlyWeatherQuery = useQuery({
    queryKey: ['hourlyWeather', geoPoint?.latitude, geoPoint?.longitude],
    queryFn: () => getHourlyWeatherInfo(geoPoint as GeoPoint),
    staleTime: 1000 * 60 * 60 * 60,
    enabled: !!geoPoint,
  });

  // 일별 날씨 정보(일 최저기온, 일 최고기온) 패칭
  const dailyWeatherQuery = useQuery({
    queryKey: ['dailyWeather', geoPoint?.latitude, geoPoint?.longitude],
    queryFn: () => getDailyWeatherInfo(geoPoint as GeoPoint),
    staleTime: 1000 * 60 * 60 * 60,
    enabled: !!geoPoint,
  });

  return {
    location: locationQuery.data,
    ...hourlyWeatherQuery.data,
    ...dailyWeatherQuery.data,
    isLoading:
      geoPointQuery.isLoading || locationQuery.isLoading || hourlyWeatherQuery.isLoading || dailyWeatherQuery.isLoading,
  };
}
