const Review = require('../../models/review')

async function create(req, res){
    try {
        const review = await Review.create({
            reviewer: req.user._id,
            item: req.params.itemId,
            starRating: req.body.starRating,
            review: req.body.review
        })
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function index(req, res){
    try {
        const reviews = await Review.find({ item: req.params.itemId }).sort({ timestamps: -1 })
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
        res.status(200).json({ message: "review deleted"})
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