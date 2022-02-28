import { useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from './queries'

export const updateCache = (cache, query, subscriptionAddedBook) => {
  const unique = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: unique(allBooks.concat(subscriptionAddedBook)),
    }
  })
}


const App = () => {
  const result_authors = useQuery(ALL_AUTHORS)
  const result_books = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const me = useQuery(ME)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const subscriptionAddedBook = subscriptionData.data.bookAdded
      window.alert(`Kirja ${subscriptionAddedBook.title} lisätty`)
      updateCache(client.cache, { query: ALL_BOOKS }, subscriptionAddedBook)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if ((result_authors.loading || result_books.loading) || me.loading) {
    return <div>loading...</div>
  }

  if (!token) {
    return (
      <div>
        <h3>Et ole kirjautuneena</h3>
        <h2>Kirjaudu sisään</h2>
        <LoginForm
          setToken={setToken}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} authors={result_authors.data.allAuthors} />

      <Books show={page === 'books'} books={result_books.data.allBooks} />

      <Recommended show={page === 'recommended'} books={result_books.data.allBooks} user={me.data} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
