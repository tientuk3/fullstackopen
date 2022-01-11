import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteExisting } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {

  return (
    <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>äänestä</button>
          </div>
    </div>
  )

}

const Anecdotes = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <div>

      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote 
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => dispatch(voteExisting(anecdote.id))}
        />
      )}

    </div>
  )
}
export default Anecdotes