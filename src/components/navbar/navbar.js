import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.scss'
import userIcon from '../../assets/images/user-icon.svg'
import cartIcon from '../../assets/images/cart-icon.svg'
import favHeart from '../../assets/images/fav-heart.svg'
import shopIcon from '../../assets/images/shop-icon.svg'
import SearchBar from '../SearchBar/SearchBar.js'
import Logo from '../Logo/Logo'

export default function NavBar({
    categories,
    toggleAuthModal,
    filteredItems,
    setFilteredItems,
    items,
    user,
    userShop,
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
                <div className={styles.logoContainer}>
                    <Logo
                        className={styles.Logo} />
                </div>
                <div className={styles.searchbarContainer}>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        items={items}
                        filteredItems={filteredItems}
                        setFilteredItems={setFilteredItems} />
                </div>
                <div className={styles.icons}>
                    <Link to="/favorites">
                        <div>
                            <img src={favHeart} alt="heart" />
                        </div>
                    </Link>
                    {user?.name !== 'c186ec' ?
                        <Link to="/account">
                            <div>
                                <img src={userIcon} alt="user-icon" />
                            </div>
                        </Link>
                        :
                        <div onClick={toggleAuthModal}>
                            Log In
                        </div>
                    }
                    {userShop ? <Link to="/shopmgmt">
                        <div>
                            <img src={shopIcon} alt="store" />
                        </div>
                    </Link>
                        :
                        null
                    }
                    <Link to="/cart">
                        <div className={styles.cartContainer}>
                            {/* Display the cart count if items are in the cart */}
                            {cart?.length > 0 && (
                                <span className="cart-count">{cartTotals.totalItemQty}</span>
                            )}
                            <img src={cartIcon} alt="cart" />
                        </div>
                    </Link>

                    <Link to="/store">
                        <div>
                            <img src={shopIcon} alt="store" />
                        </div>
                    </Link>
                </div>
            </div>
            <div className={styles.categories}>
                <ul>
                    {categories.map((category, index) => (
                        <li className={styles.li} key={index}>
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}