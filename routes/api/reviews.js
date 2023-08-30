const express = require('express')
const router = express.Router()
const reviewsCtrl = require('../../controllers/api/reviews')

// GET -> /api/reviews/:itemId - get all reviews for item 
router.get('/:itemId', reviewsCtrl.index)

// POST -> /api/reviews - create a review
router.post('/', reviewsCtrl.create)

// PUT -> /api/reviews/:id - update a review
router.put('/:id', reviewsCtrl.update)

// DELETE -> /api/reviews/:id - delete a review
router.delete('/:id', reviewsCtrl.delete)

module.exports = router