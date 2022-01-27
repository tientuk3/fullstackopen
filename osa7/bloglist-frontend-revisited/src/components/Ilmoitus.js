import React from 'react'
import '../index.css'
import { useSelector } from 'react-redux'

const Ilmoitus = () => {

  const notification = useSelector(state => state.ilmoitus)
  if (!notification) return null

  if (notification.color === 'green') {
    return (
      <div className="viestiGreen">{notification.text}</div>
    )
  } else {
    return (
      <div className="viestiRed">{notification.text}</div>
    )
  }
}

export default Ilmoitus