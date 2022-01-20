import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteExisting } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {

  return (
    <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            {anecdote.votes} ääntä
            <button onClick={handleClick}>äänestä</button>
          </div>
    </div>
  )

}

const Anecdotes = () => {
  const handleVoteAnecdote = (id) => {
    dispatch(voteExisting(id))
    dispatch(setNotification('Tykkäsit anekdootista'))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(n => n.content
      .toLowerCase()
      .includes(state.filter
        .toLowerCase()))
  })

  return (
    <div>

      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => handleVoteAnecdote(anecdote.id)}
        />
      )}

    </div>
  )
}

export default Anecdotes