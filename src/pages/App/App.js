import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import styles from './App.module.scss'
import Home from '../Home/Home'
import ShopPage from '../ShopPage/ShopPage'
import SellerShop from '../SellerShop/SellerShop'
import ItemDetails from '../ItemDetails/ItemDetails'
import Favorites from '../Favorites/Favorites'
import Cart from '../Cart/Cart'
import Checkout from '../Checkout/Checkout'
import OrderHistory from '../OrderHistory/OrderHistory'
import AccountPage from '../AccountPage/AccountPage'
import ShopMgmt from '../ShopManagement/ShopManagement'
import NavBar from '../../components/NavBar/NavBar'
import { getUser, signUp } from '../../utilities/users-service'
import AuthModal from '../../components/AuthModal/AuthModal'
import * as ItemsAPI from '../../utilities/items-api'
import * as ordersAPI from '../../utilities/orders-api'
import * as usersAPI from '../../utilities/users-api'
import { getShop } from '../../utilities/shops-api'


export default function App() {
  const [user, setUser] = useState(getUser())
  const [cart, setCart] = useState([])
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [activeCat, setActiveCat] = useState('')
  const [cartTotals, setCartTotals] = useState({
    totalItemQty: 0,
    totalPrice: 0
  })
  const [userShop, setUserShop] = useState({
    name: 'Loading...',
    seller: {},
    description: 'Loading...',
    products: []
  })
  const [favItems, setFavItems] = useState([])

  const categoriesRef = useRef([])

  const navigate = useNavigate()
  let location = useLocation()


  // auto log-in as guest user
  useEffect(() => {
    if (!user) {
      createGuestUser()
    } else {
      getItems()
      if (user?.shop) {
        async function retrieveShop() {
          const shop = await getShop(user.shop)
          setUserShop(shop)
        }
        retrieveShop()
      }
    }
  }, [user])

  async function getItems() {
    const allItems = await ItemsAPI.getAll()
    categoriesRef.current = allItems.reduce((cats, item) => {
      const cat = item.category.name
      return cats.includes(cat) ? cats : [...cats, cat]
    }, [])
    categoriesRef.current.unshift('Show All')
    setItems(allItems)
    setActiveCat(categoriesRef.current[0])
    setFilteredItems(allItems) // for search bar
  }

  const toggleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen)
  }

  // automatically retreive cart
  useEffect(() => {
    async function getCartItems() {
      const cart = await ordersAPI.getCart()
      setCart(cart)
    }
    getCartItems()
  }, [])

  // automatically update cart totals when cart state updates
  useEffect(() => {
    let totals = cart.reduce((acc, order) => {
      acc.totalItemQty ? acc.totalItemQty += order.totalQty : acc.totalItemQty = order.totalQty
      acc.totalPrice ? acc.totalPrice += order.orderTotal : acc.totalPrice = order.orderTotal
      return acc
    }, {})
    setCartTotals(totals)
  }, [cart])


  // automatically retrieve user's favorites
  useEffect(() => {
    if (user) {
      async function getFavItems() {
        const favorites = await usersAPI.getFavorites(user._id)
        setFavItems(favorites)
      }
      getFavItems()
    }
  }, [user])


  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false)
    console.log('handleCloseAuthModal')
  }

  async function createGuestUser() {
    const guestUserData = {
      // random email generated
      email: Math.round(Math.random() * 100000000) + '@guest',
      // assign guest name
      name: 'c186ec',
      // set guest password
      password: 'guestpass'
    }
    localStorage.setItem('guest', guestUserData.email)
    const guestUser = await signUp(guestUserData)
    // set user to newly created guest user
    items.length > 0 ? null : getItems()
    setUser(guestUser)
  }


  return (
    <main className={styles.App}>
      <AuthModal
        setUser={setUser}
        isAuthModalOpen={isAuthModalOpen}
        toggleAuthModal={toggleAuthModal}
        handleCloseAuthModal={handleCloseAuthModal}
      />
      <NavBar
        className={styles.NavBar}
        categories={categoriesRef.current}
        toggleAuthModal={toggleAuthModal}
        filteredItems={filteredItems}
        setFilteredItems={setFilteredItems}
        items={items}
        user={user}
        userShop={userShop}
        cart={cart}
        location={location}
        cartTotals={cartTotals}
        createGuestUser={createGuestUser} />
      <Routes>
        {/* client-side route that renders the component instance if the patch matches the url in the address bar */}
        <Route path="/home" element={<Home items={items} className={styles.Home} categories={categoriesRef.current} setActiveCat={setActiveCat} setCart={setCart} favItems={favItems} setFavItems={setFavItems} />} />
        <Route path="/shop" element={<ShopPage className={styles.ShopPage} items={items} user={user} setUser={setUser} activeCat={activeCat} setActiveCat={setActiveCat} categories={categoriesRef.current} filteredItems={filteredItems} setFilteredItems={setFilteredItems} favItems={favItems} setFavItems={setFavItems} />} />
        <Route path="/itemdetails/:itemId" element={<ItemDetails setCart={setCart} favItems={favItems} setFavItems={setFavItems} user={user} setUser={setUser} />} />
        <Route path="/account" element={<AccountPage className={styles.AccountPage} user={user} setUser={setUser} createGuestUser={createGuestUser} userShop={userShop} setUserShop={setUserShop} favItems={favItems} setFavItems={setFavItems} />} />
        <Route path="/favorites" element={<Favorites user={user} setUser={setUser} favItems={favItems} setFavItems={setFavItems} />} />
        <Route path="/cart" element={<Cart className={styles.Cart} cart={cart} setCart={setCart} cartTotals={cartTotals} />} />
        <Route path="/checkout" element={<Checkout className={styles.Checkout} cart={cart} setCart={setCart} cartTotals={cartTotals} />} />
        <Route path="/orderhistory" element={<OrderHistory user={user} setUser={setUser} />} />
        <Route path="/sellershop/:shopId" element={<SellerShop user={user} setUser={setUser} favItems={favItems} setFavItems={setFavItems} />} />
        <Route path="/shopmgmt/:shopId" element={<ShopMgmt categories={categoriesRef.current} user={user} setUser={setUser} userShop={userShop} setUserShop={setUserShop} />} />
        {/* redirect to /home if path in address bar hasn't matched a <Route> above */}
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </main>
  )
}
