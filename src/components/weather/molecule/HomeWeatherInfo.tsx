import { WeatherInfo } from '@/config/types';
import Text from '../../common/atom/Text';
import CurrentTemp from '../atom/CurrentTemp';
import MinMaxTemps from '../atom/MinMaxTemps';
import Skeleton from '../../skeleton/Skeleton';

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
          <Skeleton fontSize={14} className="w-[100px]" />
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
