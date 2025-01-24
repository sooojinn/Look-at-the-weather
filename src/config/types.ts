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
  gender: string;
  seasonTag: string;
  weatherTags: string[];
  temperatureTags: string[];
  likeByUser: boolean;
  reportPost?: boolean;
}

export interface PostDetail extends PostMeta {
  nickname: string;
  date: string;
  title: string;
  content: string;
  temperature: string;
  images: {
    image: {
      imageId: number;
      url: string;
    }[];
  };
  likedCount: number;
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
  | 'error'
  | 'success';
export type TextWeight = 'regular' | 'medium' | 'bold';

export interface ImageItem {
  imageId: number;
  url: string;
  fileName?: string;
}

export interface PostFormData {
  title: string;
  content: string;
  city: string;
  district: string;
  temperature: string | number; // 수정: 문자열 허용
  gender: string | null;
  weatherTagIds: (string | number | null)[];
  temperatureTagIds: (string | number | null)[];
  seasonTagId: string | number | null;
  imageIds: number[];
  images: { imageId: number; url: string }[];
}

export interface Tag {
  id: number | string;
  category: string;
  name: string;
}

export interface SelectProps {
  name: keyof PostFormData;
  options: Tag[];
  maxSelection?: number;
  rules?: RegisterOptions<PostFormData, keyof PostFormData>;
}

export interface FileProps {
  name: keyof PostFormData;
  rules?: RegisterOptions<PostFormData, keyof PostFormData>;
  defaultImageIds: number[];
}

export interface ErrorResponse {
  errorCode?: string;
  errorMessage?: string;
}

export interface VerifyCodeProps {
  email: string;
  code: string;
}

export interface FormMethods<T extends FieldValues> {
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  trigger: UseFormTrigger<T>;
  getValues: UseFormGetValues<T>;
  watch: UseFormWatch<T>;
  control: Control<T>;
  formState: { errors: FieldErrors<T> };
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

export type DistrictType = {
  districtId: number;
  districtName: string;
  cityName: string;
  cityId: number;
};

export type FilterItemId = number | string | { city: number; district: number };

export interface FilterItem {
  id: FilterItemId;
  tagName: string;
}

export type FilterBtn = {
  id?: string;
  onClickFunc: () => void;
  isActive?: boolean | (() => boolean);
  isSelected?: boolean;
};

export type PostFilterModalProps = {
  isOpen: React.Dispatch<React.SetStateAction<boolean>>;
  btnValue: string;
  btnIndex: number;
};
export type SectionKey = 'location' | 'weather' | 'temperature' | 'season';

export interface CityType {
  cityId: number;
  cityName: string;
  district: DistrictType[];
}

export interface HrLineHeight {
  height: number;
}

export interface GuideProps {
  Icon: React.FC;
  title: string;
  upperDesc: string;
  lowerDesc: string;
}

export interface GuideContent {
  page: number;
  title: React.ReactNode;
  desc: React.ReactNode;
  src: string;
}

export interface AddressItem extends GeoPoint {
  address_name: string;
  cityName: string;
  districtName: string;
}

export interface PreloadImageProps {
  url: string;
  onLoad?: () => void;
  onError?: () => void;
}

export interface FindEmailForm {
  name: string;
  nickname: string;
}

export interface FindPasswordForm extends FindEmailForm {
  email: string;
}
