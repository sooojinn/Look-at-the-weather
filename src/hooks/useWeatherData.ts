import { useQuery } from '@tanstack/react-query';
import { fetchLocation } from '../lib/geo';
import { getDailyWeatherInfo, getHourlyWeatherInfo } from '../lib/weather';
import { WeatherInfo } from '../config/types';

interface UseWeatherDataReturn extends WeatherInfo {
  location: string | undefined;
  isLoading: boolean;
}

export default function useWeatherData(): UseWeatherDataReturn {
  const locationQuery = useQuery({
    queryKey: ['location'],
    queryFn: fetchLocation,
  });

  const hourlyWeatherQuery = useQuery({
    queryKey: ['hourlyWeather'],
    queryFn: getHourlyWeatherInfo,
    // staleTime: 1000 * 60 * 60 * 1, // 1시간
  });

  const dailyWeatherQuery = useQuery({
    queryKey: ['dailyWeather'],
    queryFn: getDailyWeatherInfo,
    // staleTime: 1000 * 60 * 60 * 3, // 3시간
  });

  return {
    location: locationQuery.data,
    ...hourlyWeatherQuery.data,
    ...dailyWeatherQuery.data,
    isLoading: locationQuery.isLoading || hourlyWeatherQuery.isLoading || dailyWeatherQuery.isLoading,
  };
}
