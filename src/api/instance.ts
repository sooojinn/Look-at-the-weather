import { BASEURL } from '@/constants/constants';
import axios from 'axios';
import useAuthService from '@/hooks/useAuthService';

const { setAccessToken, getAccessToken } = useAuthService();

const accessToken = getAccessToken();
const baseURL = BASEURL;

// 인스턴스 생성
export const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
axios.interceptors.request.use();

// axios.interceptors.request.use(
//   function (config) {
//     if (!accessToken) {
//       const response = axios.post(`${BASEURL}/auth/reissue`);
//       console.log('res', response);
//       setAccessToken(response);
//     }
//     return config;
//   },
//   function (error) {
//     // 2. 요청 에러가 있는 작업 처리
//     return Promise.reject(error);
//   },
// );

instance.interceptors.response.use();
