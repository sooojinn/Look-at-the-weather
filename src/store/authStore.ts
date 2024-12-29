import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  isLogin: boolean;
  nickName: string | null;
  setIsLogin: (isLogin: boolean) => void;
  setNickName: (newNickname: string | null) => void;
  authStoreClear: () => void; // 초기화 함수 추가
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLogin: false,
      nickName: null,
      setIsLogin: (isLogin: boolean) => {
        set((state) => ({
          isLogin,
          nickName: isLogin ? state.nickName : null,
        }));
      },
      setNickName: (newNickname: string | null) => {
        set({ nickName: newNickname });
      },
      authStoreClear: () => {
        set({
          isLogin: false,
          nickName: null,
        });
        sessionStorage.removeItem('auth-storage'); // sessionStorage 데이터 제거
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
