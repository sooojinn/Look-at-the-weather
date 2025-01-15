import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface RouteManageState {
  isPostForm: boolean | undefined;
  setIsPostForm: (value: boolean | undefined) => void;
  resetIsPostForm: () => void;
}

export const useRouteManageStore = create<RouteManageState>()(
  devtools(
    (set) => ({
      isPostForm: undefined,
      setIsPostForm: (value: boolean | undefined) => {
        set({ isPostForm: value });
      },
      resetIsPostForm: () => {
        set({ isPostForm: undefined });
      },
    }),
    { name: 'Route Store' },
  ),
);
