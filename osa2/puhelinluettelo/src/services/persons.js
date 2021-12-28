import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getList = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (changedObject) => {
    return axios.put(`${baseUrl}/${changedObject.id}`, changedObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const database = {
    getList: getList,
    create: create,
    remove: remove,
    update: update
}

export default database