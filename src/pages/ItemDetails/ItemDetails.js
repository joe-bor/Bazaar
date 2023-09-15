import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as itemsAPI from '../../utilities/items-api'
import * as ordersAPI from '../../utilities/orders-api'
import FavoriteIcon from "../../components/FavoriteIcon/FavoriteIcon"
import styles from './ItemDetails.module.scss'
import ReviewList from '../../components/ReviewList/ReviewList'
import { toggleFavorites } from "../../utilities/users-service"

export default function ItemDetails({ setCart, favItems, user, setFavItems, setUser }) {
  const [item, setItem] = useState(null)
  let { itemId } = useParams()
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    async function getItem() {
      const selected = await itemsAPI.getById(itemId)
      setItem(selected)
    }
    getItem()
  }, [])

  useEffect(() => {
    if (favItems.find(favItem => favItem._id === item._id)){
      setIsFav(true)
    } else {
      setIsFav(false)
    }
  }, [favItems])
  

  async function handleAddToCart() {
    console.log(itemId)
    const updatedCart = await ordersAPI.addItemToCart(itemId)
    setCart(updatedCart)
  }

  async function handleFaveClick() {
    const updatedUser = await toggleFavorites(user._id, item._id)
    setUser(updatedUser)
  }

  return (
    <>
      <div className={styles.ItemContainer}>
        <div className={styles.imageContainer}>
          {/* 🟥 need a way to show multiple images 🟥 */}
          <img className={styles.itemImage} src={item?.images[0]} ></img>
          {/* 🟥 add favorite button to show on hover 🟥 */}
        </div>
        <div className={styles.itemInfo}>
          <div className={styles.name}>{item?.name}</div>
          <div className={styles.description}>{item?.description}</div>
          <Link to={`/sellershop/${item?.shop._id}`}><div className={styles.shopName}>{item?.shop.name}</div></Link>
          <div className={styles.price}>${item?.price.toFixed(2)}</div>
            <FavoriteIcon className={styles.FavoriteIcon} isFav={isFav} handleFaveClick={handleFaveClick} />
            <button className={styles.addToCart} onClick={handleAddToCart} >Add To Cart</button>
        </div>
      </div>
      <ReviewList itemId={itemId} />
    </>
  )
}

