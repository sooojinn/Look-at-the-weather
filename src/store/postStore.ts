// store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // persist 가져오기

interface PostState {
  postId: number | null;
  setSelectedPostId: (id: number) => void;
}

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      postId: null,
      setSelectedPostId: (id) => set({ postId: id }),
    }),
    {
      name: 'post-storage', // localStorage에 저장될 키 이름
      partialize: (state) => ({ postId: state.postId }), // 필요한 부분만 저장
    },
  ),
);
