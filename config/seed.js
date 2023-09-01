require('dotenv').config();
require('./database');

const Category = require('../models/category');
const User = require('../models/user');
const Shop = require('../models/shop')
const Item = require('../models/item');

(async function () {

  await Category.deleteMany({});
  const categories = await Category.create([
    { name: 'smartphones', sortOrder: 10 },
    { name: 'fragrances', sortOrder: 20 },
    { name: 'groceries', sortOrder: 30 },
    { name: 'furniture', sortOrder: 40 },
    { name: 'womens-dresses', sortOrder: 50 },
    { name: 'mens-shirts', sortOrder: 60 },
    { name: 'mens-watches', sortOrder: 70 },
    { name: 'womens-bags', sortOrder: 80 },
    { name: 'sunglasses', sortOrder: 90 },
    { name: 'motorcycle', sortOrder: 100 },
    { name: 'laptops', sortOrder: 110 },
    { name: 'skincare', sortOrder: 120 },
    { name: 'home-decoration', sortOrder: 130 },
    { name: 'tops', sortOrder: 140 },
    { name: 'womens-shoes', sortOrder: 150 },
    { name: 'mens-shoes', sortOrder: 160 },
    { name: 'womens-watches', sortOrder: 170 },
    { name: 'womens-jewellery', sortOrder: 180 },
    { name: 'automotive', sortOrder: 190 },
    { name: 'lighting', sortOrder: 200 },
  ]);

  /* ----- Creating Users ----- */
  await User.deleteMany({})
  const users = [
    {
      name: 'Test User 1',
      email: 'test@user1',
      password: 'testPass1'
    },
    {
      name: 'Test User 2',
      email: 'test@user2',
      password: 'testPass2'
    },
    {
      name: 'Test User 3',
      email: 'test@user3',
      password: 'testPass3'
    },
    {
      name: 'Test User 4',
      email: 'test@user4',
      password: 'testPass4'
    }
  ]

  for (const user of users) {
    await User.create(user)
  }


  /* ----- Creating Shops for each Users ----- */
  await Shop.deleteMany({})
  const signedUpUsers = await User.find({ email: { $in: ['test@user1', 'test@user2', 'test@user3', 'test@user4'] } })

  const signedUpUsersIds = [] // to be used for querying the shops

  for (const user of signedUpUsers) {
    signedUpUsersIds.push(user._id)
    let shop = await Shop.create({
      name: `${user.name}'s shop`,
      seller: user._id,
      heroImage: 'img path'
    })

    user.shop = shop._id
    await user.save()
  }

  /* ----- Populating the shops with items -----  */

  // now we fetch the items from the external api
  // clean it up to fit the shape of our models
  // push them into each of the user's shops
  await Item.deleteMany({})
  const products = await fetchData('https://dummyjson.com/products?limit=100');

  const itemsForTheShops = products.map(product => {
    const foundCategory = categories.find(category => category.name === product.category)

    return {
      name: product.title,
      price: product.price,
      description: product.description,
      category: foundCategory._id,
      images: product.images //this is an array
    };
  });

  const shops = await Shop.find({ seller: { $in: signedUpUsersIds } })

  //! promise.all instead?
  for (let i = 0; i < itemsForTheShops.length; i++) {

    const item = await Item.create({ ...itemsForTheShops[i], shop: shops[i % shops.length]._id })
    shops[i % shops.length].products.push(item._id)
  }

  for (const shop of shops) {
    await shop.save()
  }

  process.exit();

})();


async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const data = await response.json();
    return data.products;

  } catch (error) {
    console.error('Fetch error:', error);
    throw error
  }
}