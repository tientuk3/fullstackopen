var timeoutVar = null

const ilmoitusReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { text: action.text, color: action.color }
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const setVisible = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    text: notification.text,
    color: notification.color
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export const setNotification = (notification) => {
  return dispatch => {
    console.log('timeoutin id:', timeoutVar)
    clearTimeout(timeoutVar)
    dispatch(setVisible(notification))
    timeoutVar = setTimeout(() => {
      dispatch(clearNotification())
    }, notification.t*1000)
  }
}

export default ilmoitusReducer