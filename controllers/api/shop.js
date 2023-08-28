const Shop = require('../models/shop');

// Create a new shop
exports.createShop = async (req, res) => {
  try {
    const newShop = await Shop.create({
        seller: req.user._id,
        heroImage: req.body.heroImage,
        rating: 0,
        products: [],
    })
    res.status(200).json(newShop)
  } catch (error) {
    res.status(400).json({ error: 'Could not create Shop' })
  }
}

// Update a shop
exports.updateShop = async (req, res) => {
    try {
        const shop = await Shop.findByIdAndUpdate(req.params.shopId)

        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
          } 

        shop.seller = req.user._id
        shop.heroImage = req.body.heroImage
        const updatedShop = await shop.save()
        res.json(updatedShop)
    } catch (error) {
        res.status(400).json({ error: 'Could not update shop' })
    }
}

// Get a sigle shop by id
exports.getShop = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.shopId)
        
        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
          }
        
        res.json(shop)
    } catch (error) {
        res.status(400).json({ error: 'Could not find shop' })
    }
}


// Delete a shop
exports.deleteShop = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.shopId)
        
        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
          }

        res.json({ mesage: 'Shop Deleted'})
    } catch (error) {
        res.status(400).json({ error: 'Could not Delete Shop' })
    }
}
