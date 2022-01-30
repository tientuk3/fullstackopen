import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteExisting, likeExisting } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = ({ username }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)


  return (
    <div>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleIncrementLikes={  () => dispatch(likeExisting(blog))      }
          handleDeletePost={      () => dispatch(deleteExisting(blog))  }
          username={username} />
      )}
    </div>
  )}

export default BlogList