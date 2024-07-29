import CompassIcon from '../icons/CompassIcon';
import useWeatherData from '../../hooks/useWeatherData';

export default function WeatherInfoComponent() {
  const { location, currentTemp, minTemp, maxTemp, weatherType, isLoading } = useWeatherData();

  return (
    <div className="w-full bg-blue-200 h-[292px]">
      {isLoading ? (
        <div className="w-full h-full text-white flex justify-center items-center">
          날씨 정보를 가져오는 중입니다...
        </div>
      ) : (
        <div className="w-full h-full px-5 text-white flex">
          <div>
            <div className="mt-[55px] flex items-center gap-2">
              <CompassIcon fill={'white'} />
              <span>{location}</span>
            </div>
            <div className="mt-2 font-spoqa-han-sans font-bold text-[100px] leading-none">{currentTemp}°</div>
            <div className="font-bold">조금 쌀쌀해요!</div>
            <div className="text-sm">
              최고 {maxTemp}° / 최저 {minTemp}°
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
