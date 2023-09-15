import sendRequest from './send-request';

const BASE_URL = '/api/reviews';

/* ---
    This assumes Review model will have it's own methods invoked
    when the routes are pinged
--- */

export function createReview(review) {
    return sendRequest(BASE_URL, "POST", review)
}

export function getItemReviews(itemId) {
    return sendRequest(`${BASE_URL}/${itemId}`)
}

export function updateItemReview(reviewId, updatedReview) {
    return sendRequest(`${BASE_URL}/${reviewId}`, 'PUT', updatedReview )
}

export function deleteReview(reviewId) {
    return sendRequest(`${BASE_URL}/${reviewId}`, 'DELETE')
}




// Update the item's qty in the cart
// Will add the item to the order if not currently in the cart
// Sending info via the data payload instead of a long URL
export function setItemQtyInCart(itemId, newQty) {
	return sendRequest(`${BASE_URL}/cart/qty`, 'PUT', { itemId, newQty });
}

// Updates the order's (cart's) isPaid property to true
export function checkout() {
	// Changing data on the server, so make it a POST request
	return sendRequest(`${BASE_URL}/cart/checkout`, 'POST');
}

// Return all paid orders for the logged in user
export function getOrderHistory() {
	return sendRequest(`${BASE_URL}/history`);
}