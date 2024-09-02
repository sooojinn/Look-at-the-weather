import {
  Control,
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface WeatherInfo {
  [key: string]: any;
}

export interface Location {
  city: string;
  district: string;
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

export interface FilterItem {
  id: number | { city: number; district: number };
  tagName: string;
}

export type PostFilterModalProps = {
  isOpen: React.Dispatch<React.SetStateAction<boolean>>;
  btnValue: string;
  btnIndex: number;
};

export type SectionKey = 'location' | 'weather' | 'temperature' | 'season';

export interface VerifyCodeProps {
  email: string;
  code: string;
}

export interface SignupForm {
  email: string;
  code: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  terms: boolean;
}

export type DistrictArray = DistrictProps[];
