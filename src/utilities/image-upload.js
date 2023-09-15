import { getToken } from '../utilities/users-service'

import axios from 'axios'

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

export async function itemPut(shopId, itemId, imageData) {
  return axios.put(`/api/shops/${shopId}/items/${itemId}`, imageData, {
    headers: new Headers({
      'Content-Type': "multipart/form-data",
      'Authorization': `Bearer ${getToken()}`
    })
  })
}

export async function itemPost(shopId, imageData) {
  return axios.post(`/api/shops/${shopId}/items`, imageData, {
    headers: new Headers({
      'Content-Type': "multipart/form-data",
      'Authorization': `Bearer ${getToken()}`

    })
  })
}