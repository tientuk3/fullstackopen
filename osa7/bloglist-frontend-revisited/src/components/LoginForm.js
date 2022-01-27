import React from 'react'
import propTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div>
      <h3>Kirjaudu sisään</h3>

      <form onSubmit={handleSubmit}>
        <div>
          Käyttäjätunnus
          <input
            type="text"
            id='username'
            value={username}
            name="Käyttäjätunnus"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Salasana
          <input
            type="password"
            id='password'
            value={password}
            name="Salasana"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Kirjaudu sisään</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
  handleUsernameChange: propTypes.func.isRequired,
  handlePasswordChange: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired
}

export default LoginForm