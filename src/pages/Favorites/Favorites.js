import styles from './Favorites.module.scss'
import * as usersAPI from '../../utilities/users-api'
import { useEffect, useState } from 'react'
import ProductList from '../../components/ProductList/ProductList'

export default function Favorites({ user, setUser }) {
  const [favItems, setFavItems] = useState([])

  useEffect(() => {
    async function getFavItems() {
      const favorites = await usersAPI.getFavorites(user._id)
      setFavItems(favorites)
    }
    getFavItems()
  }, [user])

  return (
    <div className={styles.Favorites}>
      <h1>{`${user.name}'s Favorites`}</h1>
      <ProductList productItems={favItems} user={user} setUser={setUser} />
    </div>
  )
}