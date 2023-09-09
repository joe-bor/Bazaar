import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.scss'
import userIcon from '../../assets/images/user-icon.svg'
import cartIcon from '../../assets/images/cart-icon.svg'
import favHeart from '../../assets/images/fav-heart.svg'
import shopIcon from '../../assets/images/shop-icon.svg'


import SearchBar from '../SearchBar/SearchBar.js'

export default function NavBar({
    categories,
    toggleAuthModal,
    filteredItems,
    setFilteredItems,
    items,
    user,
    setUser,
    cart,
    setCart,
    setItems,
    activeCat,
    setActiveCat,
    searchTerm,
    setSearchTerm,
    setCategories,
    cartTotals

}) {
  
    return (
        <nav className={styles.NavBar}>
            <div className={styles.topLine}>
                <div className="navbar-logo">
                    <Link to="/">
                        <img src="./img/logo.png" alt="logo" />
                    </Link>
                </div>
                <div className="navbar-search">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
            </div>
            <div className={styles.categories}>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index}>
                           {category}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-icons">
                <Link to="/favorites">
                    <div>
                        <i className="heart"></i>
                        <img src={favHeart} alt="heart" />
                    </div>
                </Link>
                <Link to="/cart">
                    <div>
                        <i className="cart"></i>
                        <img src={cartIcon} alt="cart" />
                        {/* Display the cart count if items are in the cart */}
                        {cart?.length > 0 && (
                            <span className="cart-count">{cartTotals.totalItemQty}</span>
                        )}
                    </div>
                </Link>
                <Link to="/store">
                    <div>
                        <i className="store"></i>
                        <img src={shopIcon} alt="store" />
                    </div>
                </Link>
                <div className="navbar-user">
                    {user.name !== 'c186ec' ? (
                        //Display user profile info if logged in
                        <>
                            <img src={user.profileImage ? user.profileImage : userIcon} alt="Profile" />
                            <span>{user.name}</span>
                            <Link to="/logout">Logout</Link>
                        </>
                    ) : (
                        //Display user profile info if logged in
                        <>
                            <div onClick={toggleAuthModal}>Log In</div>
                        </>

                    )}
                </div>
            </div>
        </nav>
    )
}