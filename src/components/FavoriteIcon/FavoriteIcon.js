import styles from './FavoriteIcon.module.scss'
import favHeart from '../../assets/images/fav-heart.svg'
import faveHeartFilled from '../../assets/images/fav-heart-fill.svg'


export default function FavoriteIcon({ handleFaveClick, isFav }) {
  return (
    <div onClick={handleFaveClick} className={styles.FavoriteIcon}>
      <img className={styles.icon} src={ isFav ? faveHeartFilled : favHeart} alt="Favorite Icon" />
    </div>
  )
}