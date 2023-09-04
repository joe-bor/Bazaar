import styles from './productListItem.module.scss'

export default function ProductListItem({ productItem }) {


  return (
    <div className={styles.ProductListItem}>
      <div className={styles.imageContainer}>
        <img className={styles.itemImage}></img>
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.name}>{productItem.name}</div>
        <div className={styles.price}>${productItem.price.toFixed(2)}</div>
      </div>
    </div>
  )
}