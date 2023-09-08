import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import styles from './App.module.scss';
import Home from '../Home/Home';
import ShopPage from '../ShopPage/ShopPage';
import SellerShop from '../SellerShop/SellerShop';
import ItemDetails from '../ItemDetails/ItemDetails';
import Favorites from '../Favorites/Favorites';
import Cart from '../Cart/Cart';
import Checkout from '../Checkout/Checkout';
import OrderHistory from '../OrderHistory/OrderHistory';
import AccountPage from '../AccountPage/AccountPage';
// Wireframe calls it User Profile Page, VSCode file calls it AccountPage here's the alternative
// import UserProfile from '../Users/UserProfile;
import ShopMgmt from '../ShopManagement/ShopManagement';
import NavBar from '../../components/NavBar/NavBar';
import { getUser, signUp } from '../../utilities/users-service';
import AuthModal from '../../components/AuthModal/AuthModal'
import * as ItemsAPI from '../../utilities/items-api'
import * as ordersAPI from '../../utilities/orders-api'


export default function App() {
  const [user, setUser] = useState(getUser())
  const [cart, setCart] = useState([])
  const [items, setItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [cartTotals, setCartTotals] = useState({
    totalItemQty: 0,
    totalPrice: 0
  })
  const navigate = useNavigate()
  let location = useLocation()


  // auto log-in as guest user
  useEffect(() => {
    if (!user) {
      createGuestUser()
    }
    async function getItems() {
      const allItems = await ItemsAPI.getAll()
      console.log(allItems)
      setItems(allItems)
    }
    getItems()
  }, [])


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
    setUser(guestUser)
  }

  // clicking on logo takes you home
  function handleLogoClick() {
    navigate('/home')
  }


  return (
    <main className={styles.App}>
      <AuthModal />
      <NavBar
        filteredItems={filteredItems}
        setFilteredItems={setFilteredItems}
        items={items}
        className={styles.NavBar}
        user={user}
        cart={cart}
        location={location}
        cartTotals={cartTotals} />
      <Routes>
        {/* client-side route that renders the component instance if the patch matches the url in the address bar */}
        <Route path="/home" element={<Home items={items} className={styles.Home} setCart={setCart} />} />
        <Route path="/shop" element={<ShopPage className={styles.ShopPage} items={items} />} />
        <Route path="/itemdetails/:itemId" element={<ItemDetails setCart={setCart} />} />
        <Route path="/account" element={<AccountPage className={styles.AccountPage} user={user} setUser={setUser} location={location} />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart className={styles.Cart} cart={cart} setCart={setCart} cartTotals={cartTotals} />} />
        <Route path="/checkout" element={<Checkout className={styles.Checkout} cart={cart} setCart={setCart} cartTotals={cartTotals} />} />
        <Route path="/orderhistory" element={<OrderHistory user={user} setUser={setUser} location={location} cartTotals={cartTotals} />} />
        <Route path="/sellershop" element={<SellerShop user={user} setUser={setUser} />} />
        <Route path="/shopmgmt" element={<ShopMgmt user={user} setUser={setUser} />} />
        {/* redirect to /home if path in address bar hasn't matched a <Route> above */}
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </main>
  )
}
