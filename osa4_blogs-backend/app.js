const config = require('./utils/config') //ympäristömuuttujat täältä
const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('express-async-errors')
const cors = require('cors')
const router = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger') //loggaus ym. tulostelu

logger.info('Yritetään yhdistää mongoDB-tietokantaan...')

mongoose.connect(config.mongoUrl)
  .then(() => {
    console.log('Yhdistetty tietokantaan')
  })
  .catch((error) => {
    console.log('Tietokantayhteys ei toimi, ks.: ', error.message)
  })

// middlewaret
app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/blogs', router)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)

module.exports = app