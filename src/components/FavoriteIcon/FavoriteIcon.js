import styles from './FavoriteIcon.module.scss'
import favHeart from '../../assets/images/fav-heart.svg'


export default function FavoriteIcon(props) {
  return (
    <div className={styles.FavoriteIcon}>
      <img className={styles.icon} src={favHeart} alt="Favorite Icon" />
    </div>
  )
}