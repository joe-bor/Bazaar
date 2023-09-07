import React from 'react'
import { Link } from 'react-router-dom'

import SearchBar from '../SearchBar/SearchBar.js'

export default function NavBar({
    setFilteredItems,
    filteredItems,
    user,
    setUser,
    cart,
    setCart,
    items,
    setItems,
    activeCat,
    setActiveCat,
    searchTerm,
    setSearchTerm,
    setCategories,
    isloggedIn


    // import { isloggedIn, user} from 

    // need to import the islogged in and user varaibles but not sure 


}) {
    const categories = [
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
        { name: 'lighting', sortOrder: 200 }
    ]
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src="/img/logo.png" alt="logo" />
                </Link>
            </div>
            <div className="navbar-search">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <div className="navbar-categories">
                <ul>
                    {categories.map((category, index) => (
                        <li key={index}>
                            <Link to={`/category/${category.name}`}>{category.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-icons">
                <Link to="/favorites">
                    <div>
                        <i className="heart"></i>
                        <img src="public/img/Favorite Heart.png" alt="heart" />
                    </div>
                </Link>
                <Link to="/cart">
                    <div>
                        <i className="cart"></i>
                        <img src="public/img/Cart Icon.png" alt="cart" />
                        {/* Display the cart count if items are in the cart */}
                        {cart?.length > 0 && (
                            <span className="cart-count">{cart.length}</span>
                        )}
                    </div>
                </Link>
                <Link to="/store">
                    <div>
                        <i className="store"></i>
                        <img src="public/img/Store Icon.png" alt="store" />
                    </div>
                </Link>
                <div className="navbar-user">
                    {isloggedIn ? (
                        //Display user profile info if logged in
                        <>
                            <img src={user.profileImage} alt="Profile" />
                            <span>{user.name}</span>
                            <Link to="/logout">Logout</Link>
                        </>
                    ) : (
                        //Display "log in" if not logged in 
                        <>
                            <img src="public/img/User Icon.png" alt="user" />
                            <Link to="/login"></Link>
                        </>

                    )}
                </div>
            </div>
        </nav>
    )
}