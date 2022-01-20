import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  
  switch(action.type) {
    case 'ADD':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      const selected = state.find(n => n.id === id)
      const updated = {
        ...selected,
        votes: selected.votes + 1
      }
      return state.map(n => n.id !== id ? n : updated)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const createNew = content => {
  return async dispatch =>{
    const NewAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: NewAnecdote
    })
  }
}

export const voteExisting = id => {
  return async dispatch => {
    await anecdoteService.updateExisting(id)
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export const initialize = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default anecdoteReducer