import { create } from 'zustand';

interface ProfileManageState {
  name?: string;
  email?: string;
  password?: string;
  nickname?: string;
  setUserInfo: (userInfo: Partial<ProfileManageState>) => void;
}

const useProfileManageStore = create<ProfileManageState>((set) => ({
  name: undefined,
  email: undefined,
  password: undefined,
  nickname: undefined,
  setUserInfo: (userInfo) => set(userInfo),
}));

export default useProfileManageStore;
