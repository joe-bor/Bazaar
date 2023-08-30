const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const checkToken = (req, res) => {
    console.log('req.user', req.user)
    res.json(req.exp)
}

const dataController = {
    async create (req, res, next) {
        try {
            const user = await User.create(req.body)
            console.log(req.body)
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
            res.status(400).json(e)
        }
    },
    async login (req, res, next ) {
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

    async update (req, res, next) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
            if (!user) throw new Error('User not found')
            res.locals.data.user = user
            next()
        } catch (error) {
            res.status(400).json('Was not able to update user info')
        }
    },
    async delete (req, res, next) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            if (!user) throw new Error('User not found')
            res.local.data.user = user
            next()
        } catch (error) {
            res.status(400).json('User NOT Deleted')
        }
    }
}

const apiController = {
    auth (req, res) {
        res.json(res.locals.data.token)
    }
}

module.exports = {
    checkToken,
    dataController,
    apiController
}

// helper functions
function createJWT (user) {
    return jwt.sign(
        //data payload
        { user },
        process.env.SECRET,
        { expiresIn: '72h'}
    )
}