var timeoutVar = null

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

  return dispatch => {
    console.log('timeoutin id:', timeoutVar)
    clearTimeout(timeoutVar)
    dispatch(setVisible(message))
    timeoutVar = setTimeout(() => {
      dispatch(clearNotification())
    }, t*1000)
  }
}

export default notificationReducer