import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Ilmoitus from './components/Ilmoitus'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(false) // ei tarvita vielä
  const [message, setMessage] = useState(null)

  const [username, setUsername] = useState('default') 
  const [password, setPassword] = useState('default') 

  const [newBlogTitle, setNewBlogTitle] = useState('') 
  const [newBlogAuthor, setNewBlogAuthor] = useState('') 
  const [newBlogUrl, setNewBlogUrl] = useState('') 



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

  const handleAddBlog = async (event) => { // lisää blogi -handleri
    event.preventDefault()
    console.log('Lisätään blogia käyttäjällä', username)

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    try {
      const createdBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(createdBlog))
      clearBlogForm()
      
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

  const clearBlogForm = () => {
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Käyttäjätunnus
          <input
          type="text"
          value={username}
          name="Käyttäjätunnus"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Salasana
          <input
          type="password"
          value={password}
          name="Salasana"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Kirjaudu sisään</button>
    </form>      
  )

  const logOutButton = () => (
    <button onClick={handleLogout}>
      Kirjaudu ulos
    </button>
  )

  const postForm = () => ( // lisää blogi
    <form onSubmit={handleAddBlog}>
      <div>
        Title
          <input
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        Author
          <input
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <div>
        URL
          <input
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <button type="submit">Lähetä</button>
    </form>      
  )

  // RENDERÖITÄVÄ SISÄLTÖ ALKAA

  return (
    <div>

      <h2>Blogit</h2>
      <Ilmoitus msg={message} />

      {user === null ? // kirjautumislomake tai tervetuloteksti
        loginForm() :
        <div>
          <p>Olet kirjautuneena käyttäjällä <b>{user.name}</b></p> { logOutButton() }
        </div>
      }

      {user && // renderöidään sisältö jos kirjautunut sisään
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <h3>Lisää uusi blogi</h3> { postForm() }
        </div>
      }

    </div>

  )
}

export default App