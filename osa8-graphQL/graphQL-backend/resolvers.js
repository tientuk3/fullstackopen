const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const JWT_SECRET = 'salaisuus'

const resolvers = {

  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const b = await Book.find({}).populate('author')
      let a = []
      if (args.author) {
        a = b.filter(n => n.author.name === args.author)
      } else {
        a = b
      }
      if (args.genre) {
        return a.filter(n => n.genres.includes(args.genre))
      } else {
        return a
      }
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
  },

  Author: {
    bookCount: async (root) => {
      const a = await Book.find({}).populate('author')
      return a.filter(n => n.author.name === root.name).length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser // auth
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const a = await Author.exists({ name: args.author })
      if (!a) {
        const b = new Author({ name: args.author })
        await b.save()
        console.log('luotiin uusi kirjoittaja')
      } else {
        console.log('kirjoittaja jo olemassa')
      }

      const kirjoittaja = await Author.findOne({ name: args.author })

      const genres = args.genres.length > 0 ? args.genres : ['undefined']
      const book = new Book({ ...args, author: kirjoittaja, genres: genres })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book

    },

    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name})

      const currentUser = context.currentUser // auth
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      author.born = args.setBornTo
      try {
        await author.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author.save()
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'salasana' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

module.exports = resolvers