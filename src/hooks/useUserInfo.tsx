import useCookie from './useCookie';
import useCryoto from './useCryoto';

export default function useUserInfo() {
  const { encodingData, decodingData } = useCryoto();
  const { setCookie, getCookie } = useCookie();

  const setUserInfo = (info: string, data: string) => {
    const encodedValue = encodingData(data);

    setCookie(info, encodedValue);
  };

  const getUserInfo = (info: string) => {
    const userInfo = getCookie(info);
    const decodingUserInfo = decodingData(userInfo);
    return decodingUserInfo;
  };

  return { setUserInfo, getUserInfo };
}
