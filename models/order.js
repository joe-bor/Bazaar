const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = require('./itemSchema')

// Define the line item Schema
const lineItemSchema = new Schema({
    qty: { type: Number, default: 1 },
    item: itemSchema
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

// Virtural field to calculate the extended price of a line item
lineItemSchema.virtual('extPrice').get(function () {
    return this.qty * this.item.price
})

// Define the order Schema
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

// Virtual field to calculate the total order amount
orderSchema.virtual('orderTotal').get(function () {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0)
})


// Virtual field to calculate the total quantity of items in order
orderSchema.virtual('totalQty').get(function () {
    return this.lineItems.reduce((total, item) => total + item.qty, 0)
})

// Virtual field to generate a custom order ID
orderSchema.virtual('orderId').get(function () {
    return this.id.slice(-6).toUpperCase()
})

// Static method to get the users shopping cart
orderSchema.statics.getCart = function (userId) {
    // Find all unpaid orders
    const cart = this.find({ user: userId, isPaid: false }).populate({ path: 'shop', select: 'name' }).exec()
    // If no car exists, create a new order
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
        // Find the item by its ID and add it to the cart
        const item = await mongoose.model('Item').findById(itemId)
        order.lineItems.push({ item })
    }
    return order.save()
}

// Method to set an item's quantity within the cart (adds an item if it doesn't exist)
orderSchema.methods.setItemQty = function (itemId, newQty) {
    const order = this
    const lineItem = order.lineItems.find(lineItem => lineItem.item._id.equals(itemId))
    if (lineItem && newQty <= 0) {
        // If new qty is 0 or negative, remove it from the cart
        lineItem.deleteOne()
    } else if (lineItem) {
        // Set new qty
        lineItem.qty = newQty
    }
    // returns the save() method's promise
    return order.save()
}

module.exports = mongoose.model('Order', orderSchema)