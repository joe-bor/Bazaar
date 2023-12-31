import styles from './UserLogOut.module.scss'
import { logOut } from '../../utilities/users-service'
import { useNavigate } from 'react-router-dom'

export default function UserLogOut({ createGuestUser, setUserShop }) {
  const navigate = useNavigate()

  function handleLogOut() {
    logOut()
    setUserShop({
      name: 'Loading...',
      seller: {},
      description: 'Loading...',
      products: []
    })
    // create a new guest user
    createGuestUser()
    navigate('/')
  }

  return (
    <div className={styles.UserLogOut}>
      <button className={styles.logOutBtn} onClick={handleLogOut}>Log Out</button>
    </div>
  )
}