import { useAuthStore } from '@/store/authStore';
import { getUserInfos } from '@/api/apis';

export const useFetchAndSetNickname = () => {
  const setNickName = useAuthStore((state) => state.setNickName);

  const fetchAndSetNickname = async () => {
    try {
      const userInfo = await getUserInfos();
      setNickName(userInfo.nickname);
    } catch {
      setNickName('');
    }
  };

  return fetchAndSetNickname;
};
