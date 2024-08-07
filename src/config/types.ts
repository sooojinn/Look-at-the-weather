import { Control, RegisterOptions } from 'react-hook-form';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface WeatherInfo {
  [key: string]: any;
}

export interface PostMeta {
  postId: number;
  thumbnail: string;
  location: string;
  SeasonTag: string;
  WeatherTag: string[];
  TempTag: string[];
  likeByUser: boolean;
}

export type TextSize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export type TextColor = 'black' | 'lightBlack' | 'darkGray' | 'gray' | 'lightGray' | 'white';
export type TextWeight = 'nomal' | 'bold';

export interface Location {
  city: string;
  district: string;
}

export interface PostFormData {
  title: string;
  content: string;
  location: Location;
  weatherTagIds: number[];
  temperatureTagIds: number[];
  seasonTagId: number | null;
}

export interface Option {
  key: number;
  name: string;
}
export interface SelectProps {
  name: string;
  options: Option[];
  maxSelection?: number;
  control: Control<any>;
  rules?: RegisterOptions; // 유효성 검사 규칙
}
