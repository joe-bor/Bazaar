const express = require('express')
const router = express.Router()
const ordersCtrl = require('../../controllers/api/orders')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// GET -> /api/orders/cart
router.get('/cart', ordersCtrl.cart)

// GET -> /api/orders/history - get order history
router.get('/history', ensureLoggedIn, ordersCtrl.history)

// POST -> /api/orders/cart/items/:id - add item to cart
router.post('/cart/items/:id', ordersCtrl.addToCart)

// POST -> /api/orders/cart/checkout - checkout cart
router.post('/cart/checkout', ensureLoggedIn, ordersCtrl.checkout)

// PUT -> /api/orders/cart/qty - change item quantity
router.put('/cart/qty', ordersCtrl.setItemQtyInCart)

// PUT -> /api/orders/status/:id - change item quantity
router.put('/status/:id', ordersCtrl.isFulfilled)

module.exports = router