import FavoriteIcon from '../FavoriteIcon/FavoriteIcon'
import styles from './ProductListItem.module.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toggleFavorites } from '../../utilities/users-service'
import favHeart from '../../assets/images/fav-heart.svg'

export default function ProductListItem({ productItem, user, setUser, favItems, setFavItems }) {
  const [itemIsFav, setItemIsFav] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (favItems && favItems.length > 0) {
      if (favItems.find(favItem => favItem._id === productItem._id)) {
        setItemIsFav(true)
      } else {
        setItemIsFav(false)
      }
    }
  }, [favItems])


  function handleClick(e) {
    navigate(`/itemdetails/${productItem._id}`)
  }

  async function handleFavClick() {
    const updatedUser = await toggleFavorites(user._id, productItem._id)
    setUser(updatedUser)
  }

  return (
    <div className={styles.ProductListItem}>
      {/* 🟥 need a way to show multiple images 🟥 */}
      <div>
        <div className={styles.imageContainer}>
          {productItem?.images.length > 0 ? (
            <img
              className={styles.productImage}
              src={productItem.images[0]}
              onClick={handleClick}
              alt={productItem.name}
            />
          ) : (
            <p>No images available</p>
          )}
        </div>
        {/* 🟥 add favorite button to show on hover 🟥 */}
        <div className={styles.favoriteOverlay}>
        </div>
      </div>

      <FavoriteIcon className={styles.FavoriteIcon} isFav={itemIsFav} handleFaveClick={handleFavClick} />
      <div className={styles.itemInfo}>
        {productItem && (
          <>
            <div className={styles.name} onClick={handleClick}>
              {productItem.name}
            </div>
            <div className={styles.price} onClick={handleClick}>
              ${productItem?.price.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}