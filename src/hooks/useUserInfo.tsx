import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { BASEURL } from '@/constants/constants';

type UserInfo = {
  email: string;
  name: string;
  nickname: string;
};

export default function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    name: '',
    nickname: '',
  });

  const getUserInfo = async () => {
    try {
      const response: AxiosResponse<{ user: UserInfo }> = await axios.get(`${BASEURL}/api/v1/auth/users/me`, {
        headers: {
          Authorization: `12345`,
        },
      });
      setUserInfo(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return userInfo;
}
