const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    heroImage: { type: String, required: true },
    rating: { type: Number, default: 0 },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: ' User', required: true }]
})

module.exports = mongoose.module('Shop', shopSchema)