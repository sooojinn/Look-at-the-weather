import { instance } from './instance';
import useAuthService from '@/hooks/useAuthService';
import { AxiosRequestConfig } from 'axios';

const { getAccessToken, getRefreshToken } = useAuthService();

const headers: AxiosRequestConfig['headers'] = { Authorization: `Bearer ${getAccessToken()}` };
const config: AxiosRequestConfig = {
  headers,
};
type RequestBody = Record<string, any>;

export const postLogin = (request: RequestBody) => {
  return instance.post('/auth/login', request, config);
};
export const postLogout = () => {
  return instance.post('/auth/logout', null, config);
};

export const postFindEmail = (request: RequestBody) => {
  return instance.post('/auth/logout', request);
};

// export const postRetryRefresh = () => {
//   return instance.post('/auth/refresh', { refreshToken: getRefreshToken() }, { withCredentials: true });
// };
