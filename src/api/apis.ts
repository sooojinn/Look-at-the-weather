import { PostFormData, PostMeta } from '@/config/types';
import { instance } from './instance';
import useAuthService from '@/hooks/useAuthService';
import { AxiosRequestConfig } from 'axios';

const { getAccessToken } = useAuthService();

const headers: AxiosRequestConfig['headers'] = { Authorization: getAccessToken() };
const config: AxiosRequestConfig = {
  headers,
};
type RequestBody = Record<string, any>;

export const postLogin = (request: RequestBody) => {
  return instance.post('/auth/login', request);
};
export const postLogout = () => {
  return instance.post('/auth/logout', null, config);
};

export const postFindEmail = (request: RequestBody) => {
  return instance.post('/auth/logout', request);
};

// export const postReissue = (request: RequestBody, addConfig: RequestHeader) => {
//   return instance.post('/auth/reissue', request, addConfig);
// };

export const getUserInfos = () => {
  return instance.get('/users/me', config);
};

export const patchEditProfile = (request: RequestBody) => {
  return instance.patch('/users/me', request, config);
};

export const getMyPosts = ({ page, size }: RequestBody) => {
  return instance.get(`/posts/me?page=${page}&size=${size}`, config);
};

export const getMyLikedPosts = ({ page, size }: RequestBody) => {
  return instance.get(`/likes/posts?page=${page}&size=${size}`, config);
};

export const getPostDetail = (postId: number) => {
  return instance.get(`/posts/${postId}`, config);
};

export const deletePost = (postId: number) => {
  return instance.delete(`/posts/${postId}`, config);
};

export const fetchTopLikedPosts = async () => {
  return instance.get('/posts/top-liked', config);
};

export const deleteImage = async (id: number) => {
  instance.delete(`/s3/post-image/${id}`, config);
};

export const uploadPost = async (data: PostFormData) => {
  return instance.post('/posts', data, config);
};

export const editPost = async ({ postId, data }: { postId: number; data: PostFormData }) => {
  console.log('수정 데이터: ', data);
  return instance.patch(`/posts/${postId}`, data, config);
};
