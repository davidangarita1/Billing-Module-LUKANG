import HttpClient from './API';

const getAll = () => {
	return HttpClient.get('/products')
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getAll};