import UserLogOut from "../../components/UserLogOut/UserLogOut";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import userIcon from '../../assets/images/user-icon.svg'
import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { deleteUser, getUser } from "../../utilities/users-service";
import styles from './AccountPage.module.scss'
import CreateShop from "../../components/CreateShop/CreateShop";
import ProductList from "../../components/ProductList/ProductList";

export default function AccountPage({ user, setUser, createGuestUser, userShop, setUserShop, favItems }) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [shopModalOpen, setShopModalOpen] = useState(false)
  const [favPreviewItems, setFavPreviewItems] = useState([])
  const editModalRef = useRef()
  const shopModalRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function getTheUser() {
      const theUser = await getUser()
      setUser(theUser)
    }
    getTheUser()
  }, [])

  // when editModalOpen state changes, update the editModalRef to open / close modal
  useEffect(() => {
    editModalOpen ? editModalRef.current.showModal() : editModalRef.current.close()
  }, [editModalOpen])

  // when shopModalOpen state changes, update the shopModalRef to open / close modal
  useEffect(() => {
    shopModalOpen ? shopModalRef.current.showModal() : shopModalRef.current.close()
  }, [shopModalOpen])

  // when favItems state changes, update to display the first 10 items
  useEffect(() => {
    if (favItems.length > 10) {
      const copy = [...favItems]
      setFavPreviewItems(copy.slice(0, 10))
    } else {
      setFavPreviewItems(favItems)
    }
  }, [favItems])

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
    <div className={`${styles.AccountPage} flex-ctr-ctr flex-col`}>
      <section className={styles.header}>
        <div className={styles.infoSection}>
          <img src={user.name === 'c186ec' || !user.imageUrl ? userIcon : user.imageUrl} />
          <div className={styles.infoDetails}>
            <h1 className="title">{user.name}</h1>
            <table>
              <tbody>
                <tr>
                  <th scope="row" >Email:</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th scope="row" >Password:</th>
                  <td>********</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={`${styles.links} flex-col`}>
          <button onClick={toggleEditModal}>Edit Profile</button>
          <Link to='/orderhistory'>Order History</Link>
          {user.shop ? <Link to='/shopmgmt'>Manage Shop</Link> : <button onClick={toggleCreateShop}>Create a Shop</button>}
          <button onClick={deleteUserAcc}>Delete Account</button>
          <UserLogOut createGuestUser={createGuestUser} />
        </div>
      </section>
      <div className={styles.favorites}>
        <div className={styles.favsHeading}>
          <h2 className="heading">Favorites</h2><button className="small" onClick={() => navigate('/favorites')}>See All</button>
        </div>
        <ProductList productItems={favPreviewItems} />
      </div>
      <dialog
        className={styles.dialog}
        ref={editModalRef}
        onClose={toggleEditModal}
        onSubmit={toggleEditModal}>
        <EditUserForm
          user={user}
          setUser={setUser} />
      </dialog>
      <dialog
        className={styles.dialog}
        ref={shopModalRef}
        onClose={toggleCreateShop}
        onSubmit={toggleCreateShop}>
        <CreateShop
          user={user}
          setUser={setUser}
          location={location}
          userShop={userShop}
          setUserShop={setUserShop} />
      </dialog>
    </div >
  )
}