import useLocationAndWeatherData from '@/hooks/useLocationAndWeatherData';
import Location from '@components/common/molecules/Location';
import Spinner from '@components/icons/Spinner';
import CurrentTemp from '@components/weather/CurrentTemp';
import MinMaxTemps from '@components/weather/MinMaxTemps';
import WeatherImg from '@components/weather/WeatherImg';
import WeatherMessage from '@components/weather/WeatherMessage';

export default function HomeWeatherInfo() {
  const { location, weatherData, isLoading, isSuccess, isError, handleRefetch } = useLocationAndWeatherData();
  const { currentTemp, weatherType, weatherMessage, minTemp, maxTemp } = weatherData;

  const backgroundType: 'light' | 'normal' | 'dark' = (() => {
    if (currentTemp >= 33 && weatherType === 'clear') {
      return 'light';
    } else if (['cloudy', 'rain', 'snow', 'sleet'].includes(weatherType)) {
      return 'dark';
    } else {
      return 'normal';
    }
  })();

  const backgroundStyle = {
    light: 'bg-weather-light-gradient',
    normal: 'bg-weather-normal-gradient',
    dark: 'bg-weather-dark-gradient',
  };

  return (
    <div className={`w-full h-[292px] relative ${backgroundStyle[backgroundType]}`}>
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
      {isError && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div>
            날씨 또는 위치 정보를 가져오는 데 실패했습니다.
            <br /> 다시 시도해주세요.
          </div>
          <button onClick={handleRefetch}>재시도</button>
        </div>
      )}
    </div>
  );
}
