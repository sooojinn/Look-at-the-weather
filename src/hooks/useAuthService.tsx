export default function useAuthService() {
  // let accessToken: string | null = null;

  const setAccessToken = (token: string) => {
    localStorage.setItem('accesstoken', `Bearer ${token}`);
  };

  const getAccessToken = () => {
    // return accessToken;
    return localStorage.getItem('accesstoken');
  };

  const isLogin = async () => {
    try {
      let token = getAccessToken();

      if (!token) {
        // await refreshTokens();
        console.log('token?', token);
        token = getAccessToken();
      }

      return !!token; // boolean 값으로 반환
    } catch (error) {
      console.error('로그인 실패:', error);
      return false;
    }
  };

  // const refreshTokens = async () => {
  //   try {
  //     const response = await postReissue({ refreshToken: getRefreshToken() }, { withCredentials: true });
  //     const { accessToken, refreshToken } = response.data;
  //     setAccessToken(accessToken);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return { setAccessToken, getAccessToken, isLogin };
}
