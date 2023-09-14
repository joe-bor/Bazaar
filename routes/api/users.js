const express = require('express')
const router = express.Router()
const { checkToken, dataController, apiController } = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')
const { upload } = require('../../controllers/api/cloudinary')

// POST -> /api/users - Create a user
router.post('/', upload, dataController.create, apiController.auth)

// POST -> /api/users/login - Login User
router.post('/login', dataController.login, apiController.auth)

// GET -> /api/users/check-token - Verify User Authentication
router.get('/check-token', ensureLoggedIn, checkToken)

// PUT -> /api/users/:id - update User info
router.put('/:id', upload, dataController.update, apiController.auth)

// Delete -> /api/users/:id - delete user account
router.delete('/:id', dataController.destroy)

// GET -> /api/users/:id/favorites - get user's favorites
router.get('/:id/favorites', dataController.getFavorites)

// PUT -> /api/users/:id/favorites - add an item to favorites
router.put('/:id/favorites', dataController.toggleFavorites, apiController.auth)

module.exports = router