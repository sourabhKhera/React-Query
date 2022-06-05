import { useMutation, QueryClient } from 'react-query';
import axios from 'axios'
const queryClient = new QueryClient();

export default function useCreatePost() {
  return useMutation(
    (values) => axios
  .post('/api/posts', values)
  .then((res) => res.data),
  {
    onMutate: (newPost) => {
      const oldPosts = queryClient.getQueryData('posts');
      if(queryClient.getQueryData('posts')){
        queryClient.setQueryData('posts', old => {
          return [...old, newPost]
        })
      }
      return () => queryClient.setQueryData('posts', oldPosts)
    },
    onError: (error, newPost, rollback) => {
      if(rollback)rollback();
    },
    // // we have 2 params here one is the data that we get back as a res and other is variabled that we send to the mutation
    // onSuccess: () => {
    //   queryCache.invalidateQueries('posts')
    // }
    // this is called whether the promise is resolved or rejected.
    onSettled: () => {
      queryClient.invalidateQueries('posts')
    }
  }
)}
