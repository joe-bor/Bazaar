import { Link } from 'react-router-dom'
import CategorySection from '../../components/CategorySection/CategorySection'
import styles from './Home.module.scss'

function Home({ items, categories, setActiveCat }) {

  return (
    <main className={styles.Home}>
      <div className={styles.hero}>
        <p>Shop now</p>
        <p>and explore</p>
        <Link to='/shop'>See More</Link>
      </div>
      <div className={styles.itemGrid}>
        {categories.map(category => <CategorySection items={items} key={category} category={category} setActiveCat={setActiveCat} />)}
      </div>
    </main>
  )
}
export default Home