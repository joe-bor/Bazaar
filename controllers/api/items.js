const Item = require('../../models/item')

module.exports = {
    index,
    show,
    returnReviews
}

async function index(req, res) {
    try {
        const items = await Item.find({}).sort('name').populate('category').exec()
        items.sort((a, b) => a.category.sortOrder - b.category.sortOrder)
        res.status(200).json(items)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function show(req, res) {
    try {
        const item = await Item.findById(req.params.id).populate({ path: 'shop', select: 'name' }).exec()
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function returnReviews(req, res) {
    try {
        const item = await Item.findById(req.params.id)
        res.status(200).json(item.reviews)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}