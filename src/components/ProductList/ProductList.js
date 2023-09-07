import styles from './ProductList.module.scss'
import ProductListItem from '../productListItem/productListItem'

export default function ProductList({ productItems }) {
  const items = productItems.map(item =>
    <ProductListItem
      className={styles.ProductListItem}
      key={item._id}
      productItem={item}
    />
  )
  return (
    <main className={styles.ProductList}>
      {items}
    </main>
  )
}