import { Link } from 'react-router-dom'
import CategorySection from '../../components/CategorySection/CategorySection'
import styles from './Home.module.scss'

function Home() {

  /* --- Should be passed down as props --- */
  const categories = [  //iterate and create Component to for each category ( which will house the items of said category)
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting"
  ]
  let setActiveCat //state setter - triggered when user clicks `see more` on the home page
  /* --------------------------- */

  return (
    <main className={styles.Home}>
      <div className={styles.hero}>
        <p>Shop now</p>
        <p>and explore</p>
        <Link to='shop'>See More</Link>
      </div>
      <div className={styles.itemGrid}>
        {categories.map(category => <CategorySection key={category} category={category} setActiveCat={setActiveCat}/> )}
      </div>
    </main>
  )
}
export default Home