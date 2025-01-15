import { GeoPoint, Location } from '@/config/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GeoLocationState {
  customGeoPoint: GeoPoint | null;
  postFormLocation: Location | null;
  isPostForm: boolean | undefined;
  setIsPostForm: (isPostForm: boolean | undefined) => void;
  setCustomGeoPoint: (customGeoPoint: GeoPoint | null) => void;
  setPostFormLocation: (postFormLocation: Location | null) => void;
  resetIsPostForm: () => void;
}

export const useGeoLocationStore = create<GeoLocationState>()(
  devtools(
    (set) => ({
      customGeoPoint: null,
      postFormLocation: null,
      isPostForm: undefined,
      setIsPostForm: (isPostForm) => set({ isPostForm }),
      setCustomGeoPoint: (customGeoPoint) => set({ customGeoPoint }),
      setPostFormLocation: (postFormLocation) => set({ postFormLocation }),
      resetIsPostForm: () => set({ isPostForm: undefined }),
    }),
    { name: 'Location Store' },
  ),
);
