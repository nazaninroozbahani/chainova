import { useQuery } from '@tanstack/react-query';
import { Comment } from '../definitions';
import { getComments } from '../services';

interface IData {
  comments: Comment[];
}

export default function useFetchComments<
  TQueryFnData = unknown,
  TError = unknown,
>(id: string) {
  return useQuery<TQueryFnData, TError, IData>({
    queryKey: ['comments', id],
    queryFn: async () => {
      const response = await getComments(id);
      console.log('commentssss');
      return response.data;
    },
  });
}
