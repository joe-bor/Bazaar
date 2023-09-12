import styles from './Logo.module.scss'
import logoImg from '../../assets/images/bazaar-logo.svg'

export default function Logo() {
  return (
    <div className={styles.Logo}>
      <img src={logoImg} alt="Bazaar" />
    </div>
  )
}