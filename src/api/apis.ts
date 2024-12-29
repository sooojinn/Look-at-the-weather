import { GeoPoint, PostFormData, RegisterForm, VerifyCodeProps } from '@/config/types';
import { instance } from './instance';
import { AxiosRequestConfig } from 'axios';
import { AxiosResponse } from 'axios';

interface ConfigOptions {
  contentType?: string;
  withCredentials?: boolean;
}

const getConfig = ({
  contentType = 'application/json',
  withCredentials = false,
}: ConfigOptions = {}): AxiosRequestConfig => {
  return {
    headers: {
      'Content-Type': contentType,
    },
    withCredentials,
  };
};

type RequestBody = Record<string, any>;

export const sendVerificationCode = async (email: string) => {
  const response = await instance.post(`/email/send-verification`, { email }, getConfig());
  return response.data;
};

export const verifyCode = async ({ email, code }: VerifyCodeProps) => {
  const response = await instance.post(`/email/verify-code`, { email, code }, getConfig());
  return response.data;
};

export const checkNickname = async (nickname: string) => {
  const response = await instance.get(`/users/nickname-check/${nickname}`, getConfig());
  return response.data;
};

export const registerUser = async (data: RegisterForm) => {
  const response = await instance.post(`/users/register`, data, getConfig());
  return response.data;
};

export const postLogin = async (request: RequestBody) => {
  const response = await instance.post('/auth/login', request, getConfig({ withCredentials: true }));
  return response.data;
};

export const postLogout = async () => {
  const response = await instance.post('/auth/logout', null, getConfig());
  return response.data;
};

export const postFindEmail = async (request: RequestBody) => {
  const response = await instance.post('/users/email', request, getConfig());
  return response.data;
};

export const postFindPassword = async (request: RequestBody) => {
  const response = await instance.post('/users/password', request, getConfig());
  return response.data;
};

export const patchPasswordReset = async (request: RequestBody) => {
  const response = await instance.patch('/users/password', request, getConfig());
  return response.data;
};

export const getUserInfos = async () => {
  const response = await instance.get('/users/me', getConfig());
  return response.data;
};

export const getKakaoUserInfos = async (code: string | null) => {
  const response = await instance.get(`/oauth/kakao?code=${code}`, getConfig());
  return response.data;
};

export const patchEditProfile = async (request: RequestBody) => {
  const response = await instance.patch('/users/me', request, getConfig());
  return response.data;
};

export const getMyPosts = async ({ page, size }: RequestBody) => {
  const response = await instance.get(`/posts/me?page=${page}&size=${size}`, getConfig());
  return response.data;
};

export const getMyLikedPosts = async ({ page, size }: RequestBody) => {
  const response = await instance.get(`/likes/posts?page=${page}&size=${size}`, getConfig());
  return response.data;
};

export const getPostDetail = async (postId: number) => {
  const response = await instance.get(`/posts/${postId}`, getConfig());
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await instance.delete(`/posts/${postId}`, getConfig());
  return response.data;
};

export const fetchTopLikedPosts = async () => {
  const response = await instance.get('/posts/top-liked', getConfig());
  return response.data;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await instance.post(`/s3/post-image`, formData, getConfig({ contentType: 'multipart/form-data' }));
  return response.data;
};

export const deleteImage = async (id: number) => {
  await instance.delete(`/s3/post-image/${id}`, getConfig());
};

export const uploadPost = async (data: PostFormData) => {
  const response = await instance.post('/posts', data, getConfig());
  return response.data;
};

export const editPost = async ({ postId, data }: { postId: number; data: PostFormData }) => {
  const response = await instance.patch(`/posts/${postId}`, data, getConfig());
  return response.data;
};

export const postLike = async (postId: number) => {
  const response = await instance.post(`/likes/posts/${postId}`, null, getConfig());
  return response.data;
};

export const deleteLike = async (postId: number) => {
  const response = await instance.delete(`/likes/posts/${postId}`, getConfig());
  return response.data;
};

export const hidePost = async (postId: number) => {
  const response = await instance.post(`/posts/${postId}/hide`, null, getConfig());
  return response.data;
};

export const reportPost = async ({ postId, reason }: { postId: number; reason: string }) => {
  const response = await instance.post(`/posts/${postId}/report?reason=${reason}`, null, getConfig());
  return response.data;
};

export const getDeleteReasons = async () => {
  const response = await instance.get('/users/delete-reasons', getConfig());
  return response.data;
};

export const postFilteredPosts = async (request: RequestBody) => {
  const response = await instance.post(`/posts/search`, { ...request, size: 10 }, getConfig());
  return response.data;
};

export const allPosts = async (page: number, city: string, district: string, sort: string) => {
  const response = await instance.get(
    `/posts?page=${page}&size=10&city=${city}&district=${district}&sort=${sort}`,
    getConfig(),
  );
  return response.data;
};

export const reissue = async () => {
  const response = await instance.post(`/auth/reissue`, null, getConfig({ withCredentials: true }));
  return response.data;
};

export const deleteAccount = async (reason: string) => {
  const response = await instance.delete(`/users?deleteReason=${reason}`, getConfig());
  return response.data;
};

<<<<<<< HEAD
export const getRegion = async () => {
  const response = await instance.get(`/regions`, getConfig());
  return response.data;
=======
export const deleteAccount = (reason: string) => {
  return instance.delete(`/users?deleteReason=${reason}`, getConfig());
};

export const getRegion = (): Promise<AxiosResponse<any>> => {
  return instance.get(`/regions`, getConfig());
>>>>>>> 2be4d72 (fix: axios 타입 에러 임시 해결 #105)
};

export const getLocationFromGeoPoint = async ({ latitude, longitude }: GeoPoint) => {
  const response = await instance.get(`/location?latitude=${latitude}&longitude=${longitude}`, getConfig());
  return response.data;
};

export const searchAddresses = async (address: string) => {
  const response = await instance.get(`/location/search?address=${address}`, getConfig());
  return response.data;
};

export const getHourlyWeatherInfo = async ({ latitude, longitude }: GeoPoint) => {
  const response = await instance.get(`/weather/time?latitude=${latitude}&longitude=${longitude}`, getConfig());
  return response.data;
};

export const getDailyWeatherInfo = async ({ latitude, longitude }: GeoPoint) => {
  const response = await instance.get(`/weather/tmp?latitude=${latitude}&longitude=${longitude}`, getConfig());
  return response.data;
};

export const getOutfitGuide = async (tmp: number) => {
  const response = await instance.get(`/weather/guide/outfit?tmp=${tmp}`);
  return response.data;
};

export const getOutfitByTemperature = async (tmp: number) => {
  const response = await instance.get(`/posts/tmp?tmp=${tmp}&page=${1}&size=${10}`);
  return response.data;
};
