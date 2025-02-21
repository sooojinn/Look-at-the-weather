import { WeatherInfo } from '@/config/types';
import MinMaxTemps from '../atom/MinMaxTemps';
import Skeleton from '../../skeleton/Skeleton';
import WeatherMessage from '../atom/WeatherMessage';

export default function LookWeatherInfo({
  weatherMessage,
  minTemp,
  maxTemp,
  isLoading,
}: WeatherInfo & { isLoading: boolean }) {
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton className="w-[200px] h-[27px]" />
          <Skeleton className="w-[100px] h-[21px]" />
        </>
      ) : (
        <>
          <WeatherMessage size="xl">{weatherMessage}</WeatherMessage>
          <MinMaxTemps minTemp={minTemp} maxTemp={maxTemp} color="gray" />
        </>
      )}
    </>
  );
}
