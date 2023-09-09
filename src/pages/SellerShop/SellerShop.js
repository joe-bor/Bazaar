import { useParams } from 'react-router-dom'
import * as shopsAPI from '../../utilities/shops-api'
import styles from './SellerShop.module.scss'
import { useEffect, useState } from 'react'
import ProductList from '../../components/ProductList/ProductList'
import CategoryList from '../../components/CategoryList/CategoryList'

export default function SellerShop({ user, setUser }) {
  const [shop, setShop] = useState(null)
  const [shopCategories, setShopCategories] = useState([])
  const [shopProducts, setShopProducts] = useState([])
  const [shopActiveCat, setShopActiveCat] = useState(null)
  let { shopId } = useParams()

  useEffect(() => {
    async function getShopInfo() {
      const shopInfo = await shopsAPI.getShop(shopId)
      setShop(shopInfo)
      setShopProducts(shopInfo.products)
    }
    getShopInfo()
  }, [])


  useEffect(() => {
    if (shop) {
      console.log(shop)
      const shopCats = shop.products.reduce((cats, item) => {
        const cat = item.category.name
        return cats.includes(cat) ? cats : [...cats, cat]
      }, [])
      shopCats.unshift('Show All')
      console.log(shopCats)
      setShopCategories(shopCats)
      setShopActiveCat(shopCats[0])
    }
  }, [shop])

  useEffect(() => {
    if (shopActiveCat) {
      const shopProductCopy = [...shop.products]
      // filter products by active category
      const filtered = shopActiveCat === 'Show All' ? shop.products : shopProductCopy.filter(product => product.category.name === shopActiveCat)
      // set shopProducts to the filtered products
      setShopProducts(filtered)
    }
  }, [shopActiveCat])

  return (
    <div>
      <div className={styles.shopHeader}>
        <div className={styles.shopLogo}>
          <img src={shop?.heroImage} alt={`${shop?.name}'s Logo`} />
        </div>
        <div className={styles.shopInfo}>
          <h1>{shop?.name}</h1>
          <p>{shop?.description}</p>
        </div>
      </div>
      <aside className={styles.categoryList}>
        <CategoryList categories={shopCategories} activeCat={shopActiveCat} setActiveCat={setShopActiveCat} />
      </aside>
      <div className={styles.shopItems}>
        {shop &&
          <ProductList productItems={shopProducts} user={user} setUser={setUser} />}
      </div>

    </div>
  )
}

