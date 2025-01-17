'use client';

import useLocationData from '@/hooks/useLocationData';
import useWeatherData from '@/hooks/useWeatherData';
import Location from '@components/common/molecules/LocationComponent';
import WeatherImg from '@components/weather/WeatherImg';
import HomeWeatherInfo from './HomeWeatherInfo';
import WeatherInfoError from './WeatherInfoError';
import { useEffect } from 'react';
import { showToast } from '../common/molecules/ToastProvider';

export default function HomeWeatherWidget() {
  const { location, isLoading: isLocationLoading } = useLocationData();
  const {
    weatherData,
    isLoading: isWeatherLoading,
    isSuccess: isWeatherSuccess,
    isError: isWeatherError,
    handleRefetch,
  } = useWeatherData();
  const { currentTemp, weatherType } = weatherData;

  const backgroundType: 'light' | 'normal' | 'dark' = (() => {
    if (currentTemp >= 33 && weatherType === 'clear') {
      return 'light';
    } else if (weatherType === 'clear' || weatherType === 'partly_cloudy') {
      return 'normal';
    } else {
      return 'dark';
    }
  })();

  const backgroundStyle = {
    light: 'bg-weather-light-gradient',
    normal: 'bg-weather-normal-gradient',
    dark: 'bg-weather-dark-gradient',
    error: 'bg-weather-error-gradient',
  };

  useEffect(() => {
    if (isWeatherError) {
      showToast('현재 날씨 정보를 불러올 수 없어요.', '재시도', handleRefetch);
    }
  }, [isWeatherError]);

  return (
    <div className="w-full h-full flex flex-col justify-center px-5 pt-5">
      <Location {...location} size="l" isLoading={isLocationLoading} />
      <div
        className={`w-full h-[100px] mt-2 relative rounded-[10px] flex flex-row items-center justify-between px-5 ${
          backgroundStyle[isWeatherLoading ? 'normal' : isWeatherSuccess ? backgroundType : 'error']
        }`}
      >
        <div className="flex flex-col gap-1.5">
          {!isWeatherError && <HomeWeatherInfo {...weatherData} isLoading={isWeatherLoading} />}
          {isWeatherError && <WeatherInfoError color="white" handleRefetch={handleRefetch} />}
        </div>
        <WeatherImg
          weatherType={isWeatherSuccess ? (weatherType as string) : 'error'}
          height={90}
          isLoading={isWeatherLoading}
        />
      </div>
    </div>
  );
}
