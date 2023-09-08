import FavoriteIcon from '../FavoriteIcon/FavoriteIcon'
import styles from './ProductListItem.module.scss'
import { useNavigate } from 'react-router-dom'

export default function ProductListItem({ productItem }) {

  const navigate = useNavigate()

  function handleClick(e) {
    navigate(`/itemdetails/${productItem._id}`)
  }

  return (
    <div className={styles.ProductListItem} onClick={handleClick}>
      <div className={styles.imageContainer}>
        {/* 🟥 need a way to show multiple images 🟥 */}
        <img className={styles.itemImage} src={productItem.images[0]}></img>
        {/* 🟥 add favorite button to show on hover 🟥 */}
        <FavoriteIcon className={styles.FavoriteIcon} />
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.name}>{productItem.name}</div>
        <div className={styles.price}>${productItem.price.toFixed(2)}</div>
      </div>
    </div>
  )
}