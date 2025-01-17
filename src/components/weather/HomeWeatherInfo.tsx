'use client';

import useLocationData from '@/hooks/useLocationData';
import useWeatherData from '@/hooks/useWeatherData';
import Location from '@components/common/molecules/LocationComponent';
import CurrentTemp from '@components/weather/CurrentTemp';
import MinMaxTemps from '@components/weather/MinMaxTemps';
import WeatherImg from '@components/weather/WeatherImg';
import Text from '@components/common/atom/Text';
import Skeleton from '../common/atom/Skeleton';

export default function HomeWeatherInfo() {
  const { geoPoint, location, isLocationLoading, isLocationSuccess, isLocationError } = useLocationData();
  const { weatherData, isWeatherLoading, isWeatherSuccess, isWeatherError, handleRefetch } = useWeatherData(geoPoint);
  const { currentTemp, weatherType, minTemp, maxTemp } = weatherData;

  const isLoading = isLocationLoading || isWeatherLoading;
  const isSuccess = isLocationSuccess && isWeatherSuccess;
  const isError = isLocationError || isWeatherError;

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

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center px-5 pt-5">
        <Location {...location} size="l" isLoading={isLocationLoading} />
        <div
          className={`w-full h-[100px] mt-2 relative rounded-[10px] flex flex-row items-center justify-between px-5 ${
            backgroundStyle[isLoading ? 'normal' : isSuccess ? backgroundType : 'error']
          }`}
        >
          {!isLoading && (
            <>
              <div className="flex flex-col gap-1.5">
                {isSuccess && (
                  <>
                    <Text color="white">
                      현재 기온은 <CurrentTemp>{currentTemp}</CurrentTemp> 입니다.
                    </Text>
                    <MinMaxTemps minTemp={minTemp} maxTemp={maxTemp} color="white" />
                  </>
                )}
                {isError && (
                  <>
                    <p className="text-[24px] text-white font-bold">Error</p>
                    <div onClick={handleRefetch} className="underline text-s text-white">
                      재시도
                    </div>
                  </>
                )}
              </div>
              <WeatherImg weatherType={isSuccess ? (weatherType as string) : 'error'} height={90} />
            </>
          )}
          {isLoading && (
            <>
              <div className="absolute inset-0 bg-opacity-black20 rounded-[10px] flex justify-center items-center"></div>
              <div className="flex flex-col gap-2.5">
                <Skeleton className="w-[150px] h-5" />
                <Skeleton className="w-[100px] h-4" />
              </div>
              <Skeleton className="w-[80px] h-14 m-5" />
            </>
          )}
        </div>
      </div>
    </>
  );
}
