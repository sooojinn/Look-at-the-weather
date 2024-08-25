export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface WeatherInfo {
  [key: string]: any;
}

export interface Location {
  city: string | null;
  district: string | null;
}

export interface PostMeta {
  postId: number;
  thumbnail: string;
  location: Location;
  SeasonTagId: number;
  WeatherTagIds: number[];
  TemperatureTagIds: number[];
  likeByUser: boolean;
}

export type TextSize = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl';
export type TextColor = 'black' | 'lightBlack' | 'darkGray' | 'gray' | 'lightGray' | 'white' | 'blue';
export type TextWeight = 'regular' | 'bold';
export type TextMargin = string;

export type HrLineHeight = { height: 1 | 8 };

export type FilterBtn = {
  id?: string;
  onClickFunc: (btnValue: string) => void;
  isActive?: boolean | (() => boolean);
  isSelected?: boolean;
};
export type FilterBtnGroupProps = FilterBtn & {
  btnData: any[];
};
