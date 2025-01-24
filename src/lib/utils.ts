import { GeoPoint } from '@/config/types';
import { DEFAULT_GEO_POINT } from '@/config/constants';
import { getLocationFromGeoPoint } from '@/api/apis';

// 소수점 넷째 자리까지 내림 처리하는 함수
function floorToFixed(num: number) {
  const factor = Math.pow(10, 4);
  return Math.floor(num * factor) / factor;
}

// geolocation api로 현재 위치의 위도와 경도를 구함
export async function fetchCurrentGeoPoint(): Promise<GeoPoint | undefined> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;

          latitude = floorToFixed(latitude);
          longitude = floorToFixed(longitude);

          resolve({ latitude, longitude });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            // 접근 거부 시 기본 좌표 반환
            resolve(DEFAULT_GEO_POINT);
          } else {
            // 다른 에러의 경우 undefined 반환
            reject(undefined);
            console.warn('위치 정보 패칭에 실패했습니다:', error.message);
          }
        },
      );
    } else {
      console.warn('Geolocation는 이 브라우저에서 지원되지 않습니다.');
      resolve(undefined);
    }
  });
}

export const fetchCurrentLocation = async () => {
  const currentGeoPoint = await fetchCurrentGeoPoint();

  if (!currentGeoPoint) return null;

  return getLocationFromGeoPoint(currentGeoPoint);
};

export function throttle(callback: () => void, delay: number) {
  let timeoutId: NodeJS.Timeout | null = null;
  return () => {
    if (timeoutId) return; // 이미 실행 중인 경우 무시
    timeoutId = setTimeout(() => {
      callback();
      timeoutId = null; // 실행 후 초기화
    }, delay);
  };
}

export function calHourlyWeatherStaleTime() {
  const now = new Date();
  const currentMinutes = now.getMinutes();

  // 현재 시간을 기준으로 다음 정각을 계산
  const nextRefetchTime = new Date(now);
  if (currentMinutes > 0) {
    // 다음 정각으로 설정 (현재 시간이 정각이 아니면 시간 +1)
    nextRefetchTime.setHours(nextRefetchTime.getHours() + 1);
  }
  nextRefetchTime.setMinutes(0, 0, 0); // 분, 초, 밀리초를 0으로 설정

  // 밀리초 단위로 차이 계산
  return nextRefetchTime.getTime() - now.getTime();
}

export function calDailyWeatherStaleTime() {
  const now = new Date();

  // 다음 2시 11분을 계산하기 위해 날짜 설정
  const nextTargetTime = new Date();
  nextTargetTime.setHours(2, 11, 0, 0); // 2시 11분 00초로 설정

  // 현재 시간이 2시 11분 이후인 경우 다음 날 2시 11분으로 설정
  if (now > nextTargetTime) {
    nextTargetTime.setDate(nextTargetTime.getDate() + 1);
  }

  // staleTime을 밀리초 단위로 계산
  const staleTime = nextTargetTime.getTime() - now.getTime();

  return staleTime;
}
