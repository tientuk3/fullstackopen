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

export const createNew = (data) => {
  return {
    type: 'ADD',
    data: {...data, votes: 0}
  }
}

export const voteExisting = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initialize = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export default anecdoteReducer