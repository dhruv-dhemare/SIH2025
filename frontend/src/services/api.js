import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' }); // hardcoded

export const signup = (data) => API.post('/auth/signup', data).then(r=>r.data);
export const login = (data) => API.post('/auth/login', data).then(r=>r.data);

export default API;