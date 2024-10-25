import axios from 'axios';
import { SERVICE_KEY, WEATHER_API_URL } from '../config/constants';
import { GeoPoint, WeatherInfo } from '@/config/types';
import { dfs_xy_conv } from './geo';

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

interface FilterCategories {
  [key: string]: { name: string };
}

interface ForecastType {
  getPageNo: () => number;
  numOfRows: number;
  baseTime: string;
  categories: FilterCategories;
}

type WeatherType = 'clear' | 'hot' | 'partly_cloudy' | 'cloudy' | 'rain' | 'snow' | 'sleet';

function getCurrentDateInfo() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return { now, hours, minutes };
}

function filterForecast(items: ForecastItem[], category: string) {
  return items.find((item) => item.category === category);
}

// 시간별 예보 (기온, 하늘 상태, 강수 형태)
const hourly: ForecastType = {
  numOfRows: 12,
  baseTime: getHourlyForecastBaseTime(),
  getPageNo() {
    return (getCurrentDateInfo().hours % 3) + 1;
  },
  categories: {
    TMP: { name: 'currentTemp' }, // 기온
    SKY: { name: 'sky' }, // 하늘 상태
    PTY: { name: 'precipType' }, // 강수 형태
  },
};

const minTemp: ForecastType = {
  numOfRows: 10,
  baseTime: getDailyForecastBaseTime(),
  getPageNo: () => {
    return minTemp.baseTime === '0200' ? 5 : 9;
  },
  categories: {
    TMN: { name: 'minTemp' }, // 일 최저기온
  },
};

const maxTemp: ForecastType = {
  numOfRows: 10,
  baseTime: getDailyForecastBaseTime(),
  getPageNo: () => {
    return maxTemp.baseTime === '0200' ? 16 : 20;
  },
  categories: {
    TMX: { name: 'maxTemp' }, // 일 최고기온
  },
};

// 현재 위치의 nx. ny 좌표를 구함
async function getGrid(geoPoint: GeoPoint) {
  const { x: nx, y: ny } = dfs_xy_conv('toXY', geoPoint.latitude, geoPoint.longitude);

  return { nx, ny };
}

// 시간별 예보의 base_time(발표 시각)을 구하는 함수
function getHourlyForecastBaseTime() {
  const { hours } = getCurrentDateInfo();
  const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];

  const baseTime =
    baseTimes.reverse().find((time) => {
      return hours > time;
    }) || 23;

  return baseTime.toString().padStart(2, '0') + '00'; // HH00 형태
}

// 일별 예보의 base_time(발표 시각)을 구하는 함수
function getDailyForecastBaseTime() {
  const { hours, minutes } = getCurrentDateInfo();

  return hours < 2 || (hours === 2 && minutes <= 10) ? '2300' : '0200';
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
export async function getWeatherForecasts(
  forecastType: ForecastType,
  geoPoint: GeoPoint,
): Promise<ForecastItem[] | undefined> {
  try {
    const { getPageNo, numOfRows, baseTime } = forecastType;
    const pageNo = getPageNo();
    const baseDate = getBaseDate(baseTime);
    const { nx, ny } = await getGrid(geoPoint);

    const response = await axios.get<WeatherApiResponse>(WEATHER_API_URL, {
      params: {
        ServiceKey: SERVICE_KEY,
        pageNo: pageNo,
        numOfRows: numOfRows,
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

    // 에러 발생 시 에러 메시지 출력
    if (!response.data.response.body) {
      console.error(`${response.data.response.header.resultMsg}`);
      throw new Error(`${response.data.response.header.resultMsg}`);
    }

    // 예보 데이터 반환
    const items = response.data.response.body.items.item;
    return items;
  } catch (error) {
    console.error('Weather API 요청 실패:', error);
    throw error;
  }
}

// 응답 받은 예보 데이터 중 필요한 항목만 추출
function extractWeatherInfo(forecastType: ForecastType, items: ForecastItem[]) {
  const { categories } = forecastType;

  const weatherInfo: WeatherInfo = {};

  for (const category in categories) {
    const filteredItem = filterForecast(items, category);
    const value = filteredItem?.fcstValue;

    const categoryInfo = categories[category];
    weatherInfo[categoryInfo.name] = value ? parseInt(value) : null;
  }
  return weatherInfo;
}

// 시간별 날씨 정보(기온, 하늘 상태, 강수 형태)를 얻는 함수
export async function getHourlyWeatherInfo(geoPoint: GeoPoint) {
  const forecasts = await getWeatherForecasts(hourly, geoPoint);

  if (!forecasts) return;

  const weatherInfo = extractWeatherInfo(hourly, forecasts);
  const { currentTemp, sky, precipType } = weatherInfo;

  weatherInfo.weatherType = getWeatherType(sky, precipType);
  weatherInfo.weatherMessage = getWeatherMessage(currentTemp, sky, precipType);

  return weatherInfo;
}

// 일별 날씨 정보(일 최저기온, 일 최고기온)를 얻는 함수
export async function getDailyWeatherInfo(geoPoint: GeoPoint) {
  const minForecasts = await getWeatherForecasts(minTemp, geoPoint);
  const maxForecasts = await getWeatherForecasts(maxTemp, geoPoint);

  if (!minForecasts || !maxForecasts) return;

  const weatherInfo = { ...extractWeatherInfo(minTemp, minForecasts), ...extractWeatherInfo(maxTemp, maxForecasts) };

  return weatherInfo;
}

// 하늘 상태와 강수 형태로 날씨 타입 결정
function getWeatherType(sky: number, precipType: number): WeatherType {
  switch (precipType) {
    case 1:
    case 4:
      return 'rain';
    case 2:
      return 'sleet';
    case 3:
      return 'snow';
    default:
      switch (sky) {
        case 1:
          return 'clear';
        case 3:
          return 'partly_cloudy';
        case 4:
          return 'cloudy';
        default:
          return 'partly_cloudy';
      }
  }
}

// 기온, 하늘 상태, 강수 형태로 날씨에 맞게 문구 작성
function getWeatherMessage(currentTemp: number, sky: number, precipType: number) {
  // 강수 형태 체크
  if (precipType > 0) {
    switch (precipType) {
      case 1:
        return '비가 내리는 날이에요!';
      case 2:
        return '눈/비가 내리는 날이에요!';
      case 3:
        return '눈이 내리는 날이에요!';
      case 4:
        return '소나기가 오는 날이에요!';
    }
  }

  // 기온 체크
  if (currentTemp <= 0) {
    return '매우 추운 날이에요!';
  } else if (currentTemp > 30) {
    return '매우 더운 날이에요!';
  } else if (currentTemp > 0 && currentTemp <= 10) {
    // 쌀쌀한 경우 하늘 상태 체크
    let skyCondition = '';
    switch (sky) {
      case 1:
        skyCondition = '하늘이 맑은 날이에요!';
        break;
      case 3:
        skyCondition = '구름이 많은 날이에요!';
        break;
      case 4:
        skyCondition = '날씨가 흐린 날이에요!';
        break;
    }
    return `쌀쌀하고 ${skyCondition}`;
  }

  // 나머지 경우 하늘 상태만 체크
  switch (sky) {
    case 1:
      return '하늘이 맑은 날이에요!';
    case 3:
      return '구름이 많은 날이에요!';
    case 4:
      return '날씨가 흐린 날이에요!';
    default:
      return '';
  }
}
