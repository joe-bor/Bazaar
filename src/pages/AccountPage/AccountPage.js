import UserLogOut from "../../components/UserLogOut/UserLogOut";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import userIcon from '../../assets/images/user-icon.svg'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { deleteUser } from "../../utilities/users-service";
import styles from './AccountPage.module.scss'

export default function AccountPage({ user, setUser, createGuestUser }) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const editModalRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    editModalOpen ? editModalRef.current.showModal() : editModalRef.current.close()
  }, [editModalOpen])

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  async function deleteUserAcc() {
    await deleteUser(user._id)
    createGuestUser()
    navigate('/home')
  }

  return (
    <div>
      <div className={styles.userImage}>
        <img src={user.name === 'c186ec' ? userIcon : user.imageUrl} />
      </div>
      <div className={styles.userInfo}>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>**********</p>
      </div>
      <div className={styles.links}>
        <button onClick={toggleEditModal}>Edit Profile</button>
        <Link to='/orderhistory'><p>Order History</p></Link>
        <Link to='/shopmgmt'><p>Manage Shop</p></Link>
        <button onClick={deleteUserAcc}>Delete Account</button>
        <UserLogOut createGuestUser={createGuestUser} />
      </div>
      <div>
        {/* 🟥 Favorites Section Here 🟥 */}
      </div>
      <dialog ref={editModalRef} onClose={toggleEditModal}><EditUserForm user={user} setUser={setUser} /></dialog>
    </div>
  )
}