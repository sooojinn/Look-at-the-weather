import { useQuery } from '@tanstack/react-query';
import { getDailyWeatherInfo, getHourlyWeatherInfo } from '@/lib/weather';
import { GeoPoint, WeatherInfo } from '@/config/types';

interface UseWeatherDataReturn extends WeatherInfo {
  isWeatherLoading: boolean;
}

export default function useWeatherData(geoPoint: GeoPoint): UseWeatherDataReturn {
  // 시간별 날씨 정보(기온, 하늘 상태, 강수 형태) 패칭
  const hourlyWeatherQuery = useQuery({
    queryKey: ['hourlyWeather', geoPoint?.latitude, geoPoint?.longitude], // 의존성에 위도와 경도 추가 -> 위도와 경도 값이 바뀌면 리패칭
    queryFn: () => getHourlyWeatherInfo(geoPoint),
    staleTime: calHourlyWeatherStaleTime(),
    gcTime: 1000 * 60 * 60,
    enabled: !!geoPoint,
  });

  // 일별 날씨 정보(일 최저기온, 일 최고기온) 패칭
  const dailyWeatherQuery = useQuery({
    queryKey: ['dailyWeather', geoPoint?.latitude, geoPoint?.longitude],
    queryFn: () => getDailyWeatherInfo(geoPoint),
    staleTime: calDailyWeatherStaleTime(),
    gcTime: 1000 * 60 * 60,
    enabled: !!geoPoint,
  });

  return {
    ...hourlyWeatherQuery.data,
    ...dailyWeatherQuery.data,
    isWeatherLoading: hourlyWeatherQuery.isLoading || dailyWeatherQuery.isLoading,
  };
}

function calHourlyWeatherStaleTime() {
  const now = new Date();
  const currentHour = now.getHours();

  // 다음 리패칭 시간을 계산
  // 리패칭 기준 시간: 0, 3, 6, 9, 12, 15, 18, 21시
  let nextRefetchHour = Math.ceil(currentHour / 3) * 3;
  if (nextRefetchHour === currentHour) nextRefetchHour += 3;
  if (nextRefetchHour >= 24) nextRefetchHour = 0;

  const nextRefetchTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), nextRefetchHour, 0, 0);

  // 만약 다음 리패칭 시간이 다음 날이라면 하루를 더함
  if (nextRefetchTime <= now) {
    nextRefetchTime.setDate(nextRefetchTime.getDate() + 1);
  }

  // 밀리초 단위로 차이 계산
  return nextRefetchTime.getTime() - now.getTime();
}

function calDailyWeatherStaleTime() {
  const now = new Date();
  const nextRefetchTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    2, // 2시
    11, // 11분
    0,
  );

  // 만약 현재 시간이 이미 2:11을 지났다면, 다음 날의 2:11으로 설정
  if (now > nextRefetchTime) {
    nextRefetchTime.setDate(nextRefetchTime.getDate() + 1);
  }

  // 밀리초 단위로 차이 계산
  return nextRefetchTime.getTime() - now.getTime();
}
