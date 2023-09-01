const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = require('./itemSchema')

const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    item: itemSchema
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

lineItemSchema.virtual('extPrice').get(function () {
    return this.qty * this.item.price
})

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    shop: { type: Schema.Types.ObjectId, ref: 'Shop' },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false },
    isFulfilled: { type: Boolean, default: false }
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

orderSchema.virtual('orderTotal').get(function () {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0)
})

orderSchema.virtual('totalQty').get(function () {
    return this.lineItems.reduce((total, item) => total + item.qty, 0)
})

orderSchema.virtual('orderId').get(function () {
    return this.id.slice(-6).toUpperCase()
})

orderSchema.statics.getCart = function (userId) {
    // find all unpaid orders
    const cart = this.find({ user: userId, isPaid: false })
    // if no orders exist, create a new order
    if (!cart) {
        cart = this.create({ user: userId })
    }

    return cart
}

orderSchema.methods.addItemToCart = async function (itemId) {
    const order = this
    // check if the item is already in the cart
    const lineItem = order.lineItems.find(lineItem => lineItem.item._id.equals(itemId))
    if (lineItem) {
        lineItem.qty += 1
    } else {
        const item = await mongoose.model('Item').findById(itemId)
        order.lineItems.push({ item })
    }
    return order.save()
}

// method to set an item's quantity within the cart (adds an item if it doesn't exist)
orderSchema.methods.setItemQty = function (itemId, newQty) {
    // this is attached to the cart (order doc)
    const order = this
    // Finds the line item in the cart for the item
    const lineItem = order.lineItems.find(lineItem => lineItem.item._id.equals(itemId))
    if (lineItem && newQty <= 0) {
        // Calling deleteOne(), deletes itself from the cart.lineItems array
        lineItem.deleteOne()
    } else if (lineItem) {
        // Set new qty
        lineItem.qty = newQty
    }
    // returns the save() method's promise
    return order.save()
}

module.exports = mongoose.model('Order', orderSchema)