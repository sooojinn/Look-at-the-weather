import { useEffect, useState } from 'react';
import { BASEURL } from '../../constants/constants';
import axios from 'axios';
import { dfs_xy_conv, fetchGeoPoint } from '../../lib/geo';
import { getWeatherInfo } from '../../lib/weather';
import compassIcon from '../../assets/compass_icon.svg';

interface GeoPoint {
  latitude: number;
  longitude: number;
}

interface Location {
  location: string;
}

interface WeatherInfo {
  [key: string]: string | number | null;
}

// 위도와 경도를 보내면 지명을 응답하는 API
const getLocation = async (geoPoint: GeoPoint): Promise<Location> => {
  const response = await axios.post(`${BASEURL}/api/v1/locations`, geoPoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export default function WeatherInfo() {
  const [geoPoint, setGeoPoint] = useState<GeoPoint | undefined>();
  const [location, setLocation] = useState<Location | undefined>();
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // geolocation api로 현재 위치의 위도와 경도 가져오기
    const getGeoPoint = async () => {
      try {
        const nextGeoPoint = await fetchGeoPoint();
        setGeoPoint(nextGeoPoint);
        console.log(nextGeoPoint);
      } catch (error) {
        console.log(error);
      }
    };

    getGeoPoint();
  }, []);

  useEffect(() => {
    if (geoPoint) {
      // 위도와 경도로부터 위치 정보('OO시 OO구') 가져오기
      const fetchLocation = async () => {
        try {
          const nextLocation = await getLocation(geoPoint);
          setLocation(nextLocation);
          console.log(nextLocation);
        } catch (error) {
          console.error(error);
        }
      };

      // 현재 위치의 날씨 정보 가져오기
      const fetchWeatherInfo = async () => {
        // 위도와 경도를 좌표로 변환한 값
        const grid = dfs_xy_conv('toXY', geoPoint.latitude, geoPoint.longitude);
        console.log('변환된 좌표:', grid.x, grid.y);
        try {
          const nextWeatherInfo = await getWeatherInfo(grid.x as number, grid.y as number);
          setWeatherInfo(nextWeatherInfo);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchLocation();
      fetchWeatherInfo();
    }
  }, [geoPoint]); // geoPoint가 변경될 때마다 useEffect 실행

  return (
    <div className="w-full bg-blue-200 h-[292px]">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">날씨 정보를 가져오는 중입니다...</div>
      ) : (
        <div className="w-full h-full px-5 text-white ">
          <div className="mt-[55px] flex gap-2">
            <img src={compassIcon} />
            <span>{location?.location}</span>
          </div>
          <div className="mt-2 font-spoqa-han-sans font-bold text-[100px] leading-none">
            {weatherInfo?.currentTemp}°
          </div>
          <div className="font-bold">조금 쌀쌀해요!</div>
          <div className="text-sm">
            최고 {weatherInfo?.maxTemp}° / 최저 {weatherInfo?.minTemp}°
          </div>
        </div>
      )}
    </div>
  );
}
