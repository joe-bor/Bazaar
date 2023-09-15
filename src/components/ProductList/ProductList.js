import styles from './ProductList.module.scss'
import ProductListItem from '../productListItem/productListItem'
import { useLocation } from 'react-router-dom'

export default function ProductList({ productItems, user, setUser, favItems, setFavItems }) {
  const location = useLocation()
  const items = productItems.map(item =>
    <ProductListItem
      className={styles.ProductListItem}
      key={item._id}
      productItem={item}
      user={user}
      setUser={setUser}
      favItems={favItems}
      setFavItems={setFavItems}
    />
  )
  return (
    <>
      {items.length > 0 ?
        <main className={styles.ProductList}>
          {items}
        </main>
        : location.pathname === '/shop' ?
          <div>
            <p>No results</p>
            <p>Try checking your spelling or use more general terms</p>
          </div>
          : <></>
      }
    </>
  )
}