import { GeoPoint } from '@/config/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GeoLocationState {
  isLocationDenied: boolean;
  geoPoint: GeoPoint | null;
  setLocationDenied: (denied: boolean) => void;
  setGeoPoint: (geoPoint: GeoPoint | null) => void;
}

export const useGeoLocationStore = create<GeoLocationState>()(
  devtools(
    (set) => ({
      isLocationDenied: false,
      geoPoint: null,
      setLocationDenied: (denied: boolean) => set({ isLocationDenied: denied }),
      setGeoPoint: (geoPoint: GeoPoint | null) => {
        console.log('Setting geoPoint:', geoPoint); // 상태 변경 전에 로그 찍기
        set({ geoPoint });
      },
    }),
    { name: 'Location Store' },
  ),
);
