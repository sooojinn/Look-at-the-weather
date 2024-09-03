import axios, { AxiosRequestConfig } from 'axios';
import { BASEURL } from '@/constants/constants';
import useAuthService from '@/hooks/useAuthService';

const { setRefreshToken, getRefreshToken, deleteRefreshToken } = useAuthService();

const baseURL = BASEURL;

// 인스턴스 생성
export const instance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshTokenRotation = () => {
  let accessToken: string = null;
  let expirationTime: number = null;

  const setAccessToken = (at: string, et: number) => {
    accessToken = at;
    expirationTime = et;
  };

  const deleteTokens = () => {
    accessToken = null;
    expirationTime = null;
    deleteRefreshToken();
  };

  const moveHome = () => {
    window.location.href = '/';
  };

  const isExpired = () => {
    const now = new Date().getTime();
    return expirationTime < now;
  };

  const getNewTokens = async function () {
    const refreshToken = getRefreshToken();
    await axios
      .post('/api/reissue', {
        refreshToken,
      })
      .then((res) => {
        const {
          data: { accessToken, expirationTime, refreshToken },
        } = res;
        setAccessToken(accessToken, expirationTime);
        setRefreshToken(refreshToken);
      })
      .catch(() => {
        deleteTokens();
        alert('로그인이 만료되었습니다.');
        moveHome();
      });
  };

  return {
    setAuthHeader: async function (config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
      if (!accessToken || isExpired()) {
        await getNewTokens();
      }

      config.headers.Authorization = `Bearer ${accessToken}`;

      return config;
    },
  };
};

const { setAuthHeader } = refreshTokenRotation();

instance.interceptors.request.use(setAuthHeader);
