const express = require('express')
const router = express.Router()
const shopsCtrl = require('../../controllers/api/shops')

// GET -> /api/shops - get a shop
router.get('/:id', shopsCtrl.getShop)

// POST -> /api/shops - create a shop
router.post('/', shopsCtrl.createShop)

// POST -> /api/shops/:id - update a shop
router.put('/:id', shopsCtrl.updateShop)

// DELETE -> /api/shops/:id - delete a shop
router.delete('/:id', shopsCtrl.deleteShop)

// POST -> /api/shops/items/:id - add an item to shop
router.post('/items/:id', shopsCtrl.addItem)

// PUT -> /api/shops/items/:id - update an item in shop
router.put('/items/:id', shopsCtrl.updateItem)

// DELETE -> /api/shops/items/:id - delete an item from shop
router.delete('/items/:id', shopsCtrl.deleteItem)

module.exports = router