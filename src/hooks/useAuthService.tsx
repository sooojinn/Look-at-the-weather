import { BASEURL } from '@/constants/constants';
import useCookie from './useCookie';
import useCryoto from './useCryoto';
import axios from 'axios';
import { postReissue } from '@/api/apis';

export default function useAuthService() {
  let accessToken: string | null = null;

  const { setCookie, getCookie } = useCookie();
  // const { encodingData, decodingData } = useCryoto();

  const setRefreshToken = (token: string) => {
    // const encodedToken = encodingData(token);
    // setCookie('csrftoken', encodedToken);
    // setCookie('csrftoken', `Bearer ${token}`);
  };

  const getRefreshToken = () => {
    // const beforeDecodingToken = getCookie('csrftoken');
    // const afterDecodingToken = decodingData(beforeDecodingToken);
    const refreshToken = getCookie('csrftoken');
    //return afterDecodingToken;
    return refreshToken;
  };

  const setAccessToken = (token: string) => {
    // accessToken = `Bearer ${token}`;
    // setCookie('AccessToken', `Bearer ${token}`);
    localStorage.setItem('accesstoken', `Bearer ${token}`);
  };

  const getAccessToken = () => {
    // return accessToken;
    // return getCookie('AccessToken');
    return localStorage.getItem('accesstoken');
  };

  const isLogin = async () => {
    try {
      let token = getAccessToken();

      if (!token) {
        await refreshTokens();
        console.log('token?', token);
        token = getAccessToken();
      }

      return !!token; // boolean 값으로 반환
    } catch (error) {
      console.error('로그인 실패:', error);
      return false;
    }
  };

  const refreshTokens = async () => {
    try {
      const response = await postReissue({ refreshToken: getRefreshToken() }, { withCredentials: true });
      const { accessToken, refreshToken } = response.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } catch (error) {
      console.log(error);
    }
  };

  return { setRefreshToken, getRefreshToken, setAccessToken, getAccessToken, isLogin, refreshTokens };
}
