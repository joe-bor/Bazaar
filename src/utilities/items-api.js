import sendRequest from './send-request';

const BASE_URL = '/api/items';

export function createItem(itemInfo) {
    return sendRequest(BASE_URL, 'POST', itemInfo)
}

export function getAll() {
	return sendRequest(BASE_URL);
}

export function getById(id) {
	return sendRequest(`${BASE_URL}/${id}`);
}

export function editItemInfo(id, newInfo) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', newInfo)
}

export function deleteItem(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}

export function getItemReviews(id) {
    return sendRequest(`${BASE_URL}/reviews/${id}`)
}

