import React, { useState } from 'react'
import {
  Switch, Route, Link,
  useRouteMatch, useHistory
} from "react-router-dom"
import { useField } from './hooks'
import './index.css'


const Menu = ({anecdotes, addNew}) => {
  const padding = {
    paddingRight: 5
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => String(anecdote.id) === String(match.params.id))
    : null
    
  return (
    <div>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>

      <Switch>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>

        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
        { anecdote && <div>{anecdote.content}</div> }
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const history = useHistory()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }

  const handleResetForm = (e) => { // clear all fields
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  var {reset, ...contentProps} = {...content}
  var {reset, ...authorProps} = {...author}
  var {reset, ...infoProps} = {...info}

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentProps} />
        </div>
        <div>
          author
          <input {...authorProps} />
        </div>
        <div>
          url for more info
          <input {...infoProps} />
        </div>
        <button>create</button> <button onClick={handleResetForm}>reset</button>
      </form>
    </div>
  )

}

const Notification = ({ message }) => {
  if (message === null) return null

  if (message.color === 'green') {
      return (
          <div className="viestiGreen">{message.content}</div>
      )
  } else {
      return (
          <div className="viestiRed">{message.content}</div>
      )
  }
}

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [message, setMessage] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setMessage({ content: 'Lisäsit anekdootin', color: 'green' })
    setTimeout(() => {setMessage(null)}, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification message={message} />
      <Menu anecdotes={anecdotes} addNew={addNew} notificationMessage={message} />
      <Footer />
    </div>
  )
}

export default App;