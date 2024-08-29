import useLocationData from '@/hooks/useLocationData';
import useWeatherData from '@/hooks/useWeatherData';
import Location from '@components/common/molecules/Location';
import Spinner from '@components/icons/Spinner';
import CurrentTemp from '@components/weather/CurrentTemp';
import MinMaxTemps from '@components/weather/MinMaxTemps';
import WeatherImg from '@components/weather/WeatherImg';
import WeatherMessage from '@components/weather/WeatherMessage';

export default function HomeWeatherInfo() {
  const { geoPoint, location, isLocationSuccess } = useLocationData();
  const { currentTemp, weatherType, weatherMessage, minTemp, maxTemp, isWeatherSuccess } = useWeatherData(geoPoint);

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
      <div
        className={`w-full h-full px-5 text-white flex justify-between items-center relative ${backgroundStyle[backgroundType]}`}
      >
        {isLocationSuccess && isWeatherSuccess ? (
          <>
            <div>
              <Location location={location} size="l" color="white" />
              <CurrentTemp>{currentTemp}</CurrentTemp>
              <WeatherMessage size="l" color="white">
                {weatherMessage}
              </WeatherMessage>
              <MinMaxTemps minTemp={minTemp} maxTemp={maxTemp} color="white" />
            </div>
            <WeatherImg weatherType={weatherType as string} width={206} height={169} />
          </>
        ) : (
          <div className="absolute inset-0 bg-black opacity-20 flex justify-center items-center">
            <Spinner width={40} />
          </div>
        )}
      </div>
    </div>
  );
}
