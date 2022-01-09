import React from 'react'
import '../index.css'

const Ilmoitus = ({ msg }) => {
  if (msg === null) return null

  if (msg.color === 'green') {
    return (
      <div className="viestiGreen">{msg.text}</div>
    )
  } else {
    return (
      <div className="viestiRed">{msg.text}</div>
    )
  }
}

export default Ilmoitus