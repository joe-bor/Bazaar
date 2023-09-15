import styles from './Favorites.module.scss'
import ProductList from '../../components/ProductList/ProductList'

export default function Favorites({ user, setUser, favItems, setFavItems }) {

  return (
    <div className={styles.Favorites}>
      <h1>{`${user.name}'s Favorites`}</h1>
      <ProductList productItems={favItems} user={user} setUser={setUser} />
    </div>
  )
}