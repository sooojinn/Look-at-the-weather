import useLocationAndWeatherData from '@/hooks/useLocationAndWeatherData';
import Location from '@components/common/molecules/LocationModal';
import { showToast } from '@components/common/molecules/ToastProvider';
import Spinner from '@components/icons/Spinner';
import CurrentTemp from '@components/weather/CurrentTemp';
import MinMaxTemps from '@components/weather/MinMaxTemps';
import WeatherImg from '@components/weather/WeatherImg';
import WeatherMessage from '@components/weather/WeatherMessage';
import { useEffect } from 'react';

export default function HomeWeatherInfo() {
  const { location, weatherData, isLoading, isSuccess, isError, handleRefetch } = useLocationAndWeatherData();
  const { currentTemp, weatherType, weatherMessage, minTemp, maxTemp } = weatherData;

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
  };

  useEffect(() => {
    if (isError) {
      showToast('위치 정보 또는 날씨 정보를 불러오는 데 실패했습니다.', '재시도', handleRefetch);
    }
  }, [isError, handleRefetch]);

  return (
    <div className={`w-full h-[292px] relative ${backgroundStyle[isSuccess ? backgroundType : 'normal']}`}>
      {isSuccess && (
        <div className={`w-full h-full px-5 text-white flex justify-between items-center`}>
          <div>
            <Location location={location} size="l" color="white" />
            <CurrentTemp>{currentTemp}</CurrentTemp>
            <WeatherMessage size="l" color="white">
              {weatherMessage}
            </WeatherMessage>
            <MinMaxTemps minTemp={minTemp} maxTemp={maxTemp} color="white" />
          </div>
          <WeatherImg weatherType={weatherType as string} width={206} height={169} />
        </div>
      )}
      {isLoading && (
        <div className="absolute inset-0 bg-black opacity-20 flex justify-center items-center">
          <Spinner width={40} />
        </div>
      )}
    </div>
  );
}
