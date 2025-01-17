import LocationComponent from '@components/common/molecules/LocationComponent';
import WeatherMessage from './WeatherMessage';
import MinMaxTemps from './MinMaxTemps';
import Text from '@components/common/atom/Text';
import WeatherImg from './WeatherImg';
import useLocationData from '@/hooks/useLocationData';
import useWeatherData from '@/hooks/useWeatherData';
import Skeleton from '../common/atom/Skeleton';

export default function LookWeatherInfo() {
  const { geoPoint, location, isLocationLoading, isLocationSuccess, isLocationError } = useLocationData();
  const { weatherData, isWeatherLoading, isWeatherSuccess, isWeatherError, handleRefetch } = useWeatherData(geoPoint);
  const { weatherMessage, weatherType, minTemp, maxTemp } = weatherData;

  const isLoading = isLocationLoading || isWeatherLoading;
  const isSuccess = isLocationSuccess && isWeatherSuccess;
  const isError = isLocationError || isWeatherError;
  return (
    <div className="min-h-[129px] flex justify-between items-center py-2.5 relative">
      <>
        <div className="flex flex-col gap-2.5">
          <LocationComponent {...location} size="m" isLoading={isLocationLoading} />
          {isLoading ? (
            <>
              <Skeleton className="w-[150px] h-[27px]" />
              <Skeleton className="w-[100px] h-[21px]" />
            </>
          ) : (
            <>
              {isSuccess && (
                <>
                  <WeatherMessage size="xl">{weatherMessage}</WeatherMessage>
                  <MinMaxTemps minTemp={minTemp} maxTemp={maxTemp} color="gray" />
                </>
              )}
              {isError && (
                <>
                  <Text size="2xl" weight="bold">
                    Error
                  </Text>
                  <div onClick={handleRefetch}>
                    <Text size="s" color="gray" weight="bold" className="underline cursor-pointer">
                      재시도
                    </Text>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        {isLoading ? (
          <div className="h-[110px] flex justify-center items-center p-5">
            <Skeleton className="w-[100px] h-[70px]" />
          </div>
        ) : (
          <WeatherImg weatherType={isSuccess ? (weatherType as string) : 'error'} height={110} />
        )}
      </>
    </div>
  );
}
