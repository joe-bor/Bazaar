const cloudinary = require('../../config/cloudinary')

async function upload(req, res, next) {
    try {
        // console.log(req)
        console.log(req.files)
        if (!req.files) { return next() }
        await cloudinary.uploader.upload(
            req.files.file,
            {},
            (err, result) => {
                if (err) {
                    return res.status(400).json({ message: err.message })
                } else {
                    console.log(result.secure_url)
                    res.locals.imageData = result
                    return next()
                }
            }
        )
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { upload }