import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  isLogin: boolean;
  nickName: string | null;
  setIsLogin: (isLogin: boolean) => void;
  setNickName: (newNickname: string | null) => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLogin: false,
      nickName: null,
      setIsLogin: (isLogin: boolean) => {
        set({ isLogin });
      },
      setNickName: (newNickname: string | null) => {
        set({ nickName: newNickname });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
