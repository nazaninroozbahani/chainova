import { PAGE_LIMIT } from '../utils/constants';
import axiosInstance from './axios-instance';

interface PostsParams {
  skip: number;
}

export const getPosts = (params: PostsParams) => {
  return axiosInstance({
    method: 'get',
    url: '/posts',
    params: { ...params, limit: PAGE_LIMIT },
  });
};
