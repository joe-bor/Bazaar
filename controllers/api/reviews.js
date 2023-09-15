const Review = require('../../models/review')
const Item = require('../../models/item')


//Defines a new review and associates it with an item
async function create(req, res){
    try {
        //Creates a new review in the database
        const review = await Review.create({
            reviewer: req.user._id,
            item: req.params.itemId,
            starRating: req.body.starRating,
            review: req.body.review
        })

        // Find the item related to the review and adds it to the review array
        const item = await Item.findById(req.params.itemId)
        item.reviews.addToSet(review)
        await item.save()

        // Respond with the created review
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Retrieve all reviews associated with a specific item
async function index(req, res){
    try {
        //Find and sort reviews in decending order
        const reviews = await Review.find({ item: req.params.itemId }).sort({ timestamps: -1 })

        // Respond with the list of reviews
        res.status(200).json(reviews)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update a specific review by its ID
async function update(req, res){
    try {
        // Find and update the review with the provided ID
        const review = await Review.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })

        // Respond with the updated review
        res.status(200).json(review)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Delete a specific review by its ID
async function destroy(req, res){
    try {
        //Find and delete the review with the provided ID
        const review = await Review.findOne({ _id: req.params.id })
        review.deleteOne()
        //Respond with a success message
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