const express = require('express')
const router = express.Router()
const shopsCtrl = require('../../controllers/api/shops')
const { upload } = require('../../controllers/api/cloudinary')

// GET -> /api/shops - get a shop
router.get('/:id', shopsCtrl.getShop)

// POST -> /api/shops - create a shop
router.post('/', upload, shopsCtrl.createShop)

// POST -> /api/shops/:id - update a shop
router.put('/:id', upload, shopsCtrl.updateShop)

// DELETE -> /api/shops/:id - delete a shop
router.delete('/:id', shopsCtrl.deleteShop)

// POST -> /api/shops/:shopId/items (- add an item to shop
router.post('/:shopId/items', upload, shopsCtrl.addItem)

// PUT -> /api/shops/:shopId/items/:itemId - update an item in shop
router.put('/:shopId/items/:itemId', upload, shopsCtrl.updateItem)

// DELETE -> /api/shops/items/:id - delete an item from shop
router.delete('/:id/items/:itemid', shopsCtrl.deleteItem)

module.exports = router