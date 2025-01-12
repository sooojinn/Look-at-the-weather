import { create } from 'zustand';
import { PostDetail } from '@/pages/PostDetail';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PostManageState {
  postId: number | null;
  postData: PostDetail | undefined;
  setPostData: (postData: Partial<PostManageState>) => void;
}

export const usePostManageStore = create(
  persist<PostManageState>(
    (set) => ({
      postId: null,
      postData: undefined,
      setPostData: (postData) => set(postData),
    }),
    {
      name: 'post-manage-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
