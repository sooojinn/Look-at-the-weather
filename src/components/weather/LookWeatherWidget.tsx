import LocationComponent from '@components/common/molecules/LocationComponent';
import WeatherImg from './WeatherImg';
import useLocationData from '@/hooks/useLocationData';
import useWeatherData from '@/hooks/useWeatherData';
import WeatherInfoError from './WeatherInfoError';
import LookWeatherInfo from './LookWeatherInfo';
import { useEffect } from 'react';
import { showToast } from '../common/molecules/ToastProvider';

export default function LookWeatherWidget() {
  const { location, isLoading: isLocationLoading } = useLocationData();
  const {
    weatherData,
    isLoading: isWeatherLoading,
    isSuccess: isWeatherSuccess,
    isError: isWeatherError,
    handleRefetch,
  } = useWeatherData();
  const { weatherType } = weatherData;

  useEffect(() => {
    if (isWeatherError) {
      showToast('현재 위치 정보를 불러올 수 없어요.', '재시도', handleRefetch);
    }
  }, [isWeatherError]);

  return (
    <div className="min-h-[129px] flex justify-between items-center py-2.5 relative">
      <div className="flex flex-col gap-2.5">
        <LocationComponent {...location} size="m" isLoading={isLocationLoading} />
        {!isWeatherError && <LookWeatherInfo {...weatherData} isLoading={isWeatherLoading} />}
        {isWeatherError && <WeatherInfoError handleRefetch={handleRefetch} />}
      </div>
      <WeatherImg
        weatherType={isWeatherSuccess ? (weatherType as string) : 'error'}
        height={110}
        isLoading={isWeatherLoading}
      />
    </div>
  );
}
