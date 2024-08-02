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
