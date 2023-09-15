import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
    cart,
    searchTerm,
    setSearchTerm,
    cartTotals,
    setActiveCat

}) {

    const navigate = useNavigate()

    function handleCatClick(e) {
        setActiveCat(e.target.innerText)
        navigate('/shop')
    }

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
                        setFilteredItems={setFilteredItems}
                        setActiveCat={setActiveCat} />
                </div>
                <div className={styles.icons}>
                    {user?.name !== 'c186ec' ?
                        <>
                            <Link to="/favorites">
                                <div>
                                    <img src={favHeart} alt="heart" />
                                </div>
                            </Link>
                            <Link to="/account">
                                <div>
                                    <img className={user?.imageUrl ? styles.userPhoto : ''} src={user?.imageUrl ? user.imageUrl : userIcon} alt="user-icon" />
                                </div>
                            </Link>
                        </>
                        :
                        <div className={styles.login} onClick={toggleAuthModal}>
                            <p>Log In</p>
                        </div>

                    }
                    {userShop?.name !== 'Loading...' ? <Link to={`/shopmgmt/${user?._id}`}>
                        <div>
                            <img src={shopIcon} alt="store" />
                        </div>
                    </Link>
                        :
                        <></>
                    }
                    <Link to="/cart">
                        <div className={styles.cartContainer}>
                            {/* Display the cart count if items are in the cart */}
                            {cart?.length > 0 && (
                                <div className={styles.cartCount}>{cartTotals.totalItemQty}</div>
                            )}
                            <img src={cartIcon} alt="cart" />
                        </div>
                    </Link>
                </div>
            </div>
            <div className={styles.categories}>
                <ul>
                    {categories.map((category, index) => (

                        <li className={styles.li} onClick={handleCatClick} key={index}>
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </nav >
    )
}