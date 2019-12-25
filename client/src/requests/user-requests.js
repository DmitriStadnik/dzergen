import axios from "axios";

export default {
  login: (params) => {
    return axios.post('/api/users/auth/login', {
      ...params
    })
  },
  register: (params) => {
    return axios.post('/api/users/register', {
      ...params
    })
  },
  getUser: (params) => {
    return axios.get('/api/users/user/get', {
      params: {
        ...params
      }
    })
  },
  checkAuth: (token) => {
    return axios.get('/api/users/auth/check', { 'headers': { 'Authorization': token } })
  },
}