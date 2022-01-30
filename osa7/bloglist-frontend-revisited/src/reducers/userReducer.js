const userReducer = (state = [], action) => {

  switch (action.type) {
    case 'SET':
      return action.user
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET',
      user: user
    })
  }
}

export const clearUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'CLEAR'
    })
  }
}

export default userReducer