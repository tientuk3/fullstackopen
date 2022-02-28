import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $julkaisuvuosi: Int!
    $genres: [String]
  ) {
    addBook(title: $title, author: $author, published: $julkaisuvuosi, genres: $genres) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor(
    $name: String!
    $syntymavuosi: Int!
  ) {
    editAuthor(name: $name, setBornTo: $syntymavuosi) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
    }
  }
`