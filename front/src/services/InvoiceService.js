import httpClient from '../api/Connection';

const getAll = () => {
	return httpClient.get('/invoice/all')
}

const create = (data) => {
	return httpClient.post('/invoice/save', data)
}

const get = (id) => {
	return httpClient.get(`/invoice/${id}`)
}

const update = (data) => {
	return httpClient.put('/invoice/update', data)
}

const remove = (id) => {
	return httpClient.delete(`/invoice/delete/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, get, update, remove };