import { GeoPoint } from '@/config/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GeoLocationState {
  isLocationAllowed: boolean;
  customGeoPoint: GeoPoint | null;
  setLocationAllowed: (isAllowed: boolean) => void;
  setCustomGeoPoint: (customGeoPoint: GeoPoint | null) => void;
}

export const useGeoLocationStore = create<GeoLocationState>()(
  devtools(
    (set) => ({
      isLocationAllowed: false,
      customGeoPoint: null,
      setLocationAllowed: (isAllowed: boolean) => set({ isLocationAllowed: isAllowed }),
      setCustomGeoPoint: (customGeoPoint: GeoPoint | null) => {
        console.log('Setting geoPoint:', customGeoPoint); // 상태 변경 전에 로그 찍기
        set({ customGeoPoint });
      },
    }),
    { name: 'Location Store' },
  ),
);
