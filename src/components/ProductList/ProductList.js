import styles from './ProductList.module.scss'
import ProductListItem from '../productListItem/productListItem'
import { useLocation } from 'react-router-dom'

export default function ProductList({ productItems, user, setUser }) {
  const location = useLocation()
  const items = productItems.map(item =>
    <ProductListItem
      className={styles.ProductListItem}
      key={item._id}
      productItem={item}
      user={user}
      setUser={setUser}
    />
  )
  return (
   <>
    {items.length > 0 ?
    <main className={styles.main}>
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