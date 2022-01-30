import React, { useEffect, useState, useRef } from 'react'
import BlogList from './components/BlogList'
import Ilmoitus from './components/Ilmoitus'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import UserList from './components/UserList'
import userService from './services/users'
import blogService from './services/blogs'
import { setNotification } from './reducers/ilmoitusReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initialize } from './reducers/blogReducer'
import { setUser, clearUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import Container from '@material-ui/core/Container'
import {
  Typography,
  Button
} from '@material-ui/core'

const App = () => {

  const user = useSelector(state => state.user)
  const blogsState = useSelector(state => state.blogs)

  const [users, setUsers] = useState(null) // käyttäjälistasivua varten

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

  useEffect(() => {
    fetchUsers()
  }, [blogsState])

  const fetchUsers = async () => {
    const allUsers = await userService.getUsers()
    setUsers(allUsers)
  }

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

  const hideCurrentComponent = async () => {
    postFormRef.current.toggleVisibility()
  }

  const postFormRef = useRef()
  const postForm = () => ( // lisää blogi
    <Togglable buttonLabel='Lisää uusi blogi' ref={postFormRef}>
      <PostForm hide={hideCurrentComponent} />
    </Togglable>
  )

  // RENDERÖITÄVÄ SISÄLTÖ ALKAA

  const api_regex = /^\/api\/.*/ // vähän regex taikaa
  if (api_regex.test(window.location.pathname)) {
    return <div /> // jos ollaan API-osoitteessa niin ohitetaan routeri
  } else {
    return (
      <Container>
        <Router>
          <div>

            <Button component={Link} to={'/'}>etusivu</Button>
            <Button component={Link} to={'/users'}>käyttäjät</Button>

            <Switch>
              <Route path="/users">
                <UserList users={users} />
              </Route>
              <Route path="/">
                <Typography variant="h4">Blogit</Typography>
                <Ilmoitus />

                {user === null ? // kirjautumislomake tai tervetuloteksti
                  <LoginForm /> :
                  <div>
                    <p>Olet kirjautuneena käyttäjällä <b>{user.name} <Button onClick={handleLogout}>Kirjaudu ulos</Button></b></p>
                  </div>
                }

                {user && // renderöidään sisältö jos kirjautunut sisään
                  <div>
                    <BlogList username={user.username} />
                    { postForm() }
                  </div>
                }
              </Route>
            </Switch>

          </div>
        </Router>
      </Container>
    )
  }
}

export default App