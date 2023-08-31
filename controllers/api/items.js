const Item  = require('../../models/item')
const Category = require('../../models/category')

module.exports = {
    index, 
    show, 
    create,
    update,
    destroy
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
        const item = await Item.findById(req.params.id)
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function create(req, res) {
    try {
        const category = await Category.findOne({ name: req.body.category })
        console.log('category = ' + category)
        const item = await Item.create({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: category._id
        })
        return item
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function update(req, res) {
    try {
        const item = await Item.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true })
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function destroy(req, res) {
    try {
        const item = await Item.findOne({ _id: req.params.id })
        await item.deleteOne()
        res.status(200).json({ message: `item deleted`})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}