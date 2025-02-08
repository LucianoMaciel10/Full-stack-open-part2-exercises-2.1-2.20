import axios from 'axios'

const url = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(url)
  return request.then(res => res.data)
}

const create = (newPerson) => {
  const request = axios.post(url, newPerson)
  return request.then(res => res.data)
}

const remove = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(res => res.data)
}

const update = (id, personUpdate) => {
  const request = axios.put(`${url}/${id}`, personUpdate)
  return request.then(res => res.data)
}

export default { getAll, create, remove, update }