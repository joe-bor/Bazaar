const Shop = require('../../models/shop')
const Item = require('../../models/item')

/* -----shop controllers-----*/

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
        const shop = await Shop.findByIdAndUpdate(req.params.shopId, req.body, { new: true })

        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' })
          } 

        res.json(shop)
    } catch (error) {
        res.status(400).json({ error: 'Could not update shop' })
    }
}

// Get a single shop by id
exports.getShop = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.shopId)
        
        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' })
          }
        
        res.json(shop)
    } catch (error) {
        res.status(400).json({ error: 'Could not find shop' })
    }
}


// Delete a shop
exports.deleteShop = async (req, res) => {
    try {
        const shop = await Shop.findByIdAndDelete(req.params.shopId)
        
        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' })
          }

        res.json({ message: 'Shop Deleted'})
    } catch (error) {
        res.status(400).json({ error: 'Could not Delete Shop' })
    }
}


/* -----shop-item controllers-----*/
// Add an item to a shop
exports.addItem = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.ShopId)

        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' })
          }

        const newItem = await Item.create(req.body)
        shop.products.addToSet(newItem)
        await shop.save() 

        res.status(200).json(shop)
    } catch (error) {
        res.status(400).json({ error: 'Could not add item to shop' })
    }
}

// Update item to a shop
exports.updateItem = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.ShopId)

        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' })
          }

        const itemId = req.params.itemId
        const updatedItemIndex = shop.products.findIndex(item => item._id.toString() === itemId)

        if(updatedItemIndex === -1) {
            return res.status(404).json({ error: 'Item not found'})
        }

        const updatedItem = req.body
        shop.products[updatedItemIndex] = { ... shop.products[updatedItemIndex], ...updatedItem }
        await shop.save() 

        res.json(shop)
    } catch (error) {
        res.status(400).json({ error: 'Could not update item' })
    }
}

// Delete item from shop
exports.deleteItem = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.ShopId)

        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' })
          }

        const itemId = req.params.itemId
        const updatedItems = shop.products.filter(item => item._id.toString() !== itemId)
        shop.products = updatedItems
        await shop.save() 
        
        res.json({ message: 'Item deleted from shop' })
    } catch (error) {
        res.status(400).json({ error: 'Could not delete item' })
    }
}
