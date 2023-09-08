import styles from './FavoriteIcon.module.scss'
import favHeart from '../../assets/images/fav-heart.svg'


export default function FavoriteIcon(props) {
  return (
    <div className={styles.FavoriteIcon}>
      <img src={favHeart} alt="Favorite Icon" />
    </div>
  )
}