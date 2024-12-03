import { GeoPoint, PostFormData, RegisterForm, VerifyCodeProps } from '@/config/types';
import { instance } from './instance';
import { AxiosRequestConfig } from 'axios';

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

export const postLogin = (request: RequestBody) => {
  return instance.post('/auth/login', request, getConfig({ withCredentials: true }));
};

export const postLogout = () => {
  return instance.post('/auth/logout', null, getConfig());
};

export const postFindEmail = (request: RequestBody) => {
  return instance.post('/users/email', request, getConfig());
};

export const postFindPassword = (request: RequestBody) => {
  return instance.post('/users/password', request, getConfig());
};

export const patchPasswordReset = (request: RequestBody) => {
  return instance.patch('/users/password', request, getConfig());
};

export const getUserInfos = async () => {
  const response = await instance.get('/users/me', getConfig());
  return response.data;
};

export const getKakaoUserInfos = async (code: string | null) => {
  const response = await instance.get(`/oauth/kakao?code=${code}`, getConfig());
  return response.data;
};

export const patchEditProfile = (request: RequestBody) => Promise<axios.AxiosResponse<any, any>>{
  return instance.patch('/users/me', request, getConfig());
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

export const deletePost = (postId: number) => {
  return instance.delete(`/posts/${postId}`, getConfig());
};

export const fetchTopLikedPosts = () => {
  return instance.get('/posts/top-liked', getConfig());
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await instance.post(`/s3/post-image`, formData, getConfig({ contentType: 'multipart/form-data' }));
  return response.data;
};

export const deleteImage = async (id: number) => {
  instance.delete(`/s3/post-image/${id}`, getConfig());
};

export const uploadPost = async (data: PostFormData) => {
  const response = await instance.post('/posts', data, getConfig());
  return response.data;
};

export const editPost = async ({ postId, data }: { postId: number; data: PostFormData }) => {
  return instance.patch(`/posts/${postId}`, data, getConfig());
};

export const postLike = (postId: number) => {
  return instance.post(`/likes/posts/${postId}`, null, getConfig());
};

export const deleteLike = (postId: number) => {
  return instance.delete(`/likes/posts/${postId}`, getConfig());
};

export const hidePost = (postId: number) => {
  return instance.post(`/posts/${postId}/hide`, null, getConfig());
};

export const reportPost = ({ postId, reason }: { postId: number; reason: string }) => {
  return instance.post(`/posts/${postId}/report?reason=${reason}`, null, getConfig());
};

export const getDeleteReasons = () => {
  return instance.get('/users/delete-reasons', getConfig());
};

export const postFilteredPosts = (request: RequestBody) => {
  return instance.post(`/posts/search`, { ...request, size: 10 }, getConfig());
};

export const allPosts = (page: number, city: string, district: string, sort: string) => {
  return instance.get(`/posts?page=${page}&size=10&city=${city}&district=${district}&sort=${sort}`, getConfig());
};

export const reissue = () => {
  return instance.post(`/auth/reissue`, null, getConfig({ withCredentials: true }));
};

export const logout = () => {
  return instance.post('/auth/logout', null, getConfig());
};

export const deleteAccount = (reason: string) => {
  return instance.delete(`/users?deleteReason=${reason}`, getConfig());
};

export const getRegion = () => {
  return instance.get(`/regions`, getConfig());
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
