const router = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
//const apufunktiot = require('../tests/apufunktiot')


// get kaikki
router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

// get yksittäinen
router.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }

})

// lisää blogi
router.post('/', middleware.userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token virheellinen tai puuttuu' })
  }

  blog.user = request.user._id

  if (!blog.title || !blog.url) {
    response.status(400).end()
  } else {
    if (!blog.likes) { blog.likes = 0 }
    const savedblog = await blog.save()
    savedblog.populate('user', { username: 1, name: 1 })
    request.user.blogs = request.user.blogs.concat(savedblog._id)
    await request.user.save()
    response.status(201).json(savedblog.toJSON())
  }

})

// poista blogi
router.delete('/:id', middleware.userExtractor, async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token virheellinen tai puuttuu' })
  }

  const blog = await Blog.findById(request.params.id) // haetaan kyseessä oleva blogi (jos sitä edes on)
  if (!blog) {
    return response.status(204).end()
  } else if ( blog.user.toString() === decodedToken.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end() // onnistui
  } else {
    response.status(401).json({ error: 'ei oikeuksia operaatioon' }) // väärä käyttäjä
  } // error...

})

// muokkaa blogilistausta
router.put('/:id', middleware.userExtractor, async (request, response) => {

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token virheellinen tai puuttuu' })
  }

  const newContent = { // conditional properties
    ...(request.body.likes) && { likes: request.body.likes },
    ...(request.body.title) && { title: request.body.title },
    ...(request.body.author) && { author: request.body.author },
    ...(request.body.url) && { url: request.body.url }
  }

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(400).end()
  /*
  } else if ( blog.user.toString() === decodedToken.id.toString() ) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newContent, { new: true, runValidators: true })
    response.json(updatedBlog.toJSON()) // onnistui
  } else {
    response.status(401).json({ error: 'ei oikeuksia operaatioon' }) // väärä käyttäjä
  } // error...
  */
  } else {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newContent, { new: true, runValidators: true })
    response.json(updatedBlog.toJSON()) // onnistui
  } // error...

})

module.exports = router