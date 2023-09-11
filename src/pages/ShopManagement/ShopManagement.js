import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import * as shopsAPI from '../../utilities/shops-api'
import styles from './ShopManagement.module.scss'
import CreateShop from "../../components/CreateShop/CreateShop";
import CreateProduct from "../../components/CreateProduct/CreateProduct";

export default function ShopManagement({ user, setUser }) {
  const [userShop, setUserShop] = useState(null)
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [shopEditModalOpen, setShopEditModalOpen] = useState(false)
  const productModalRef = useRef()
  const shopEditModalRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (user.shop) {
      async function getUserShop() {
        const userShopInfo = await shopsAPI.getShop(user.shop)
        setUserShop(userShopInfo)
      }
      getUserShop()
    }
  }, [user])

  useEffect(() => {
    productModalOpen ? productModalRef.current.showModal() : productModalRef.current.close()
  }, [productModalOpen])

  useEffect(() => {
    shopEditModalOpen ? shopEditModalRef.current.showModal() : shopEditModalRef.current.close()
  }, [shopEditModalOpen])

  function toggleCreateProduct() {
    setProductModalOpen(!productModalOpen)
  }

  function toggleEditShop() {
    setShopEditModalOpen(!shopEditModalOpen)
  }

  async function deleteUserShop() {
    await shopsAPI.deleteShop(userShop._id)
    navigate('/account')
  }

  return (
    <div className={styles.ShopManagement}>
      <div className={styles.shopImage}>
        {/* <img src={userShop.heroImage} /> */}
      </div>
      <div className={styles.shopInfo}>
        {userShop &&
          <>
            <h1>{userShop.name}</h1>
            <p>{userShop.description}</p>
          </>}
      </div>
      <div className={styles.links}>
        <button onClick={toggleEditShop}>Edit Shop</button>
        <button onClick={toggleCreateProduct}>Add A Product</button>
        <button onClick={deleteUserShop}>Delete Shop</button>
      </div>
      <div>
        <h2>Products</h2>
        {/* 🟥 Products Section Here 🟥 */}
      </div>
      <dialog ref={shopEditModalRef} onClose={toggleEditShop}><CreateShop user={user} setUser={setUser} location={location} shop={userShop} setShop={setUserShop} /></dialog>
      <dialog ref={productModalRef} onClose={toggleCreateProduct}><CreateProduct user={user} setUser={setUser} location={location} /></dialog>
    </div>
  )
}