import { create } from 'zustand';

interface GeoPermissionState {
  isLocationDenied: boolean;
  setLocationDenied: (denied: boolean) => void;
}

export const useGeoPermissionStore = create<GeoPermissionState>((set) => ({
  isLocationDenied: false,
  setLocationDenied: (denied: boolean) => set({ isLocationDenied: denied }),
}));
