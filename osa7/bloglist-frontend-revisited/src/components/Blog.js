import React from 'react'
//import { useDispatch, useSelector } from 'react-redux'
//import { likeExisting } from '../reducers/blogReducer'
import { useState } from 'react'
import { setNotification } from '../reducers/ilmoitusReducer'
import { useDispatch } from 'react-redux'
import { likeExisting } from '../reducers/blogReducer'
import blogService from '../services/blogs'


const Blog = ({ blog, handleDeletePost, username }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 3,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  const [viewState, setViewState] = useState(false) // for now this shall be a local component state
  const handleSetViewState = () => {
    setViewState(!viewState)
  }

  const deletePost = (event) => { // poista listaus
    event.preventDefault()
    handleDeletePost(blog)
    dispatch(setNotification({ text: 'Poistit blogin', color: 'green', t: 3 }))
  }

  const incrementLikes = async (event) => {
    event.preventDefault()

    try {
      const responseBlog = await blogService.update(blog)
      dispatch(likeExisting(responseBlog))
      dispatch(setNotification({ text: 'Tykkäsit blogista', color: 'green', t: 3 }))
    } catch (exception) {
      dispatch(setNotification({ text: 'Ei onnistunut!!', color: 'red', t: 3 }))
    }
  }

  return (
    <div id='blogi' style={blogStyle}>
      <div>
        {blog.title} by {blog.author} <button onClick={handleSetViewState}>{viewState ? 'Piilota tiedot' : 'Näytä tiedot'}</button>
      </div>

      {viewState && // renderöidään ehdollisesti kaikki tiedot
        <div>
          <b>{blog.likes}</b> tykkäystä <button onClick={incrementLikes}>Tykkää</button><br />
          Osoitteessa {blog.url}
        </div>
      }
      {(viewState && (blog.user.username === username)) &&
        <div>
          <button onClick={deletePost}>Poista</button>
        </div>
      }



    </div>
  )}

export default Blog