import styles from './UserLogOut.module.scss'
import { logOut } from '../../utilities/users-service'

export default function UserLogOut({ createGuestUser }) {

  function handleLogOut() {
    logOut()
    // create a new guest user
    createGuestUser()
  }

  return (
    <div className={styles.UserLogOut}>
      <button className={styles.logOutBtn} onClick={handleLogOut}>Log Out</button>
    </div>
  )
}