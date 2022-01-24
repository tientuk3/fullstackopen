import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 3,
  }
  return (
    props.notification
    ? <div style={style}>
        {props.notification}
      </div>
    : null
  
  )
}
const mapStateToProps = (state) => {
  return { notification: state.notification }
}

export default connect(mapStateToProps, null)(Notification)