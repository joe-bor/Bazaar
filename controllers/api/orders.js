const Order = require('../../models/order');

module.exports = {
    cart,
    addToCart,
    setItemQtyInCart,
    checkout,
    history
};

// cart is the unpaid order for a user
async function cart(req, res) {
    try{
        const cart = await Order.getCart(req.user._id);
        res.status(200).json(cart);
    }catch(e){
        res.status(400).json({ msg: e.message });
    }
}

// addToCart adds an item to the cart
async function addToCart(req, res) {
    try {
        const cart = await Order.getCart(req.user._id);
        await cart.addItemToCart(req.params.id);
        res.status(200).json(cart);
    }catch(e){
        res.status(400).json({ msg: e.message });
    }
}

// setItemQtyInCart updates the item quantity within the cart
async function setItemQtyInCart(req, res) {
    try{
        const cart = await Order.getCart(req.user._id);
        await cart.setItemQty(req.body.itemId, req.body.newQty);
        res.status(200).json(cart);
    }catch(e){
        res.status(400).json({ msg: e.message });
    }
}

// isPaid updates the cart to true
async function checkout(req, res) {
    try{
        const cart = await Order.getCart(req.user._id);
        cart.isPaid = true;
        await cart.save();
        res.status(200).json(cart);
    }catch(e){
        res.status(400).json({ msg: e.message });
    }
}

// isFulfilled updates the cart to true
async function isFulfilled(req, res) {
    try{
        const cart = await Order.getCart(req.user._id);
        cart.isFulfilled = true;
        await cart.save();
        res.status(200).json(cart);
    }catch(e){
        res.status(400).json({ msg: e.message });
    }
}

// Return the logged in user's order history
async function history(req, res) {
    // Sort most recent orders first
    try{
        const orders = await Order
            .find({ user: req.user._id, isPaid: true })
            .sort('-updatedAt').exec();
        res.status(200).json(orders);
    }catch(e){
        res.status(400).json({ msg: e.message });
    }
}