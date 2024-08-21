import { useQuery } from '@tanstack/react-query';
import { getDailyWeatherInfo, getHourlyWeatherInfo } from '@/lib/weather';
import { GeoPoint, WeatherInfo } from '@/config/types';

interface UseWeatherDataReturn extends WeatherInfo {
  isWeatherSuccess: boolean;
}

export default function useWeatherData(geoPoint: GeoPoint | undefined): UseWeatherDataReturn {
  // 공통 useQuery 함수
  const fetchWeatherData = (key: string, fetchFn: () => Promise<WeatherInfo>) => {
    return useQuery({
      queryKey: [key, geoPoint?.latitude, geoPoint?.longitude],
      queryFn: fetchFn,
      staleTime: calStaleTime(), // 매 정각에 리패칭
      gcTime: 1000 * 60 * 60,
      enabled: !!geoPoint,
    });
  };

  // 시간별 날씨 정보(기온, 하늘 상태, 강수 형태) 패칭
  const hourlyWeatherQuery = fetchWeatherData('hourlyWeather', () => getHourlyWeatherInfo(geoPoint as GeoPoint));

  // 일별 날씨 정보(일 최저기온, 일 최고기온) 패칭
  const dailyWeatherQuery = fetchWeatherData('dailyWeather', () => getDailyWeatherInfo(geoPoint as GeoPoint));

  return {
    ...hourlyWeatherQuery.data,
    ...dailyWeatherQuery.data,
    isWeatherSuccess: hourlyWeatherQuery.isSuccess && dailyWeatherQuery.isSuccess,
  };
}

function calStaleTime() {
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
