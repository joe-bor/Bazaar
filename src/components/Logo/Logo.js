import styles from './Logo.module.scss'
import logoImg from '../../assets/images/bazaar-logo.svg'
import { useNavigate } from 'react-router-dom'

export default function Logo() {
  const navigate = useNavigate()

  // clicking on logo takes you home
  function handleLogoClick() {
    navigate('/home')
  }

  return (
    <div className={styles.Logo} onClick={handleLogoClick}>
      <img src={logoImg} alt="Bazaar" />
    </div>
  )
}