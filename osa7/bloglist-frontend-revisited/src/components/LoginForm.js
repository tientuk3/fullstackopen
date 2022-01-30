import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/ilmoitusReducer'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {

  const dispatch = useDispatch()

  // local component states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('kirjaudutaan käyttäjällä', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      dispatch(setUser(user)) // token on täällä
      setUsername('')
      setPassword('')

      dispatch(setNotification({ text: 'Kirjautuminen onnistui', color: 'green', t: 3 }))

    } catch (exception) {
      dispatch(setNotification({ text: 'Väärä käyttäjätunnus tai salasana', color: 'red', t: 3 }))
    }

  }

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

export default LoginForm