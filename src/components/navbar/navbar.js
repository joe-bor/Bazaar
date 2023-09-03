import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const navBar = () => {
    const [categories, setCategories] = useState([])

    // Fetch categories from the api 
    useEffect(() => {
        fetch('https://dummyjson.com/categories')
        .then((response) => response.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((error) => {
            console.log('Error fetching categories', error)
        })
    }, [])
    
    return (
        <nav className="navbar">
            <div className="navbar-logo">         
                <Link to="/">
                    <img src="public/img/logo.png" alt="logo" />
                </Link>
            </div> 
            <div className="navbar-search">
                <input type="text" placeholder="Search for products..." />
            </div>
            <div className="navbar-categories">
                <ul>
                    {categories.map((category) => (
                        <li key={category._id}>
                            <Link to={`/category/${category.slug}`}>{category.name}</Link>
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

export default navBar 