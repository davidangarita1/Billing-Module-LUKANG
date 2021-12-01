import httpClient from '../api/Connection';

const getAll = () => {
	return httpClient.get('/product/all')
}

const saveProduct = (data) => {
	return httpClient.post('/product/save', data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, saveProduct };