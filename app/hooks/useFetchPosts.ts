import { useQuery } from '@tanstack/react-query';
import { Post } from '../definitions';
import { getPosts } from '../services';

interface IData {
  posts: Post[];
  total: number;
}

export default function useFetchPosts<TQueryFnData = unknown, TError = unknown>(
  skip: number,
) {
  return useQuery<TQueryFnData, TError, IData>({
    queryKey: ['posts', skip],
    queryFn: async () => {
      const response = await getPosts({ skip });
      return response.data;
    },
  });
}
