import axios from 'axios';
import { reissue } from './apis';
import { useAuthStore } from '@/store/authStore';
import { showToast } from '@/components/provider/ToastProvider';
import { getQueryClient } from '@/lib/queryClient';

const { setIsLogin } = useAuthStore.getState();
const queryClient = getQueryClient();

export const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const reissueInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

const REISSUE_REQUIRED_ERROR_CODES = ['ACCESS_TOKEN_EXPIRED', 'INVALID_CREDENTIALS'];
const SESSION_EXPIRED_ERRORS = ['REFRESH_TOKEN_EXPIRED', 'NOT_FOUND_COOKIE', 'REFRESH_TOKEN_INVALID'];

// access token 만료 에러 처리 함수
const handleAccessTokenExpiredError = async (error: any) => {
  const { errorCode } = error.response.data;

  if (REISSUE_REQUIRED_ERROR_CODES.includes(errorCode)) {
    // accessToken 재발급 요청
    const response = await reissue();
    const { status } = response;

    if (status === 200) {
      setIsLogin(true);
      return instance(error.config);
    }
  }
  return Promise.reject(error);
};

instance.interceptors.response.use((response) => response, handleAccessTokenExpiredError);

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
