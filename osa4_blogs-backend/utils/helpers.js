/* eslint-disable no-unused-vars */

const blog = require('../models/blog')

const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  if (blogs.length > 0) {
    return blogs.reduce((sum, current) => sum + current.likes, 0)
  } else {
    return 0
  }
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = null

  blogs.forEach(current => { // iterate
    if (!favoriteBlog || current.likes > favoriteBlog.likes) {
      favoriteBlog = current
    }
  })
  return favoriteBlog

}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return (null)
  }

  let dict = [{
    author: null,
    blogs: null
  }]

  blogs.forEach(current => { // iterate
    const kirjoittaja = dict.find(alkio => alkio.author === current.author)

    if (kirjoittaja) {
      kirjoittaja.blogs += 1
    } else {
      dict.push({
        author: current.author,
        blogs: 1
      })
    }
  })

  const returnvalue = dict.reduce((previous, current) => { // return object with largest 'blogs'
    return (previous.blogs > current.blogs) ? previous : current
  })
  return returnvalue

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return (null)
  }

  let dict = [{
    author: null,
    likes: null
  }]

  blogs.forEach(current => { // iterate
    const kirjoittaja = dict.find(alkio => alkio.author === current.author)

    if (kirjoittaja) {
      kirjoittaja.likes += current.likes
    } else {
      dict.push({
        author: current.author,
        likes: current.likes
      })
    }
  })

  const returnvalue = dict.reduce((previous, current) => { // return object with largest 'likes'
    return (previous.likes > current.likes) ? previous : current
  })
  return returnvalue

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}