import axios from "axios";

export default {
  getItems: (page, count) => {
    return axios.get('/api/collection', {
      params: {
        count: count,
        page: page,

      }
    })
  },
}