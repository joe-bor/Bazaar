const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    item: { type: Schema.Types.ObjectId, ref: 'Item', required: true},
    starRating: { type: Number, required: true },
    review: String
}, {
    timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)