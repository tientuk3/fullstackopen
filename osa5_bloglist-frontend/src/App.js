import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Ilmoitus from './components/Ilmoitus'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [showAll, setShowAll] = useState(false)
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

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

      setMessage({ text: 'Kirjautuminen onnistui', color: 'green' })
      setTimeout(() => {
        setMessage(null)
      }, 3000)

    } catch (exception) {
      setMessage({ text: 'Väärä käyttäjätunnus tai salasana', color: 'red' })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
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

      setMessage({ text: 'Kirjauduit ulos käyttäjältä ' + uloskirjautuja, color: 'green' })
      setTimeout(() => {
        setMessage(null)
      }, 3000)

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
      setMessage({ text: 'Lisäsit uuden blogin', color: 'green' })
      setTimeout(() => {
        setMessage(null)
      }, 3000)

    } catch (exception) {
      console.log('blogin lisäys EI ONNISTUNUT!!')
      setMessage({ text: 'Blogin lisäys ei onnistunut', color: 'red' })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }

  }

  const handleUpdateBlog = async (blogObject) => { // lisää blogi -handleri

    try {
      const updatedBlog = await blogService.update(blogObject)
      let updatedBlogs = blogs
      updatedBlogs.slice(0,-1).push(updatedBlog)
      setBlogs(updatedBlogs)

      console.log('Lisättiin blogiin tykkäys')
      setMessage({ text: 'Tykkäsit blogista', color: 'green' })
      setTimeout(() => {
        setMessage(null)
      }, 3000)

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
        setMessage({ text: 'Poistit blogin', color: 'green' })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      }

    } catch (exception) {
      console.log('ei onnistunut')
      setMessage({ text: 'Blogin poisto ei onnistunut', color: 'red' })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
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
      <Ilmoitus msg={message} />

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