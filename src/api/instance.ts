import axios, { AxiosInstance } from 'axios';
import { reissue } from './apis';
import { useAuthStore } from '@/store/authStore';
import { showToast } from '@components/common/molecules/ToastProvider';
import { BASEURL } from '@/config/constants';

const { setIsLogin } = useAuthStore.getState();

let accessToken: null | string = null;

const setAccessToken = (token: null | string) => {
  accessToken = `Bearer ${token}`;
  instance.defaults.headers.common['Authorization'] = accessToken;
};

const getAccessToken = () => {
  return accessToken;
};

export const instance: AxiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
  headers: {
    Authorization: getAccessToken(),
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('Interceptor caught an error:', error);

    if (error.response) {
      // accessToken이 만료됐거나 새로고침으로 accessToken이 존재하지 않을 때
      if (
        error.response.data.errorCode === 'ACCESS_TOKEN_EXPIRED' ||
        error.response.data.errorCode === 'INVALID_CREDENTIALS'
      ) {
        try {
          // accessToken 재발급 요청
          const response = await reissue();
          if (response.data.accessToken) {
            setAccessToken(response.data.accessToken);
            error.config.headers['Authorization'] = getAccessToken();
            setIsLogin(true);
            return instance(error.config);
          }
        } catch (reissueError) {
          console.log('리이슈 요청 에러 발생:', reissueError);
          if (axios.isAxiosError(reissueError) && reissueError.response?.data) {
            // refreshToken이 만료되었거나 인증 쿠키가 존재하지 않을 경우
            if (
              reissueError.response.data.errorCode === 'REFRESH_TOKEN_EXPIRED' ||
              reissueError.response.data.errorCode === 'NOT_FOUND_COOKIE'
            ) {
              showToast('세션 정보가 만료되었습니다. 다시 로그인 해주세요.');
            }
          } else {
            console.log('알 수 없는 에러 발생:', reissueError);
            showToast('알 수 없는 에러가 발생했습니다.');
          }
          setIsLogin(false);
        }
      }
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      console.log('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  },
);

export { setAccessToken, getAccessToken };
