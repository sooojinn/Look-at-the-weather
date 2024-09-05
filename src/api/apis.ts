import { instance } from './instance';
import useAuthService from '@/hooks/useAuthService';
import { AxiosRequestConfig } from 'axios';

const { getAccessToken, getRefreshToken } = useAuthService();

const headers: AxiosRequestConfig['headers'] = { Authorization: getAccessToken() };
const config: AxiosRequestConfig = {
  headers,
};
type RequestBody = Record<string, any>;
type RequestHeader = Record<string, any>;

export const postLogin = (request: RequestBody) => {
  return instance.post('/auth/login', request);
};
export const postLogout = () => {
  return instance.post('/auth/logout', null, config);
};

export const postFindEmail = (request: RequestBody) => {
  return instance.post('/auth/logout', request);
};

export const postReissue = (request: RequestBody, addConfig: RequestHeader) => {
  return instance.post('/auth/reissue', request, addConfig);
};

export const getUserInfos = () => {
  return instance.get('/users/me', config);
};

export const patchEditProfile = (request: RequestBody) => {
  return instance.patch('/users/me', request, config);
};
