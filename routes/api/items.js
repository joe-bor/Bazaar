const express = require('express')
const router = express.Router()
const itemsCtrl = require('../../controllers/api/items')

// GET -> /api/items - get all items
router.get('/', itemsCtrl.index)

// GET -> /api/items/:id - get an item
router.get('/:id', itemsCtrl.show)

// GET -> /api/items/reviews - get all reviews for item
router.get('/reviews/:id', itemsCtrl.index)

module.exports = router