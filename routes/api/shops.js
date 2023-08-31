const express = require('express')
const router = express.Router()
const shopsCtrl = require('../../controllers/api/shops')
const checkToken = require('../../config/checkToken')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// GET -> /api/shops - get a shop
router.get('/:id', shopsCtrl.getShop)

// POST -> /api/shops - create a shop
router.post('/', ensureLoggedIn, checkToken, shopsCtrl.createShop)

// POST -> /api/shops/:id - update a shop
router.put('/:id', ensureLoggedIn, checkToken, shopsCtrl.updateShop)

// DELETE -> /api/shops/:id - delete a shop
router.delete('/:id', ensureLoggedIn, checkToken, shopsCtrl.deleteShop)

// POST -> /api/shops/items/:id - add an item to shop
router.post('/items/:id', ensureLoggedIn, checkToken, shopsCtrl.addItem)

// PUT -> /api/shops/items/:id - update an item in shop
router.put('/items/:id', ensureLoggedIn, checkToken, shopsCtrl.updateItem)

// DELETE -> /api/shops/items/:id - delete an item from shop
router.delete('/:id/items/:itemid', ensureLoggedIn, checkToken, shopsCtrl.deleteItem)

module.exports = router