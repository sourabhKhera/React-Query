import React from 'react'
import { Link } from 'react-router-dom'
import { queryCache } from 'react-query';
import axios from 'axios'
//
import usePosts from '../../hooks/usePosts'
import { PostStyles } from '../../components/styled'

export default function Home() {
  const postsQuery = usePosts()
  // const postQuery = usePost(postId)

  const handleMouseOver = (postId) => {
    queryCache.prefetchQuery(
      ['posts', postId],
      () => axios.get(`/api/posts/${postId}`).then((res) => res.data),
      {
          onSuccess: (post) => {
              queryCache.setQueryData(['posts', post.id], post)
          }
      }
    )
  };

  return (
    <div>
      <h1>Blog</h1>

      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
        `}
      >
        {postsQuery.isLoading ? (
          <span>Loading...</span>
        ) : postsQuery.isError ? (
          postsQuery.error.message
        ) : (
          postsQuery.data.map((post) => (
            <PostStyles as={Link} to={`./${post.id}`} key={post.id} onMouseOver={()=> {}}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </PostStyles>
          ))
        )}
      </div>
    </div>
  )
}
