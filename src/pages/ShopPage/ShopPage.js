import CategoryList from "../../components/CategoryList/CategoryList"
import ProductList from "../../components/ProductList/ProductList"
import styles from './ShopPage.module.scss'
import { useEffect } from "react"

export default function ShopPage({ items, user, setUser, categories, activeCat, setActiveCat, filteredItems, setFilteredItems, favItems, setFavItems }) {

  useEffect(() => {
    const itemsCopy = [...items]
    // filter products by active category
    const filtered = activeCat === 'Show All' ? items : itemsCopy.filter(product => product.category.name === activeCat)
    // set shopProducts to the filtered products
    setFilteredItems(filtered)
  }, [activeCat])

  return (
    <div className={styles.ShopPage}>
      <aside className={styles.categoryList}>
        <CategoryList categories={categories} activeCat={activeCat} setActiveCat={setActiveCat} />
      </aside>
      <div className={styles.items}>
        <ProductList productItems={filteredItems} user={user} setUser={setUser} favItems={favItems} setFavItems={setFavItems} />
      </div>
    </div>
  )
}