const mongoose = require('mongoose')

require('./category')
require('./review')

const itemSchema = require('./itemSchema')

module.exports = mongoose.model('Item', itemSchema)