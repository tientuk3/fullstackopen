import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'

const NewAnecdote = () => {

  const dispatch = useDispatch()
  const addNew = (event) => {
    
    event.preventDefault()
    const content = event.target.text.value
    event.target.text.value = ''
    dispatch(createNew(content))
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