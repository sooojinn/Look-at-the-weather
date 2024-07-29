import axios from 'axios';
import { SERVICE_KEY, WEATHER_API_URL } from '../config/constants';
import { WeatherInfo } from '../config/types';
import { dfs_xy_conv, fetchGeoPoint } from './geo';

interface WeatherApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: string;
      items: {
        item: ForecastItem[] | undefined;
      };
      pageNo: number;
      numOfRows: number;
      totalCount: number;
    };
  };
}

interface ForecastItem {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
  nx: number;
  ny: number;
}

interface CategoryInfo {
  name: string;
  func: (value: string) => number | string;
}

interface FilterCategories {
  [key: string]: CategoryInfo;
}

interface ForecastType {
  getBaseTime(): string;
  filterCategories: FilterCategories;
  filterForecast(items: ForecastItem[], category: string): ForecastItem | undefined;
}

function getCurrentDateInfo() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const fcstDate = `${year}${month}${day}`; // 예보 날짜(현재 날짜)
  const fcstTime = `${hours.toString().padStart(2, '0')}00`; // 예보 시각(현재 시각)

  return { now, hours, minutes, fcstDate, fcstTime };
}

// 시간별 예보 (기온, 하늘 상태, 강수 형태)
const hourly: ForecastType = {
  getBaseTime() {
    const { hours } = getCurrentDateInfo();
    // 예보 발표 시각 (매일 3시간 간격)
    const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];

    // 발표 시각은 현재 시각보다 작은 값 중 가장 큰 값
    // 발표 자료엔 발표 시각의 1시간 이후부터의 데이터가 있기 때문에 현재 시각과 발표 시각이 같으면 안 됨
    // ex. 5시 발표 자료에는 6시 이후부터의 데이터가 있음. 따라서 현재 시각이 5시 mm분일 때는 2시 발표 자료 중 예보 시각이 5시인 데이터가 가장 최신 데이터임.
    const baseTime =
      baseTimes.reverse().find((time) => {
        return hours > time;
      }) || 23;

    return baseTime.toString().padStart(2, '0') + '00'; // HH00 형태
  },

  filterCategories: {
    // 기온
    TMP: {
      name: 'currentTemp',
      func(value: string) {
        return parseInt(value);
      },
    },
    // 하늘 상태
    SKY: {
      name: 'sky',
      func(value: string) {
        switch (+value) {
          case 1:
            return '맑음';
          // 2는 원래 없음
          case 3:
            return '구름 많음';
          case 4:
            return '흐림';
          default:
            return '결과값 없음';
        }
      },
    },
    // 강수 형태
    PTY: {
      name: 'precipType',
      func(value: string) {
        switch (+value) {
          case 0:
            return '없음';
          case 1:
            return '비';
          case 2:
            return '비/눈';
          case 3:
            return '눈';
          case 4:
            return '소나기';
          default:
            return '결과값 없음';
        }
      },
    },
  },

  filterForecast(items: ForecastItem[], category: string) {
    const { fcstDate, fcstTime } = getCurrentDateInfo();
    // 응답 받은 데이터 중 카테고리, 예보 날짜, 예보 시각이 일치하는 데이터 반환
    return items.find((item) => item.category === category && item.fcstDate === fcstDate && item.fcstTime === fcstTime);
  },
};

