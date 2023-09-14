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


    // clicking on logo takes you home
    function handleLogoClick() {
        navigate('/home')
    }

    return (
        <nav className={styles.NavBar}>
            <div className={styles.topLine}>
                <div className={styles.logoContainer}>
                    <Logo
                        className={styles.Logo}
                        onClick={handleLogoClick} />
                </div>
                <div className={styles.searchbarContainer}>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        items={items}
                        filteredItems={filteredItems}
                        setFilteredItems={setFilteredItems} />
                </div>
            </div>
            <div className={styles.catsAndIcons}>
                <div className={styles.categories}>
                    <ul>
                        {categories.map((category, index) => (
                            <li className={styles.li} key={index}>
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.icons}>
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

                </div>
            </div>
        </nav>
    )
}