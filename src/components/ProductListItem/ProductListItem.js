import FavoriteIcon from '../FavoriteIcon/FavoriteIcon'
import styles from './ProductListItem.module.scss'

export default function ProductListItem({ productItem }) {

  return (
    <div className={styles.ProductListItem}>
      <div className={styles.imageContainer}>
        {/* 🟥 need a way to show multiple images 🟥 */}
        <img className={styles.itemImage}></img>
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