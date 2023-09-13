const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Item = require('../../models/item')

// Middleware function to check user's token
const checkToken = (req, res) => {
    console.log('req.user', req.user)
    res.json(req.exp)
}

// Controllers for handling user data
const dataController = {
    async create(req, res, next) {
        try {
            // Set users image URL if available
            if (res.locals.imageData) {
                req.body.imageUrl = res.locals.imageData.secure_url
            }
            // Create a new user in the database
            const user = await User.create(req.body)
            //Generate a JWT Token for the user
            const token = createJWT(user)
            // Prepare response data with user and token
            res.locals.data.user = user
            res.locals.data.token = token
            next()
        } catch (error) {
            console.log('you got a database problem')

            res.status(400).json({message: error.message})

        }
    },
    async login(req, res, next) {
        try {
            // Find a user by their email
            const user = await User.findOne({ email: req.body.email })
            if (!user) throw new Error()
            // Compare the provided password with the users stored password
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) throw new Error()
            // Prepare response data with user and token
            res.locals.data.user = user
            res.locals.data.token = createJWT(user)
            next()
        } catch (error) {
            res.status(400).json('Your credentials be whack')
        }
    },

    async update(req, res, next) {
        try {
            // Set users image URL if available
            if (res.locals.imageData) {
                req.body.imageUrl = res.locals.imageData.secure_url
            }
            // Find and update a user by their ID
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (!user) throw new Error('User not found')
            // Prepare response data with updated user by and token
            res.locals.data.user = user
            res.locals.data.token = createJWT(user)
            next()
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    async destroy(req, res) {
        try {
            // Find and delete a user by their ID
            const user = await User.findOne({ _id: req.params.id })
            await user.deleteOne()
            if (!user) throw new Error('User not found')
            res.status(200).json({ message: 'user deleted' })
        } catch (error) {
            res.status(400).json('User NOT Deleted')
        }
    },
    async toggleFavorites(req, res, next) {
        try {
            // Find a user by their ID
            const user = await User.findOne({ _id: req.params.id })
            // Find an item by its ID
            const item = await Item.findOne({ _id: req.body.itemId })
            // Toggle item in users favorites
            user.favorites.includes(item._id) ? user.favorites.pull(item._id) : user.favorites.addToSet(item._id)
            await user.save()
            // Prepare response data with user and token
            res.locals.data.user = user
            res.locals.data.token = createJWT(user)
            next()
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    async getFavorites(req, res) {
        try {
            // Find a user and populate their favorites
            const user = await User.findById(req.params.id).populate('favorites').exec()
            // Get all items in the user's favorites
            const items = user.favorites
            // Respond with the favorite items
            res.json(items)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

// Controller for handling API authentication  
const apiController = {
    auth(req, res) {
        res.json(res.locals.data.token)
    }
}

module.exports = {
    checkToken,
    dataController,
    apiController
}

// helper functions
function createJWT(user) {
    return jwt.sign(
        //data payload
        { user },
        process.env.SECRET,
        { expiresIn: '72h' }
    )
}