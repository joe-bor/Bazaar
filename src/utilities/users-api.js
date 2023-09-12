import sendRequest, { sendUrlFormData } from './send-request';

const BASE_URL = '/api/users';

export function signUp(userData) {
	return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
	return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function editUserInfo(id, newInfo) {
	return sendUrlFormData(`${BASE_URL}/${id}`, 'PUT', newInfo)
}

export function toggleFavorites(id, itemId) {
	return sendRequest(`${BASE_URL}/${id}/favorites`, 'PUT', { itemId: itemId })
}

export function deleteUser(id) {
	return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}

export function getFavorites(id) {
	return sendRequest(`${BASE_URL}/${id}/favorites`)
}

/* 
 User = {
		 Name
		 Email (unique)
		 Password (hashed)
		 Favorites: array of item._ids
		 Shop: shop._id or null (defaults to null)
 }


---
import { getToken } from './users-service';

export default async function sendRequest(url, method = 'GET', payload = null) {
	// Fetch takes an optional options object as the 2nd argument
	// used to include a data payload, set headers, etc.
	
	const options = { method };
	if (payload) {
		options.headers = { 'Content-Type': 'application/json' };
		options.body = JSON.stringify(payload);
	}
	const token = getToken();
	if (token) {
		// Ensure headers object exists
		options.headers = options.headers || {};
		// Add token to an Authorization header
		// Prefacing with 'Bearer' is recommended in the HTTP specification
		options.headers.Authorization = `Bearer ${token}`;
	}
	const res = await fetch(url, options);
	// res.ok will be false if the status code set to 4xx in the controller action
	if (res.ok) return res.json();
	throw new Error('Bad Request');
}

--- */