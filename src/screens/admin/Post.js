import React from 'react'
import { Link, useParams } from 'react-router-dom'

//

import usePost from '../../hooks/usePost'
import useSavePost from '../../hooks/useSavePost'
import useDeletePost from '../../hooks/useDeletePost'

import PostForm from '../../components/PostForm'
import { Loader } from '../../components/styled'

export default function Post() {
  const { postId } = useParams()

  const postQuery = usePost(postId)
  const [savePost, savePostInfo] = useSavePost()
  const [deletePost, deletePostInfo] = useDeletePost()

  return (
    <>
      {postQuery.isLoading ? (
        <span>
          <Loader /> Loading...
        </span>
      ) : (
        <div>
          <h3>{postQuery.data.title}</h3>
          <p>
            <Link to={`/blog/${postQuery.data.id}`}>View Post</Link>
          </p>
          <PostForm
            initialValues={postQuery.data}
            onSubmit={savePost}
            submitText={
              savePostInfo.isLoading
                ? 'Saving...'
                : savePostInfo.isError
                ? 'Error!'
                : savePostInfo.isSuccess
                ? 'Saved!'
                : 'Save Post'
            }
          />

          <p>
            <button onClick={() => deletePost(postId)}>
              {deletePostInfo.isLoading
                ? 'Deleting...'
                : deletePostInfo.isError
                ? 'Error!'
                : deletePostInfo.isSuccess
                ? 'Deleted!'
                : 'Delete Post'}
            </button>
          </p>
        </div>
      )}
    </>
  )
}
