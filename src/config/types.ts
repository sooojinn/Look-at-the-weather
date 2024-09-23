import { Control, RegisterOptions, UseFormRegister, UseFormSetValue } from 'react-hook-form';

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
  seasonTag: string;
  weatherTags: string[];
  temperatureTags: string[];
  likeByUser: boolean;
  reportPost?: boolean;
}

export type TextSize = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl';
export type TextColor =
  | 'black'
  | 'lightBlack'
  | 'darkGray'
  | 'gray'
  | 'lightGray'
  | 'white'
  | 'main'
  | 'disabled'
  | 'blue'
  | 'error'
  | 'success';
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

export interface DistrictProps {
  city_id: number;
  district_id: number;
  district: string;
}

export type DistrictArray = DistrictProps[];

export type DistrictType = {
  districtId: number;
  districtName: string;
  cityName: string;
  cityId: number;
};

export interface CityType {
  cityId: number;
  cityName: string;
  district: DistrictType[];
}

export interface PostFormData {
  title: string;
  content: string;
  city: string;
  district: string;
  weatherTagIds: number[];
  temperatureTagIds: number[];
  seasonTagId: number | null;
  imageIds: number[];
}

export interface Tag {
  id: number;
  category: string;
  value: string;
  name: string;
}
export interface SelectProps {
  name: keyof PostFormData;
  options: Tag[];
  maxSelection?: number;
  control: Control<any>;
  rules?: RegisterOptions; // 유효성 검사 규칙
}

export interface ImageItem {
  id?: number;
  url: string;
  tempId?: string;
}

export interface Tag {
  id: number;
  category: string;
  value: string;
  name: string;
}
export interface SelectProps {
  name: keyof PostFormData;
  options: Tag[];
  maxSelection?: number;
  control: Control<any>;
  rules?: RegisterOptions; // 유효성 검사 규칙
}

export interface FileProps {
  name: keyof PostFormData;
  rules?: RegisterOptions<PostFormData, keyof PostFormData>;
  setValue: UseFormSetValue<PostFormData>;
  register: UseFormRegister<PostFormData>;
  defaultImages?: ImageItem[];
}

export interface ErrorResponse {
  errorCode?: string;
  errorMessage?: string;
}

export type AuthFormName = 'email' | 'code' | 'password' | 'confirmPassword' | 'name' | 'nickname';

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

export interface RegisterForm {
  email: string;
  password: string;
  name: string;
  nickname: string;
  isSocial: boolean;
}

export interface PostFilterState {
  location: { city: number; district: number }[];
  seasonTagIds: number[];
  temperatureTagIds: number[];
  weatherTagIds: number[];
}
