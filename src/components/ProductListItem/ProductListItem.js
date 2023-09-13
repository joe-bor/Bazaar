import FavoriteIcon from '../FavoriteIcon/FavoriteIcon'
import styles from './ProductListItem.module.scss'
import { useNavigate } from 'react-router-dom'
import { toggleFavorites } from '../../utilities/users-service';
import favHeart from '../../assets/images/fav-heart.svg'

export default function ProductListItem({ productItem, user, setUser }) {

  const navigate = useNavigate()

  function handleClick(e) {
    navigate(`/itemdetails/${productItem._id}`)
  }

  async function handleFavClick() {
    const updatedUser = await toggleFavorites(user._id, productItem._id)
    setUser(updatedUser)
  }

  return (
    <div className={styles.ProductListItem} >
      <div className={styles.imageContainer}>
        {/* 🟥 need a way to show multiple images 🟥 */}
        {productItem?.images.length > 0 ? <img className={styles.itemImage} src={productItem.images[0]} onClick={handleClick}></img> : <p>No images available</p> }
        {/* 🟥 add favorite button to show on hover 🟥 */}
        <button onClick={handleFavClick}><img src={favHeart} /></button>
        <FavoriteIcon className={styles.FavoriteIcon} onClick={handleFavClick} />
      </div>
      <div className={styles.itemInfo}>
        {productItem && <><div className={styles.name} onClick={handleClick}>{productItem.name} </div>
        <div className={styles.price} onClick={handleClick}>${productItem?.price.toFixed(2)}</div> </>} 
      </div>
    </div>
  )
}