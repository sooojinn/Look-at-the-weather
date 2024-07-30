import CompassIcon from '../icons/CompassIcon';
import useWeatherData from '../../hooks/useWeatherData';

interface WeatherImgProps {
  weatherType: string;
}

function WeatherImg({ weatherType }: WeatherImgProps) {
  const weatherImgSrc = `/weatherImages/${weatherType}.svg`;

  return (
    <div className="w-[206px] h-[169px] flex justify-center items-center">
      <img src={weatherImgSrc} className="h-[80%] object-contain" />
    </div>
  );
}

export default function WeatherInfoComponent() {
  const { location, currentTemp, weatherType, minTemp, maxTemp, isLoading } = useWeatherData();

  // weather type에 따른 배경색 결정
  const backgroundType: 'light' | 'normal' | 'dark' = (() => {
    if (+(currentTemp as string) >= 33 && weatherType === 'clear') {
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
            <div className="flex items-center gap-2">
              <CompassIcon fill={'white'} />
              <span>{location}</span>
            </div>
            <div className="mt-2 font-spoqa-han-sans font-bold text-[100px] leading-none">{currentTemp}°</div>
            <div className="font-bold">조금 쌀쌀해요!</div>
            <div className="text-sm">
              최고 {parseInt(maxTemp ?? '0')}° / 최저 {parseInt(minTemp ?? '0')}°
            </div>
          </div>
          <WeatherImg weatherType={weatherType as string} />
        </div>
      )}
    </div>
  );
}
