import UserLogOut from "../../components/UserLogOut/UserLogOut";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import userIcon from '../../assets/images/user-icon.svg'
import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { deleteUser } from "../../utilities/users-service";
import styles from './AccountPage.module.scss'
import CreateShop from "../../components/CreateShop/CreateShop";

export default function AccountPage({ user, setUser, createGuestUser, userShop, setUserShop }) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [shopModalOpen, setShopModalOpen] = useState(false)
  const editModalRef = useRef()
  const shopModalRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    editModalOpen ? editModalRef.current.showModal() : editModalRef.current.close()
  }, [editModalOpen])

  useEffect(() => {
    shopModalOpen ? shopModalRef.current.showModal() : shopModalRef.current.close()
  }, [shopModalOpen])

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen)
  }

  function toggleCreateShop() {
    setShopModalOpen(!shopModalOpen)
  }

  async function deleteUserAcc() {
    await deleteUser(user._id)
    createGuestUser()
    navigate('/home')
  }

  return (
    <div>
      <div className={styles.userImage}>
        <img src={user.name === 'c186ec' || !user.imageUrl ? userIcon : user.imageUrl} />
      </div>
      <div className={styles.userInfo}>
        <h1>{user.name}</h1>
        <p>{`Email: ${user.email}`}</p>
        <p>Password: ********</p>
      </div>
      <div className={styles.links}>
        <button onClick={toggleEditModal}>Edit Profile</button>
        <Link to='/orderhistory'><p>Order History</p></Link>
        {user.shop ? <Link to='/shopmgmt'><p>Manage Shop</p></Link> : <button onClick={toggleCreateShop}>Create a Shop</button>}
        <button onClick={deleteUserAcc}>Delete Account</button>
        <UserLogOut createGuestUser={createGuestUser} />
      </div>
      <div>
        <h2>Favorites</h2><button onClick={() => navigate('favorites')}>See All</button>
        {/* 🟥 Favorites Section Here 🟥 */}
      </div>
      <dialog ref={editModalRef} onClose={toggleEditModal} onSubmit={toggleEditModal}><EditUserForm user={user} setUser={setUser} /></dialog>
      <dialog ref={shopModalRef} onClose={toggleCreateShop} onSubmit={toggleCreateShop}><CreateShop user={user} setUser={setUser} location={location} userShop={userShop} setUserShop={setUserShop} /></dialog>
    </div>
  )
}