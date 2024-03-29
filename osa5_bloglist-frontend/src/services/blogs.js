import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blog) => {
  blog.likes = blog.likes + 1

  const url = baseUrl + '/' + blog.id

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(url, blog, config)
  return response.data
}

const remove = async (blog) => {
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