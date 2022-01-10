import React, { useState } from 'react'

const Blog = ({ blog, handleIncrementLikes, handleDeletePost, username }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 3,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  const [viewState, setViewState] = useState(false)
  const handleSetViewState = () => {
    setViewState(!viewState)
  }

  const incrementLikes = (event) => { // lisää tykkäys
    event.preventDefault()
    handleIncrementLikes(blog)
  }
  const deletePost = (event) => { // poista listaus
    event.preventDefault()
    handleDeletePost(blog)
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