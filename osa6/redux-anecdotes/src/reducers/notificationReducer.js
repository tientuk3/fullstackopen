const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const setVisible = message => {
  return {
    type: 'SET_NOTIFICATION',
    message,
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export const setNotification = (message, t) => {
  console.log(t)
  return dispatch => {
    dispatch(setVisible(message))
    setTimeout(() => { dispatch(clearNotification()) }, t*1000)
  }
}

export default notificationReducer