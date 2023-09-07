import styles from './FavoriteIcon.module.scss'
import favIcon from '../../assets/images/fav-heart.svg'


export default function FavoriteIcon(props) {
  return (
    <div className={styles.FavoriteIcon}>
      <img src={favIcon} alt="Favorite Icon" />
    </div>
  )
}