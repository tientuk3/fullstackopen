import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const updateExisting = async (id) => {
  const old = await axios.get(baseUrl + '/' + id)
  const object = {...old.data, votes: old.data.votes + 1 }
  const response = await axios.put(baseUrl + '/' + id, object)
  return response.data
}

export default { getAll, createNew, updateExisting }
