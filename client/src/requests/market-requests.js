import axios from "axios";

export default {
  getItems: (params) => {
    return axios.get('/api/market', {
      params: {
        ...params
      }
    })
  },
  countItems: (params) => {
    return axios.get('/api/collection/count', {
      params: {
        ...params
      }
    })
  },
}