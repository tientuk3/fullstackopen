const User = require('../models/user')
const Blog = require('../models/blog')

const allUsers = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
const allBlogs = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  allUsers,
  allBlogs
}