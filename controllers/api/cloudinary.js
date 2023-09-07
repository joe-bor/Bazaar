const cloudinary = require('../../config/cloudinary')

async function upload(req, res, next) {
    try {
        if (!file) { next() } 
        const cloudinaryImageData = await cloudinary.uploader.upload(
            file, 
            { public_id: req.body.publicId }, 
            (result) =>  result 
        )
        console.log(cloudinaryImageData)
        req.body.imageUrl = cloudinaryImageData.secure_url
        next()
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { upload }