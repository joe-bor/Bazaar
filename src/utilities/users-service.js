import * as usersAPI from './users-api';

export async function signUp(userData) {
  // Delete the network request code to the
  // users-api.js module which will ultimately
  // return the JWT
  const token = await usersAPI.signUp(userData);
  // Persist the token to localStorage
  localStorage.setItem('token', token);
  return getUser();
}

export async function updateUser(updatedUserData) {
  // get a new token with updated user info
  const token = await usersAPI.editUserInfo(updatedUserData)
  // remove the current token from localStorage
  localStorage.removeItem('token');
  // save new token to localStorage
  localStorage.setItem('token', token)
  return getUser()
}

export async function addItemToFavorites(userId, itemId) {
  // get a new token with updated user favorites
  const token = await usersAPI.addItemToFavorites(userId, itemId)
  // remove the current token from localStorage
  localStorage.removeItem('token');
  // save new token to localStorage
  localStorage.setItem('token', token)
  return getUser()
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  // Persist the token to localStorage
  localStorage.setItem('token', token);
  return getUser();
}

export function getToken() {
  const token = localStorage.getItem('token');
  // getItem will return null if no key
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's expiration is expressed in seconds, not miliseconds
  if (payload.exp < Date.now() / 1000) {
    // Token has expired
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
  localStorage.removeItem('token');
}