import { PostFormData } from '@/config/types';
import { instance } from './instance';
import { AxiosRequestConfig } from 'axios';
import { getAccessToken } from './instance';

const getConfig = (contentType = 'application/json'): AxiosRequestConfig => ({
  headers: {
    'Content-Type': contentType,
    Authorization: getAccessToken(),
  },
});
type RequestBody = Record<string, any>;

export const postLogin = (request: RequestBody) => {
  const option = { withCredentials: true };

  return instance.post('/auth/login', request, option);
};

export const postLogout = () => {
  return instance.post('/auth/logout', null, getConfig());
};

export const postFindEmail = (request: RequestBody) => {
  return instance.post('/users/email', request);
};

export const postFindPassword = (request: RequestBody) => {
  return instance.post('/users/password', request);
};

export const patchPasswordReset = (request: RequestBody) => {
  return instance.patch('/users/password', request);
};

export const getUserInfos = () => {
  return instance.get('/users/me', getConfig());
};

export const patchEditProfile = (request: RequestBody) => {
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
  const response = await instance.post(`/s3/post-image`, formData, getConfig('multipart/form-data'));
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
  const option = { withCredentials: true };

  return instance.post(`/auth/reissue`, null, option);
};

export const logout = () => {
  return instance.post('/auth/logout', null, getConfig());
};

export const deleteAccount = (reason: string) => {
  return instance.delete(`/users?deleteReason=${reason}`, getConfig());
};

export const getRegion = () => {
  return instance.get(`/regions`);
};
