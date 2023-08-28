const express = require('express')
const router = express.Router()
const itemsCtrl = require('../../controllers/api/items')

// GET -> /api/items - get all items
router.get('/', itemsCtrl.index)

// GET -> /api/items/:id - get an item
router.get('/:id', itemsCtrl.show)

// GET -> /api/items/reviews - get all reviews for item
router.get('/reviews/:id', itemsCtrl.reviewsIndex)

// POST -> /api/items - create an item
router.post('/', itemsCtrl.create)

// PUT -> /api/items - update an item
router.put('/:id', itemsCtrl.update)

// DELETE -> /api/items/:id - delete an item
router.delete('/:id', itemsCtrl.delete)

module.exports = router