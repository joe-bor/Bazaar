const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Item = require('../../models/item')

const checkToken = (req, res) => {
    console.log('req.user', req.user)
    res.json(req.exp)
}

const dataController = {
    async create(req, res, next) {
        try {
            if (res.locals.imageData) {
                req.body.imageUrl = res.locals.imageData.secure_url
            }
            const user = await User.create(req.body)
            //token will be a string
            const token = createJWT(user)
            // send back the token as a string
            // which we need to account for 
            // in the client
            res.locals.data.user = user
            res.locals.data.token = token
            next()
        } catch (error) {
            console.log('you got a database problem')
            res.status(400).json( {message: error.message} )
        }
    },
    async login(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) throw new Error()
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) throw new Error()
            res.locals.data.user = user
            res.locals.data.token = createJWT(user)
            next()
        } catch (error) {
            res.status(400).json('Your credentials be whack')
        }
    },

    async update(req, res, next) {
        try {
            if (res.locals.imageData) {
                req.body.imageUrl = res.locals.imageData.secure_url
            }
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (!user) throw new Error('User not found')
            res.locals.data.user = user
            res.locals.data.token = createJWT(user)
            next()
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    async destroy(req, res) {
        try {
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
            const user = await User.findOne({ _id: req.params.id })
            const item = await Item.findOne({ _id: req.body.itemId })
            user.favorites.includes(item._id) ? user.favorites.pull(item._id) : user.favorites.addToSet(item._id)
            await user.save()
            res.locals.data.user = user
            res.locals.data.token = createJWT(user)
            next()
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    },
    async getFavorites(req, res) {
        try {
            // find user
            const user = await User.findById(req.params.id).populate('favorites').exec()
            // find all items in the user's favorites
            const items = user.favorites
            // return the items
            res.json(items)
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
}

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