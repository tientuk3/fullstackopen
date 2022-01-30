import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => { // all blogs
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => { // post new
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blog) => { // update listing (for now means increment likes)
  const modifiedBlog = { ...blog, likes: blog.likes + 1 }

  const url = baseUrl + '/' + blog.id

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(url, modifiedBlog, config)
  return response.data
}

const remove = async (blog) => { // delete listing
  const url = baseUrl + '/' + blog.id

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(url, config, blog)
  return response
}

const setToken = newToken => {
  token = 'bearer ' + newToken
}

const clearToken = () => {
  token = null
}

export default {
  getAll,
  create,
  update,
  remove,
  setToken,
  clearToken
}