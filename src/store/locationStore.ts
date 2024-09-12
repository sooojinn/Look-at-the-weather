import { GeoPoint } from '@/config/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface GeoLocationState {
  customGeoPoint: GeoPoint | null;
  setCustomGeoPoint: (customGeoPoint: GeoPoint | null) => void;
}

export const useGeoLocationStore = create<GeoLocationState>()(
  devtools(
    (set) => ({
      customGeoPoint: null,
      setCustomGeoPoint: (customGeoPoint: GeoPoint | null) => set({ customGeoPoint }),
    }),
    { name: 'Location Store' },
  ),
);
