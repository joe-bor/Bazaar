import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as itemsAPI from '../../utilities/items-api'
import * as ordersAPI from '../../utilities/orders-api'
import FavoriteIcon from "../../components/FavoriteIcon/FavoriteIcon"
import styles from './ItemDetails.module.scss'
import ReviewList from '../../components/ReviewList/ReviewList'

export default function ItemDetails({ setCart }) {
  const [item, setItem] = useState(null)
  let { itemId } = useParams()

  useEffect(() => {
    async function getItem() {
      const selected = await itemsAPI.getById(itemId)
      setItem(selected)
    }
    getItem()
  }, [])

  async function handleAddToCart() {
    console.log(itemId)
    const updatedCart = await ordersAPI.addItemToCart(itemId)
    setCart(updatedCart)
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
          <Link to={`/sellershop/${item?.shop._id}`}><div className={styles.shopName}>{item?.shop.name}</div></Link>
          <div className={styles.description}>{item?.description}</div>
          <div className={styles.price}>${item?.price.toFixed(2)}</div>
          <FavoriteIcon className={styles.FavoriteIcon} />
          <button className={styles.addToCart} onClick={handleAddToCart} >Add To Cart</button>
        </div>
      </div>
      <ReviewList itemId={itemId} />
    </>
  )
}

