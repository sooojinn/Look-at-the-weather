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
  | 'error'
  | 'success';
export type TextWeight = 'regular' | 'bold';

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
