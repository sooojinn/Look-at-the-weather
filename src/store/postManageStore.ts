import { PostDetailType } from '@/config/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface PostManageState {
  postData: PostDetailType | undefined;
  setPostData: (postData: Partial<PostManageState>) => void;
}

export const usePostManageStore = create(
  persist<PostManageState>(
    (set) => ({
      postData: undefined,
      setPostData: (postData) => set(postData),
    }),
    {
      name: 'post-manage-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
