import axios from 'axios';
import { SERVICE_KEY, WEATHER_API_URL } from '../constants/constants';

interface WeatherApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: string;
      items: {
        item: ForecastItem[];
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

interface WeatherInfo {
  [key: string]: string | number | null;
}

function getCurrentDateInfo() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const fcstDate = `${year}${month}${day}`;
  const fcstTime = `${hours.toString().padStart(2, '0')}00`;

  return { now, hours, minutes, fcstDate, fcstTime };
}

const hourly: ForecastType = {
  getBaseTime() {
    const { hours } = getCurrentDateInfo();
    const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];

    let baseTime =
      baseTimes.reverse().find((time) => {
        return hours > time;
      }) || 23;

    return baseTime.toString().padStart(2, '0') + '00';
  },

  filterCategories: {
    TMP: {
      name: 'currentTemp',
      func(value: string) {
        return parseInt(value);
      },
    },
    SKY: {
      name: 'sky',
      func(value: string) {
        switch (+value) {
          case 1:
            return '맑음';
          case 3:
            return '구름 많음';
          case 4:
            return '흐림';
          default:
            return '결과값 없음';
        }
      },
    },
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
    return items.find((item) => item.category === category && item.fcstDate === fcstDate && item.fcstTime === fcstTime);
  },
};

const daily: ForecastType = {
  getBaseTime() {
    const { hours, minutes } = getCurrentDateInfo();
    return hours < 2 || (hours === 2 && minutes <= 10) ? '2300' : '0200';
  },

  filterCategories: {
    TMN: {
      name: 'minTemp',
      func(value: string) {
        return parseInt(value);
      },
    },
    TMX: {
      name: 'maxTemp',
      func(value: string) {
        return parseInt(value);
      },
    },
  },

  filterForecast(items: ForecastItem[], category: string) {
    const { fcstDate } = getCurrentDateInfo();
    return items.find((item) => item.category === category && item.fcstDate === fcstDate);
  },
};

function getBaseDate(baseTime: string): string {
  const { now } = getCurrentDateInfo();

  if (baseTime === '2300') {
    now.setDate(now.getDate() - 1);
  }

  return (
    now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0')
  );
}

export async function getWeatherForecasts(forecastType: ForecastType, nx: number, ny: number): Promise<ForecastItem[]> {
  const baseTime = forecastType.getBaseTime();
  const baseDate = getBaseDate(baseTime);

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

    const items = response.data.response.body.items.item;
    return items;
  } catch (error) {
    console.error('Weather API 요청 실패:', error);
    throw error;
  }
}

function extractWeatherInfo(forecastType: ForecastType, items: ForecastItem[]) {
  const categories = forecastType.filterCategories;

  const weatherInfo: WeatherInfo = {};

  for (const category in categories) {
    const filteredItem = forecastType.filterForecast(items, category);
    const value = filteredItem?.fcstValue;

    const categoryInfo = forecastType.filterCategories[category];
    weatherInfo[categoryInfo.name] = value ? categoryInfo.func(value) : null;
  }
  return weatherInfo;
}

export async function getWeatherInfo(nx: number, ny: number) {
  const [hourlyForecasts, dailyForecasts] = await Promise.all([
    getWeatherForecasts(hourly, nx, ny),
    getWeatherForecasts(daily, nx, ny),
  ]);

  const weatherInfo = {
    ...extractWeatherInfo(hourly, hourlyForecasts),
    ...extractWeatherInfo(daily, dailyForecasts),
  };

  return weatherInfo;
}
