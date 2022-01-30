import React, { useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Ilmoitus from './components/Ilmoitus'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import blogService from './services/blogs'
import { setNotification } from './reducers/ilmoitusReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initialize } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'

const App = () => {

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])

  useEffect(() => { // mahdollisen kirjautuneen käyttäjän tiedot selaimesta
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } else {
      dispatch(clearUser())
    }
  }, [])

  const handleLogout = async (event) => { // kirjaudu ulos -handleri
    event.preventDefault()
    console.log('kirjaudutaan ulos käyttäjältä', user.username)

    try {
      blogService.clearToken() // tyhjennetään token-muuttuja
      window.localStorage.clear() // tyhjennetään tiedot selaimesta

      const uloskirjautuja = user.name

      dispatch(clearUser()) // tyhjennetään kirjautuneen käyttäjän tiedot storesta
      dispatch(setNotification({ text: 'Kirjauduit ulos käyttäjältä ' + uloskirjautuja, color: 'green', t: 3 }))

    } catch (exception) {
      console.log('tätä ei pitäisi tulostua koskaan')
    }

  }

  const postFormRef = useRef()
  const postForm = () => ( // lisää blogi
    <Togglable buttonLabel='Lisää uusi blogi' ref={postFormRef}>
      <PostForm />
    </Togglable>
  )

  // RENDERÖITÄVÄ SISÄLTÖ ALKAA

  return (
    <div>

      <h2>Blogit</h2>
      <Ilmoitus />

      {user === null ? // kirjautumislomake tai tervetuloteksti
        <LoginForm /> :
        <div>
          <p>Olet kirjautuneena käyttäjällä <b>{user.name} <button onClick={handleLogout}>Kirjaudu ulos</button></b></p>
        </div>
      }

      {user && // renderöidään sisältö jos kirjautunut sisään
        <div>
          <BlogList username={user.username} />
          { postForm() }
        </div>
      }

    </div>

  )
}

export default App