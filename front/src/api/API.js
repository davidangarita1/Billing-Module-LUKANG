import axios from "axios";

const HOST_API = "http://localhost:4000/api";

export default axios.create({
	  baseURL: HOST_API,
	  headers: {
		"Content-Type": "application/json"	
	}
});