import axios from 'axios'
import { useMutation, QueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom'
const queryClient = new QueryClient();

export default function useDeletePost() {
  const navigate = useNavigate()

  return useMutation(
    (postId) => axios.delete(`/api/posts/${postId}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
        navigate('/admin');
      }
    }
  )
}
