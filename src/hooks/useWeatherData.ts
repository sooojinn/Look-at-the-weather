import { useQuery } from '@tanstack/react-query';
import { fetchLocation } from '../lib/geo';
import { getDailyWeatherInfo, getHourlyWeatherInfo } from '../lib/weather';

export default function useWeatherData() {
  const locationQuery = useQuery({
    queryKey: ['location'],
    queryFn: fetchLocation,
  });

  const hourlyWeatherQuery = useQuery({
    queryKey: ['hourlyWeather'],
    queryFn: getHourlyWeatherInfo,
    staleTime: 1000 * 60 * 60 * 1, // 1시간
  });

  const dailyWeatherQuery = useQuery({
    queryKey: ['dailyWeather'],
    queryFn: getDailyWeatherInfo,
    staleTime: 1000 * 60 * 60 * 3, // 3시간
  });

  return {
    location: locationQuery.data,
    currentTemp: hourlyWeatherQuery.data?.currentTemp,
    minTemp: dailyWeatherQuery.data?.minTemp,
    maxTemp: dailyWeatherQuery.data?.maxTemp,
    isLoading: locationQuery.isLoading || hourlyWeatherQuery.isLoading || dailyWeatherQuery.isLoading,
  };
}
