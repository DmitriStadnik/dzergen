import axios from "axios";

export default {
  getItems: (params) => {
    return axios.get('/api/collection', {
      params: {
        ...params
      }
    })
  },
}