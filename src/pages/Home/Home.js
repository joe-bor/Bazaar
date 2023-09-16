import { Link } from 'react-router-dom'
import CategorySection from '../../components/CategorySection/CategorySection'
import styles from './Home.module.scss'

function Home({
  items,
  categories,
  setActiveCat,
  user,
  setUser,
  favItems,
  setFavItems
}) {
  return (
    <main className={styles.Home}>
      <div className={styles.hero}>
        <p>Shop now</p>
        <p>and explore</p>
        <button>
          <Link to="/shop">See More</Link>
        </button>
      </div>
      <div className={styles.itemGrid}>
        {categories.map((category) => (
          <CategorySection
            items={items}
            key={category}
            category={category}
            setActiveCat={setActiveCat}
            user={user}
            setUser={setUser}
            favItems={favItems}
            setFavItems={setFavItems}
          />
        ))}
      </div>
    </main>
  )
}
export default Home
