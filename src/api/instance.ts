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

// axios.interceptors.request.use(
//   async (config) => {
//     if (!getAccessToken()) {
//       try {
//         await refreshAccessToken();
//       } catch (error) {}
//     }
//     config.headers['Authorization'] = `Bearer ${getAccessToken()}`;
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// const MAX_RETRY_ATTEMPTS = 3;

// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     console.log(originalRequest);
//     if (error.response.status === 401 && !originalRequest._retry && originalRequest._retryCount < MAX_RETRY_ATTEMPTS) {
//       originalRequest._retry = true;
//       originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
//       try {
//         const newToken = await refreshAccessToken();
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         return axios(originalRequest);
//       } catch (refreshError) {
//         window.location.href = '/post';
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   },
// );
