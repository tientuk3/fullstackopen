import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch(action.type) {
    case 'ADD':
      return [...state, action.data]
    case 'DELETE':
      return state.filter(blog => blog.id !== action.id) // set state to previous state minus deleted listing
    case 'LIKE':
      return state.map(n => n.id !== action.data.id ? n : action.data) // action.data is the updated listing
    case 'INIT':
      return action.data
    case 'ERR':
      return state
    default:
      return state
  }
}

export const createNew = (content) => {
  return async dispatch => {
    dispatch({
      type: 'ADD',
      data: content
    })
  }
}

export const deleteExisting = (blogObject) => {
  return async dispatch => {
    const response = await blogService.remove(blogObject)
    if (response.status === 204) {
      dispatch({
        type: 'DELETE',
        id: blogObject.id
      })
    }
  }
}

export const likeExisting = (content) => {
  return async dispatch => {
    dispatch({
      type: 'LIKE',
      data: content
    })
  }
}

export const initialize = () => { // GET all and initialize state with the response
  return async dispatch => {
    const allBlogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: allBlogs
    })
  }
}

export default blogReducer