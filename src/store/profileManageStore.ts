import { create } from 'zustand';

interface ProfileManageState {
  name?: string;
  email?: string;
  password?: string;
  nickname?: string;
  userId?: number;
  setUserInfo: (userInfo: Partial<ProfileManageState>) => void;
  clearUserInfo: () => void; // clearUserInfo 함수 정의
}

const useProfileManageStore = create<ProfileManageState>((set) => ({
  name: undefined,
  email: undefined,
  password: undefined,
  nickname: undefined,
  userId: undefined,
  setUserInfo: (userInfo) => set(userInfo),
  clearUserInfo: () =>
    set({
      // clearUserInfo 함수 구현
      name: undefined,
      email: undefined,
      password: undefined,
      nickname: undefined,
      userId: undefined,
    }),
}));

export default useProfileManageStore;
