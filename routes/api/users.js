const express = require('express')
const router = express.Router()
const { checkToken, dataController, apiController } = require('../../controllers/api/users')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

// POST -> /api/users - Create a user
router.post('/', dataController.create, apiController.auth)

// POST -> /api/users/login - Login User
router.post('/login', dataController.login, apiController.auth)

// GET -> /api/users/check-token - Verify User Authentication
router.get('/check-token', ensureLoggedIn, checkToken)

// PUT -> /api/users/:id - update User info
router.put('/:id', dataController.update, apiController.auth)

// Delete -> /api/users/:id - delete user account
router.delete('/:id', dataController.destroy)

module.exports = router