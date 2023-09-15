require('dotenv').config();
require('./database');

const Category = require('../models/category');

(async function() {

    await Category.deleteMany({});
    const categories = await Category.create([
        {name: 'smartphones', sortOrder: 10},
        {name: 'fragrances', sortOrder: 20},
        {name: 'groceries', sortOrder: 30},
        {name: 'furniture', sortOrder: 40},
        {name: 'womens-dresses', sortOrder: 50},
        {name: 'mens-shirts', sortOrder: 60},
        {name: 'mens-watches', sortOrder: 70},
        {name: 'womens-bags', sortOrder: 80},
        {name: 'sunglasses', sortOrder: 90},
        {name: 'motorcycle', sortOrder: 100},
        {name: 'laptops', sortOrder: 110},
        {name: 'skincare', sortOrder: 120},
        {name: 'home-decoration', sortOrder: 130},
        {name: 'tops', sortOrder: 140},
        {name: 'womens-shoes', sortOrder: 150},
        {name: 'mens-shoes', sortOrder: 160},
        {name: 'womens-watches', sortOrder: 170},
        {name: 'womens-jewellery', sortOrder: 180},
        {name: 'automotive', sortOrder: 190},
        {name: 'lighting', sortOrder: 200},
    ]);
})()