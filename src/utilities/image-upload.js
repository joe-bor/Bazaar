const axios = require('axios')

const axiosFetch = (imageData) => {
    return axios.post('https://api.apiserver.me/upload', imageData, {
      headers: new Headers({ 'Content-Type': "multipart/form-data"})
    }).then( (res) => {
      console.log(res.data.secure_url)
      return res.data.secure_url
    })
  }
  module.exports = axiosFetch