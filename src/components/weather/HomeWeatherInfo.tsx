import { WeatherInfo } from '@/config/types';
import Text from '../common/atom/Text';
import CurrentTemp from './CurrentTemp';
import MinMaxTemps from './MinMaxTemps';
import Skeleton from '../common/atom/Skeleton';

export default function HomeWeatherInfo({
  currentTemp,
  minTemp,
  maxTemp,
  isLoading,
}: WeatherInfo & { isLoading: boolean }) {
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton className="w-[150px] h-5" />
          <Skeleton className="w-[100px] h-4" />
        </>
      ) : (
        <>
          <Text color="white">
            현재 기온은 <CurrentTemp>{currentTemp}</CurrentTemp> 입니다.
          </Text>
          <MinMaxTemps minTemp={minTemp} maxTemp={maxTemp} color="white" />
        </>
      )}
    </>
  );
}
