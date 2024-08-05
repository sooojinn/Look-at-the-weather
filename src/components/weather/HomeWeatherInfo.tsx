import useWeatherData from '@/hooks/useWeatherData';
import Location from '@components/location/Location';
import CurrentTemp from '@components/weather/CurrentTemp';
import MinMaxTemps from '@components/weather/MinMaxTemps';
import WeatherImg from '@components/weather/WeatherImg';
import WeatherMessage from '@components/weather/WeatherMessage';

export default function HomeWeatherInfo() {
  const { currentTemp, weatherType, weatherMessage, minTemp, maxTemp, isLoading } = useWeatherData();

  // weather type에 따른 배경색 결정
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

  return (
    <div className="w-full h-[292px]">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">날씨 정보를 가져오는 중입니다...</div>
      ) : (
        <div
          className={`w-full h-full px-5 text-white flex justify-between items-center ${backgroundStyle[backgroundType]}`}
        >
          <div>
            <Location size="l" fill="white" />
            <CurrentTemp>{currentTemp}</CurrentTemp>
            <WeatherMessage size="l">{weatherMessage}</WeatherMessage>
            <MinMaxTemps minTemp={minTemp} maxTemp={maxTemp} />
          </div>
          <WeatherImg weatherType={weatherType as string} width={206} height={169} />
        </div>
      )}
    </div>
  );
}
