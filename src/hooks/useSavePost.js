import { useMutation, QueryClient } from 'react-query';
import axios from 'axios'
const queryClient = new QueryClient();

export default function useSavePost() {
  return useMutation(
    (newPost) => axios
  .patch(`/api/posts/${newPost.id}`, newPost)
  .then((res) => res.data),
  {
    onMutate: (newPost) => {
      queryClient.setQueryData(['posts', newPost.id], newPost)
    },
    // we have 2 params here one is the data that we get back as a res and other is variabled that we send to the mutation
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts', newPost.id], newPost)
      if(queryClient.getQueryData('posts')){
        queryClient.setQueryData('posts', old => {
          return old.map(d => {
            if(d.id === newPost.id){
              return newPost;
            }
            return d;
          })
        })
      } else {
        queryClient.setQueryData('posts', [newPost]);
        queryClient.invalidateQueries('posts');
      }
      // queryCache.invalidateQueries(['posts', post.id])
    },
  }
)}
