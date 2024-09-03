import axios from 'axios';
import { GeoPoint, Location } from '@/config/types';
import { BASEURL } from '@/config/constants';
import { useGeoPermissionStore } from '@/store/geoPermissionStore';

// toXY: 위도, 경도를 좌표로 변환
// toLL: 좌표를 위도, 경도로 변환
type ConversionCode = 'toXY' | 'toLL';

interface DfsResult {
  lat: number;
  lng: number;
  x: number;
  y: number;
}

// 서울시청의 위도와 경도
const defaultGeoPoint: GeoPoint = {
  latitude: 37.5663,
  longitude: 126.9779,
};

// 소수점 넷째 자리까지 내림 처리하는 함수
function floorToFixed(num: number) {
  const factor = Math.pow(10, 4);
  return Math.floor(num * factor) / factor;
}

// geolocation api로 현재 위치의 위도와 경도를 구함
export async function fetchGeoPoint(): Promise<GeoPoint> {
  console.log('geolocation api 실행');
  // 위치 정보 접근 허용 여부 확인
  const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
  const { setLocationDenied } = useGeoPermissionStore.getState();

  if (permissionStatus.state === 'denied') {
    console.warn('사용자가 위치 정보 접근을 거부했습니다.');
    setLocationDenied(true);
    return defaultGeoPoint;
  }

  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;

          latitude = floorToFixed(latitude);
          longitude = floorToFixed(longitude);

          resolve({ latitude, longitude });
        },
        (error) => {
          console.warn('위치 정보 패칭에 실패했습니다:', error.message);
          resolve(defaultGeoPoint); // 패칭에 실패하면 defaultGeoPoint 반환
        },
      );
    } else {
      console.warn('Geolocation는 이 브라우저에서 지원되지 않습니다.');
      resolve(defaultGeoPoint); // Geolocation을 지원하지 않으면 defaultGeoPoint 반환
    }
  });
}

// 위치 정보('OO시 OO구')를 반환하는 함수
export const fetchLocation = async (geoPoint: GeoPoint): Promise<Location | undefined> => {
  console.log(localStorage.getItem('accessToken'));
  try {
    const response = await axios.post(`${BASEURL}/location`, geoPoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      withCredentials: true,
    });

    return response.data.location;
  } catch (error) {
    console.error('location api 에러: ', error);
    throw error;
  }
};

// 위도와 경도를 단기예보 좌표로 변환
export function dfs_xy_conv(code: ConversionCode, v1: number, v2: number): DfsResult {
  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;

  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격(km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X좌표(GRID)
  const YO = 136; // 기준점 Y좌표(GRID)

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  const rs: DfsResult = { lat: 0, lng: 0, x: 0, y: 0 };

  if (code === 'toXY') {
    rs.lat = v1;
    rs.lng = v2;
    let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    let theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs.x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  } else {
    rs.x = v1;
    rs.y = v2;
    const xn = v1 - XO;
    const yn = ro - v2 + YO;
    let ra = Math.sqrt(xn * xn + yn * yn);
    if (sn < 0.0) ra = -ra;
    let alat = Math.pow((re * sf) / ra, 1.0 / sn);
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

    let theta = 0.0;
    if (Math.abs(xn) <= 0.0) {
      theta = 0.0;
    } else {
      if (Math.abs(yn) <= 0.0) {
        theta = Math.PI * 0.5;
        if (xn < 0.0) theta = -theta;
      } else theta = Math.atan2(xn, yn);
    }
    const alon = theta / sn + olon;
    rs.lat = alat * RADDEG;
    rs.lng = alon * RADDEG;
  }

  return rs;
}
