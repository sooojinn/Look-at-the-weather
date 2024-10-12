import axios, { AxiosInstance } from 'axios';
import { BASEURL } from '@/constants/constants';
import { reissue } from './apis';
import { useAuthStore } from '@/store/authStore';
import { showToast } from '@components/common/molecules/ToastProvider';

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
    'Content-Type': 'application/json',
    Authorization: getAccessToken(),
  },
});

let reissueAttemptCount = 0;

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log('Interceptor caught an error:', error);

    console.log(reissueAttemptCount);

    if (error.response) {
      if (error.response.status === 401 && reissueAttemptCount < 3) {
        reissueAttemptCount++;
        try {
          for (let i = 1; i <= 3; i++) {
            const response = await reissue();
            if (response.data.accessToken) {
              setAccessToken(response.data.accessToken);
              error.config.headers['Authorization'] = getAccessToken();
              setIsLogin(true);
              return instance(error.config);
            } else {
              console.log(`${i}번째 토큰 재요청 실패`);
              setTimeout(() => {}, 500);
            }
          }
        } catch (reissueError) {
          console.log('Token reissue failed:', reissueError);
          setIsLogin(false);
          showToast('세션 정보가 만료되었습니다. 재로그인 해주세요.');
          window.location.href = '/';
        }
      }
    } else if (error.request) {
      console.log('No response received:', error.request);
    } else {
      reissueAttemptCount = 0;
      console.log('Error setting up request:', error.message);
    }

    return Promise.reject(error);
  },
);

export { setAccessToken, getAccessToken };
