import httpClient from '../api/Connection';

const getAll = () => {
	return httpClient.get('/client/all')
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll };