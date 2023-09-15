import { getToken } from '../utilities/users-service'

import axios from 'axios';

export async function userPut(id, imageData) {
  return axios.put(`/api/users/${id}`, imageData, {
    headers: new Headers({ 
      'Content-Type': "multipart/form-data", 
      'Authorization': `Bearer ${getToken()}`
    })
  })
}

export async function userPost(imageData) {
  return axios.post(`/api/users`, imageData, {
    headers: new Headers({ 
      'Content-Type': "multipart/form-data", 
      'Authorization': `Bearer ${getToken()}`
    })
  })
}

export async function shopPost(imageData) {
  return axios.post(`/api/shops`, imageData, {
    headers: new Headers({ 
      'Content-Type': "multipart/form-data", 
      'Authorization': `Bearer ${getToken()}`
    })
  })
}

export async function shopPut(id, imageData) {
  return axios.put(`/api/shops/${id}`, imageData, {
    headers: new Headers({ 
      'Content-Type': "multipart/form-data", 
      'Authorization': `Bearer ${getToken()}`
    })
  })
}

export async function itemPut(id, imageData) {
  return axios.put(`/api/shops/items/${id}`, imageData, {
    headers: new Headers({ 
      'Content-Type': "multipart/form-data", 
      'Authorization': `Bearer ${getToken()}`
    })
  })
}

export async function itemPost(imageData) {
  return axios.post(`/api/shops/items/${id}`, imageData, {
    headers: new Headers({ 
      'Content-Type': "multipart/form-data", 
      'Authorization': `Bearer ${getToken()}`

    })
  })
}