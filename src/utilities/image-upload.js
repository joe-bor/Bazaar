const axios = require('axios')

const axiosFetch = (imageData) => {
    return axios.post('https://api.apiserver.me/upload', imageData, {
      headers: new Headers({ 'Content-Type': "multipart/form-data"})
    })
  }
  module.exports = axiosFetch