import axios, { AxiosRequestConfig } from 'axios';
import { BASEURL } from '@/constants/constants';
import useAuthService from '@/hooks/useAuthService';

// const { setRefreshToken, getRefreshToken } = useAuthService();

const baseURL = BASEURL;

// 인스턴스 생성
export const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
