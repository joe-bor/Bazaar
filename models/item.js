const { model } = require('mongoose')

require('./category')
require('./review')

const itemSchema = require('./itemSchema')
const Item = model('Item', itemSchema)

module.exports = {
    itemSchema, 
    Item: Item
}