const Review = require('../../models/review')

async function create(req, res){
    try {
        const review = await Review.create(req.body)
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function index(req, res){
    try {
        const reviews = await Review.find({}).sort({ timestamps: -1 })
        res.status(200).json(reviews)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function update(req, res){
    try {
        const review = await Review.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function destroy(req, res){
    try {
        const review = await Review.findOne({ _id: req.params.id })
        review.deleteOne()
        res.status(200).json({ message: "item deleted"})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    create,
    index,
    update, 
    destroy
}