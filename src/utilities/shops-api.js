import sendRequest from './send-request';

const BASE_URL = '/api/shops';

export function createShop(shopInfo) {
    return sendRequest(BASE_URL, 'POST', shopInfo)
}

export function editShopInfo(id, newInfo) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', newInfo)
}

export function deleteShop(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}

export function getShop(id) {
    return sendRequest(`${BASE_URL}/${id}`)
}

//! Double check this when ShopModel has been implemented
export function addItemToShop(itemId) {
    return sendRequest(`${BASE_URL}/items/${itemId}`, 'POST')
}

//! Double check this when ShopModel has been implemented
export function removeItemFromShop(itemId) {
    return sendRequest(`${BASE_URL}/items/${itemId}`, 'DELETE')
}