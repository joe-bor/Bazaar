import AuthModal from '../../components/AuthModal/AuthModal'
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import styles from './App.module.scss';
import Home from '../Home/Home';
import Main from '../Users/Main';
import ItemDetails from '../Users/ItemDetails';
import Favorites from '../Users/Favorties';
import Cart from '../Users/Cart';
import Checkout from '../Users/Checkout';
import OrderHistory from '../Users/OrderHistory';
import Account from '../Users/AccountPage';
// Wireframe calls it User Profile Page, VSCode file calls it AccountPage here's the alternative
// import UserProfile from '../Users/UserProfile;
import ShopMgmt from '../Sellers/ShopManagement';
import NavBar from '../../components/navbar/navbar';
import { getUser, signUp } from '../../utilities/users-service';
import AuthModal from '../../components/AuthModal/AuthModal'


export default function App() {
  const [user, setUser] = useState(getUser())
  const [cart, setCart] = useState(null)
  const navigate = useNavigate()
  let location = useLocation()


  // auto log-in as guest user
  useEffect(() => {
    if (!user) {
      createGuestUser()
    }
  }, [])

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
      <Logo className={styles.Logo} location={location} handleLogoClick={handleLogoClick} />
      <AuthModal/>
      <Home />
      <NavBar 
        className={styles.NavBar}
        user={user}
        cart={cart}
        location={location} />
      <Routes>
        {/* client-side route that renders the component instance if the patch matches the url in the address bar */}
        <Route path="/home" element={<Home className={styles.Home} setCart={setCart} />} />
        <Route path="/main" element={<Main className={styles.Main} />} />
        <Route path="/itemdetails" element={<ItemDetails />} />
        <Route path="/account" element={<Account className={styles.AccountPage} user={user} setUser={setUser} location={location}  />} />
        <Route path="/favorites" element={<Favorites /> } />
        <Route path="/cart" element={<Cart className={styles.Cart} />} />
        <Route path="/checkout" element={<Checkout className={styles.Checkout} />} />
        <Route path="/orderhistory" element={<OrderHistory user={user} setUser={setUser} location={location} />} />
        <Route path="/sellershop" element={<SellerShop user={user} setUser={setUser} />} />
        <Route path="/shopmgmt" element={<ShopMgmt user={user} setUser={setUser} />} />
        {/* redirect to /home if path in address bar hasn't matched a <Route> above */}
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </main>
  )
}
