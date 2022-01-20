const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

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
    data: asObject(data)
  }
}

export const voteExisting = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initialize = (id) => {
  return {
    type: 'INIT',
    data: initialState
  }
}

export default anecdoteReducer