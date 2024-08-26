import create from 'zustand';
import { persist } from 'zustand/middleware';
import { FilterItem } from '@/config/types';

interface PostState {
  locationIds: { city_id: number; district: string; district_id: number }[];
  seasonTagIds: FilterItem[];
  weatherTagIds: FilterItem[];
  temperatureTagIds: FilterItem[];
  updateLocation: (newLocation: { city_id: number; district: string; district_id: number }[]) => void;
  updateSeasonTagIds: (newSeasonTagIds: FilterItem[]) => void;
  updateWeatherTagIds: (newWeatherTagIds: FilterItem[]) => void;
  updateTemperatureTagIds: (newTemperatureTagIds: FilterItem[]) => void;
}

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      locationIds: [],
      seasonTagIds: [],
      weatherTagIds: [],
      temperatureTagIds: [],
      updateLocation: (newLocation) => set({ locationIds: newLocation }),
      updateSeasonTagIds: (newSeasonTagIds) => set({ seasonTagIds: newSeasonTagIds }),
      updateWeatherTagIds: (newWeatherTagIds) => set({ weatherTagIds: newWeatherTagIds }),
      updateTemperatureTagIds: (newTemperatureTagIds) => set({ temperatureTagIds: newTemperatureTagIds }),
    }),
    {
      name: 'post-store',
      getStorage: () => localStorage,
    },
  ),
);
