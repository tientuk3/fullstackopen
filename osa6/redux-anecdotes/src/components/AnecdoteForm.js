import React from 'react'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {

  const addNew = async (event) => {
    
    event.preventDefault()
    const content = event.target.text.value
    event.target.text.value = ''

    props.createNew(content)
    props.setNotification('Lisäsit anekdootin', 5)
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
export default connect(
  null,
  { createNew, setNotification }
)(NewAnecdote)