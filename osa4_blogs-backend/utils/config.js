// environment variables

require('dotenv').config()

// portti
let PORT = process.env.PORT

// tietokannan url
const mongoUrl = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI


module.exports = {
  mongoUrl,
  PORT
}
