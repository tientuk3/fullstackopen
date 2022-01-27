import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Ilmoitus from './components/Ilmoitus'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/ilmoitusReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => { // näytä blogit
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => { // mahdollisen kirjautuneen käyttäjän tiedot selaimesta
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => { // kirjaudu sisään -handleri
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

      setUser(user) // token on täällä
      setUsername('')
      setPassword('')

      dispatch(setNotification({ text: 'Kirjautuminen onnistui', color: 'green', t: 3 }))

    } catch (exception) {
      dispatch(setNotification({ text: 'Väärä käyttäjätunnus tai salasana', color: 'red', t: 3 }))
    }

  }

  const handleLogout = async (event) => { // kirjaudu ulos -handleri
    event.preventDefault()
    console.log('kirjaudutaan ulos käyttäjältä', username)

    try {
      blogService.clearToken()

      window.localStorage.clear()

      const uloskirjautuja = user.name
      setUser(null) // token on täällä
      setUsername('')
      setPassword('')

      dispatch(setNotification({ text: 'Kirjauduit ulos käyttäjältä ' + uloskirjautuja, color: 'green', t: 3 }))

    } catch (exception) {
      console.log('tätä ei pitäisi tulostua koskaan')
    }

  }

  const handleAddBlog = async (blogObject) => { // lisää blogi -handleri
    postFormRef.current.toggleVisibility()
    console.log('Lisätään blogia')

    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))

      console.log('blogin lisäys onnistui')
      dispatch(setNotification({ text: 'Lisäsit blogin', color: 'green', t: 3 }))


    } catch (exception) {
      console.log('blogin lisäys EI ONNISTUNUT!!')
      dispatch(setNotification({ text: 'Blogin lisäys ei onnistunut', color: 'red', t: 3 }))

    }

  }

  const handleUpdateBlog = async (blogObject) => { // lisää blogi -handleri

    try {
      await blogService.update(blogObject)
      setBlogs(blogs.map(n => n.id === blogObject.id ? { ...n, likes: n.likes + 1 } : n))

      console.log('Lisättiin blogiin tykkäys')
      dispatch(setNotification({ text: 'Tykkäsit blogista', color: 'green', t: 3 }))

    } catch (exception) {
      console.log('tämän ei pitäisi tulostua koskaan')
    }
  }

  const handleDeleteBlog = async (blogObject) => { // poista blogi -handleri

    try {
      const response = await blogService.remove(blogObject)

      if (response.status === 204) {
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        console.log('poistettu onnistuneesti')
        dispatch(setNotification({ text: 'Poistit blogin', color: 'green', t: 3 }))
      }

    } catch (exception) {
      console.log('ei onnistunut')
      dispatch(setNotification({ text: 'Blogin poisto ei onnistunut', color: 'red', t: 3 }))

    }
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const postFormRef = useRef()
  const postForm = () => ( // lisää blogi
    <Togglable buttonLabel='Lisää uusi blogi' ref={postFormRef}>
      <PostForm createBlog={handleAddBlog}/>
    </Togglable>
  )

  // RENDERÖITÄVÄ SISÄLTÖ ALKAA

  return (
    <div>

      <h2>Blogit</h2>
      <Ilmoitus />

      {user === null ? // kirjautumislomake tai tervetuloteksti
        loginForm() :
        <div>
          <p>Olet kirjautuneena käyttäjällä <b>{user.name} <button onClick={handleLogout}>Kirjaudu ulos</button></b></p>
        </div>
      }

      {user && // renderöidään sisältö jos kirjautunut sisään
        <div>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleIncrementLikes={handleUpdateBlog}
              handleDeletePost={handleDeleteBlog}
              username={user.username} />
          )}
          { postForm() }
        </div>
      }

    </div>

  )
}

export default App