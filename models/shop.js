const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    name: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    heroImage: { type: String, /* required: true */ },
    description: { type: String, /* required: true */ },
    rating: { type: Number, default: 0 },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
})

module.exports = mongoose.model('Shop', shopSchema)