import React, { useState } from 'react'

const PostForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleBlogTitle = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleBlogAuthor = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleBlogUrl = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const clearBlogForm = () => {
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })
    clearBlogForm()
  }

  return (
    <div>
      <h3>Lisää uusi blogi</h3>

      <form onSubmit={addBlog}>
        <div>
        Title
          <input
            value={newBlogTitle}
            onChange={handleBlogTitle}
          />
        </div>
        <div>
        Author
          <input
            value={newBlogAuthor}
            onChange={handleBlogAuthor}
          />
        </div>
        <div>
        URL
          <input
            value={newBlogUrl}
            onChange={handleBlogUrl}
          />
        </div>
        <button type="submit">Lähetä</button>
      </form>
    </div>
  )
}

export default PostForm