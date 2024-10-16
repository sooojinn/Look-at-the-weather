import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  isLogin: boolean;
  nickName: string | null;
  isSocial: boolean;
  setIsLogin: (isLogin: boolean) => void;
  setNickName: (newNickname: string | null) => void;
  setIsSocial: (isSocial: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLogin: false,
      nickName: null,
      isSocial: false,
      setIsLogin: (isLogin: boolean) => {
        set({ isLogin });
      },
      setNickName: (newNickname: string | null) => {
        set({ nickName: newNickname });
      },
      setIsSocial: (isSocial: boolean) => {
        set({ isSocial });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
