import { GeoPoint } from '@/config/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GeoLocationState {
  isLocationDenied: boolean;
  customGeoPoint: GeoPoint | null;
  setLocationDenied: (denied: boolean) => void;
  setCustomGeoPoint: (customGeoPoint: GeoPoint | null) => void;
}

export const useGeoLocationStore = create<GeoLocationState>()(
  devtools(
    (set) => ({
      isLocationDenied: false,
      customGeoPoint: null,
      setLocationDenied: (denied: boolean) => set({ isLocationDenied: denied }),
      setCustomGeoPoint: (customGeoPoint: GeoPoint | null) => {
        console.log('Setting geoPoint:', customGeoPoint); // 상태 변경 전에 로그 찍기
        set({ customGeoPoint });
      },
    }),
    { name: 'Location Store' },
  ),
);
