import { React, useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initialize } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])

  return (
    <div>
      <h2>Anekdootit</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App