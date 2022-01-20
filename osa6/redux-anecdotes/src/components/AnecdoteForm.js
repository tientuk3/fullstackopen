import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {

  const dispatch = useDispatch()

  const addNew = async (event) => {
    
    event.preventDefault()
    const content = event.target.text.value
    event.target.text.value = ''
    const NewAnecdote = await anecdoteService.createNew(content) // response.data
    dispatch(createNew(NewAnecdote))
    dispatch(setNotification('Lisäsit anekdootin'))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Lisää anekdootti</h2>
      <form onSubmit={addNew}>
        <div><input name='text' /></div>
        <button type="submit">lisää</button>
      </form>
    </div>
  )
}
export default NewAnecdote