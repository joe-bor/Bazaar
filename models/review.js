const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')
const { Item } = require('./item')

const reviewSchema = new Schema({
    reviewer: { type: Schema.Types.ObjectId, ref: 'User' },
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    starRating: Number,
    stringRating: String,
    feedback: String
})

module.exports = mongoose.model('Review', reviewSchema)