// 일별 예보 (일 최저기온, 일 최고기온)
const daily: ForecastType = {
  getBaseTime() {
    const { hours, minutes } = getCurrentDateInfo();
    // 00:00 ~ 02:10는 전날의 23시 발표 자료를, 02:11 ~ 23:59는 당일의 2시 발표 자료를 패칭함
    // 당일의 일 최저기온 데이터는 2시에 발표되는 게 마지막, 그 이후의 시각에 발표되는 자료부터는 익일의 최저기온 데이터밖에 없음
    // 2시 발표 자료는 2시 10분 이후부터 api로 접근 가능
    return hours < 2 || (hours === 2 && minutes <= 10) ? '2300' : '0200';
  },

  filterCategories: {
    // 일 최저기온
    TMN: {
      name: 'minTemp',
      func(value: string) {
        return parseInt(value);
      },
    },
    // 일 최고기온
    TMX: {
      name: 'maxTemp',
      func(value: string) {
        return parseInt(value);
      },
    },
  },

  filterForecast(items: ForecastItem[], category: string) {
    const { fcstDate } = getCurrentDateInfo();
    // 응답 받은 데이터 중 카테고리, 예보 날짜가 일치하는 데이터 반환(일 최저/최고기온은 예보 시각이 무의미)
    return items.find((item) => item.category === category && item.fcstDate === fcstDate);
  },
};

async function getGrid() {
  const geoPoint = await fetchGeoPoint();
  const { x: nx, y: ny } = dfs_xy_conv('toXY', geoPoint.latitude, geoPoint.longitude);

  return { nx, ny };
}

// base_date(발표 날짜)를 구하는 함수
function getBaseDate(baseTime: string): string {
  const { now } = getCurrentDateInfo();

  // 발표 시각이 23시면 하루 전 날짜로
  if (baseTime === '2300') {
    now.setDate(now.getDate() - 1);
  }

  return (
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0') // YYYYMMDD 형태
  );
}

// 단기예보 api로 현재 위치의 날씨 데이터를 받아옴
export async function getWeatherForecasts(forecastType: ForecastType): Promise<ForecastItem[]> {
  const baseTime = forecastType.getBaseTime();
  const baseDate = getBaseDate(baseTime);

  const { nx, ny } = await getGrid();

  console.log('발표날짜: ', baseDate);
  console.log('발표시간: ', baseTime);
  try {
    const response = await axios.get<WeatherApiResponse>(WEATHER_API_URL, {
      params: {
        ServiceKey: SERVICE_KEY,
        pageNo: 1,
        numOfRows: 200,
        dataType: 'JSON',
        base_date: baseDate,
        base_time: baseTime,
        nx: nx,
        ny: ny,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 예보 데이터가 담긴 배열
    const items = response.data.response.body.items.item;

    if (!items || items.length === 0) {
      throw new Error(
        `지정된 매개변수에 대한 기상 예보 데이터가 없습니다. 발표날짜: ${baseDate}, 발표시간: ${baseTime}, nx: ${nx}, ny: ${ny}`,
      );
    }
    return items;
  } catch (error) {
    console.error('Weather API 요청 실패:', error);
    throw error;
  }
}

// 응답 받은 예보 데이터 중 필요한 항목만 추출
function extractWeatherInfo(forecastType: ForecastType, items: ForecastItem[]) {
  const categories = forecastType.filterCategories;

  const weatherInfo: WeatherInfo = {};

  for (const category in categories) {
    const filteredItem = forecastType.filterForecast(items, category);
    const value = filteredItem?.fcstValue;

    const categoryInfo = forecastType.filterCategories[category];
    weatherInfo[categoryInfo.name] = value ? parseInt(value) : null;
  }
  return weatherInfo;
}

// 현재 위치(nx, ny)의 시간별 날씨 정보(기온, 하늘 상태, 강수 형태)를 얻는 함수
// 시간별 예보 데이터(기온, 하늘 상태, 강수 형태)와 일별 예보 데이터(일 최저기온, 최고기온)는
// 최신 데이터의 base_time이 다르기 때문에 따로 패칭
export async function getHourlyWeatherInfo() {
  const forecasts = await getWeatherForecasts(hourly);
  return extractWeatherInfo(hourly, forecasts);
}

// 현재 위치(nx, ny)의 일별 날씨 정보(일 최저기온, 일 최고기온)를 얻는 함수
export async function getDailyWeatherInfo() {
  const forecast = await getWeatherForecasts(daily);
  return extractWeatherInfo(daily, forecast);
}
