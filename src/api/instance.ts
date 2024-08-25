import axios from 'axios';
import { BASEURL } from '@/constants/constants';
import useAuthService from '@/hooks/useAuthService';

const { getAccessToken, refreshAccessToken } = useAuthService();

const baseURL = BASEURL;

// 인스턴스 생성
export const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(
  async (config) => {
    if (!getAccessToken()) {
      try {
        await refreshAccessToken();
      } catch (error) {
        return Promise.reject(error);
      }
    }
    config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        // 401의 경우 로그인 모달로 redirect
        await refreshAccessToken();
        return axios(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    if (error.response.status === 404) {
      // 404 not found 페이지로 이동
    }
    return Promise.reject(error);
  },
);
