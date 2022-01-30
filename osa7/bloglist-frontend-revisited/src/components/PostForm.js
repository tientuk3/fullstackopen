import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/blogReducer'
import { setNotification } from '../reducers/ilmoitusReducer'
import blogService from '../services/blogs'
import { Button, Typography } from '@material-ui/core'

const PostForm = ({ hide }) => {
  const dispatch = useDispatch()

  // component local states
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

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.create({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      })

      dispatch(createNew(response))
      dispatch(setNotification({ text: 'Lisäsit blogin', color: 'green', t: 3 }))
    } catch (exception) {
      dispatch(setNotification( { text: 'Ei onnistuntut!!', color: 'red', t: 3 }))
    }
    clearBlogForm()
    hide()
  }

  return (
    <div>
      <Typography variant='h5'>Lisää uusi blogi</Typography>

      <form onSubmit={addBlog}>
        <div>
        Title
          <input
            id='title'
            value={newBlogTitle}
            onChange={handleBlogTitle}
          />
        </div>
        <div>
        Author
          <input
            id='author'
            value={newBlogAuthor}
            onChange={handleBlogAuthor}
          />
        </div>
        <div>
        URL
          <input
            id='url'
            value={newBlogUrl}
            onChange={handleBlogUrl}
          />
        </div>
        <Button type="submit">Lähetä</Button>
      </form>
    </div>
  )
}

export default PostForm