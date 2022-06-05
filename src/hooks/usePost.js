import { useQuery, QueryClient } from 'react-query';
import axios from 'axios'
const queryClient = new QueryClient();

export const fetchPost = (postId) =>
  axios.get(`/api/posts/${postId}`).then((res) => res.data)

export default function usePost(postId) {
  return useQuery(
    ['posts', postId],
    () => fetchPost(postId),
    {
      retry: false,
      initialData: () => {
        return queryClient.getQueryData('posts')?.find(data => data.id == postId)
      },
      initialStale: true,
    }
  )
}
