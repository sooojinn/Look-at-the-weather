import axios from 'axios';
import { BASEURL } from '@/constants/constants';
import useAuthService from '@/hooks/useAuthService';

const { getAccessToken, refreshTokens } = useAuthService();

const baseURL = BASEURL;

// 인스턴스 생성
export const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 오류 발생 시 처리
    if (error.response && error.response.status === 401) {
      // 토큰 갱신을 시도
      try {
        // 기존 요청의 토큰이 유효하지 않음
        await refreshTokens();

        // 토큰 갱신 후 원래 요청을 다시 시도
        const newToken = getAccessToken();
        if (newToken) {
          // 새로운 토큰으로 헤더를 업데이트
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

          // 원래 요청을 재시도
          return instance(originalRequest);
        }

        // 토큰 갱신 실패 시 로그인 페이지로 리디렉션
        window.location.replace('/');
      } catch (refreshError) {
        // 토큰 갱신 실패 처리
        console.error('Token refresh failed:', refreshError);
        window.location.replace('/');
      }
    }

    // 다른 오류는 그대로 반환
    return Promise.reject(error);
  },
);
