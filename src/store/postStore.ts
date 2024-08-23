import { create } from 'zustand';

interface PostState {
  location: { city: number; district: number }[];
  seasonTagIds: number[];
  weatherTagIds: number[];
  temperatureTagIds: number[];
  updateLocation: (newLocation: { city: number; district: number }[]) => void;
  updateSeasonTagIds: (newSeasonTagIds: number[]) => void;
  updateWeatherTagIds: (newWeatherTagIds: number[]) => void;
  updateTemperatureTagIds: (newTemperatureTagIds: number[]) => void;
}

export const usePostStore = create<PostState>((set) => ({
  location: [],
  seasonTagIds: [],
  weatherTagIds: [],
  temperatureTagIds: [],
  updateLocation: (newLocation) => set({ location: newLocation }),
  updateSeasonTagIds: (newSeasonTagIds) => set({ seasonTagIds: newSeasonTagIds }),
  updateWeatherTagIds: (newWeatherTagIds) => set({ weatherTagIds: newWeatherTagIds }),
  updateTemperatureTagIds: (newTemperatureTagIds) => set({ temperatureTagIds: newTemperatureTagIds }),
}));
