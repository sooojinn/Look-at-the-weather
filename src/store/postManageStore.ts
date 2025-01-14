import { create } from 'zustand';
import { PostDetail } from '@/pages/PostDetail';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PostManageState {
  postId: number;
  postData: PostDetail | undefined;
  replace: boolean;
  setReplace: (replace: boolean | null) => void;
  setPostData: (postData: Partial<PostManageState>) => void;
}

export const usePostManageStore = create(
  persist<PostManageState>(
    (set) => ({
      postId: 0,
      postData: undefined,
      replace: false,
      setReplace: (replace) => {
        if (replace === null) {
          set({ replace: false });
        } else {
          set({ replace });
        }
      },
      setPostData: (postData) => set(postData),
    }),
    {
      name: 'post-manage-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
