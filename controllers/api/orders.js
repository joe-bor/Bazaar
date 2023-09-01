const Order = require('../../models/order');
const Item = require('../../models/item');

module.exports = {
    cart,
    addToCart,
    setItemQtyInCart,
    checkout,
    isFulfilled,
    history
};

// cart is the unpaid order for a user
async function cart(req, res) {
    try {
        const cart = await Order.getCart(req.user._id);
        res.status(200).json(cart);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}

// addToCart adds an item to the cart
async function addToCart(req, res) {
    try {
        // find all the user's unpaid orders
        const cart = await Order.getCart(req.user._id);
        // find the item being added to the cart
        const item = await Item.findById(req.params.id)
        // filter orders -> order shop = item shop
        const order = cart.filter((order) => order.shop === item.shop)
        // if order from shop doesn't exist, create one
        if (!order) {
            order = await Order.create({ user: req.user._id, shop: item.shop })
            cart.push(order)
        }
        await order.addItemToCart(req.params.id);
        res.status(200).json(cart);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}

// setItemQtyInCart updates the item quantity within the cart
async function setItemQtyInCart(req, res) {
    try {
        // find all the user's unpaid orders
        const cart = await Order.getCart(req.user._id);
        // find the item being adjusted
        const item = await Item.findById(req.params.id)
        // filter orders -> order shop = item shop
        const order = cart.filter((order) => order.shop === item.shop)

        await order.setItemQty(req.body.itemId, req.body.newQty);
        res.status(200).json(cart);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}

// isPaid updates the cart to true
async function checkout(req, res) {
    try {
        const cart = await Order.getCart(req.user._id);
        cart.forEach(async (order) => {
            order.isPaid = true
            await order.save()
        })
        res.status(200).json(cart);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}

// isFulfilled updates the cart to true
async function isFulfilled(req, res) {
    try {
        const order = await Order.getById(req.params.id);
        order.isFulfilled = true;
        await order.save();
        res.status(200).json(order);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}

// Return the logged in user's order history
async function history(req, res) {
    // Sort most recent orders first
    try {
        const orders = await Order
            .find({ user: req.user._id, isPaid: true })
            .sort('-updatedAt').exec();
        res.status(200).json(orders);
    } catch (e) {
        res.status(400).json({ msg: e.message });
    }
}