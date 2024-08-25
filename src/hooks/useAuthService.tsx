import { BASEURL } from '@/constants/constants';
import useCookie from './useCookie';
import axios from 'axios';

export default function useAuthService() {
  let accessToken: string | null = null;

  const { setCookie, getCookie } = useCookie();

  function bytesToBase64(bytes: Uint8Array): string {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
  }

  function base64ToBytes(base64: string): Uint8Array {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0) as number);
  }

  const encodingData = (bytes: string): string => {
    const validUTF16StringEncoded = bytesToBase64(new TextEncoder().encode(bytes));
    return validUTF16StringEncoded;
  };

  const decodingData = (base64: string): string => {
    const validUTF16StringDecoded = new TextDecoder().decode(base64ToBytes(base64));
    return validUTF16StringDecoded;
  };

  const setRefreshToken = (token: string) => {
    const encodedToken = encodingData(token);
    setCookie('csrftoken', encodedToken);
  };

  const getRefreshToken = () => {
    const beforeDecodingToken = getCookie('csrftoken');
    const afterDecodingToken = decodingData(beforeDecodingToken);
    return afterDecodingToken;
  };

  const setAccessToken = (token: string) => {
    accessToken = token;
  };

  const getAccessToken = () => {
    return accessToken;
  };

  const isLogin = () => {};

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${BASEURL}/auth/refresh`,
        {
          refreshToken: getRefreshToken(),
        },
        {
          withCredentials: true,
        },
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return { setRefreshToken, getRefreshToken, setAccessToken, getAccessToken, isLogin, refreshAccessToken };
}
