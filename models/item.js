const { model } = require('mongoose')

require('./category')
require('./review')

const itemSchema = require('./itemSchema')

module.exports = model('Item', itemSchema)