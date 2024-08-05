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
