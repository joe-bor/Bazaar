import styles from './ProductListItem.module.scss'
// import FavoriteButton from '../FavoriteButton/FavoriteButton.js'

export default function ProductListItem({ productItem }) {

  return (
    <div className={styles.ProductListItem}>
      <div className={styles.imageContainer}>
        {/* 🟥 need a way to show multiple images 🟥 */}
        <img className={styles.itemImage}></img>
        {/* 🟥 add favorite button to show on hover 🟥 */}
        <div className={styles.favBtnContainer}>
          {/*           <FavoriteButton className={styles.FavoriteButton} /> */}
        </div>
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.name}>{productItem.name}</div>
        <div className={styles.price}>${productItem.price.toFixed(2)}</div>
      </div>
    </div>
  )
}