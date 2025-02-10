import axios from 'axios';
import { reissue } from './apis';
import { useAuthStore } from '@/store/authStore';
import { showToast } from '@/components/provider/ToastProvider';
import { BASEURL } from '@/config/constants';
import { getQueryClient } from '@/lib/queryClient';

const { setIsLogin } = useAuthStore.getState();
const queryClient = getQueryClient();

let accessToken: null | string = null;

export const setAccessToken = (token: null | string) => {
  accessToken = token;
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    restoreTokenInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common['Authorization'];
    delete restoreTokenInstance.defaults.headers.common['Authorization'];
  }
};

export const instance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

export const reissueInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

export const restoreTokenInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

const REISSUE_REQUIRED_ERROR_CODES = ['ACCESS_TOKEN_EXPIRED', 'INVALID_CREDENTIALS'];
const SESSION_EXPIRED_ERRORS = ['REFRESH_TOKEN_EXPIRED', 'NOT_FOUND_COOKIE'];

// access token 만료 에러 처리 함수
const handleAccessTokenExpiredError = async (error: any) => {
  const { errorCode } = error.response.data;

  if (REISSUE_REQUIRED_ERROR_CODES.includes(errorCode)) {
    // accessToken 재발급 요청
    const response = await reissue();
    const { accessToken } = response;

    if (accessToken) {
      // 재발급 받은 토큰 저장 후 재요청
      setAccessToken(accessToken);
      error.config.headers['Authorization'] = `Bearer ${accessToken}`;
      setIsLogin(true);
      return instance(error.config);
    }
  }
  return Promise.reject(error);
};

// 새로고침 후 토큰 재발급 로직이 필요한 인스턴스
restoreTokenInstance.interceptors.request.use(
  async (config) => {
    const isLogin = useAuthStore.getState().isLogin;
    const isToken = !!accessToken;

    if (isLogin && !isToken) {
      const response = await reissue();
      const { accessToken } = response;
      if (accessToken) {
        setAccessToken(accessToken);
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use((response) => response, handleAccessTokenExpiredError);
restoreTokenInstance.interceptors.response.use((response) => response, handleAccessTokenExpiredError);

// 리이슈 요청 에러 처리
reissueInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { errorCode } = error.response.data;

    if (SESSION_EXPIRED_ERRORS.includes(errorCode)) {
      setIsLogin(false);
      showToast('세션 정보가 만료되었습니다. 다시 로그인 해주세요.');
      queryClient.removeQueries({ queryKey: ['post'] });
    }

    return Promise.reject(error);
  },
);
