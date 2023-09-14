import { getToken } from '../utilities/users-service'

import axios from 'axios';

export function axiosPut(id, imageData) {
  return axios.put(`/api/users/${id}`, imageData, {
    headers: new Headers({ 
      'Content-Type': "multipart/form-data", 
      'Authorization': `Bearer ${getToken()}`
    })
  })
}

export function axiosPost(id, imageData) {
  return axios.post(`/api/users/${id}`, imageData, {
    headers: new Headers({ 
      'Content-Type': "multipart/form-data", 
      'Authorization': `Bearer ${getToken()}`
    })
  })
}