import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import * as shopsAPI from '../../utilities/shops-api'
import styles from './ShopManagement.module.scss'
import CreateShop from "../../components/CreateShop/CreateShop";
import CreateProduct from "../../components/CreateProduct/CreateProduct";
import ProductList from '../../components/ProductList/ProductList';

export default function ShopManagement({ user, setUser, userShop, setUserShop, categories }) {
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [shopEditModalOpen, setShopEditModalOpen] = useState(false)
  const [shopProducts, setShopProducts] = useState([])
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
    if (userShop && userShop.products.length > 0 && shopProducts.length === 0){
      setShopProducts(userShop.products)
    }

  },[userShop])
  

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
    const user = await shopsAPI.deleteShop(userShop._id)
    setUserShop(null)
    setUser(user)
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
        {shopProducts.length > 0 ?  <ProductList productItems={shopProducts} user={user} setUser={setUser} /> : null}
      </div>
      <dialog ref={shopEditModalRef} onClose={toggleEditShop}><CreateShop toggleEditShop={toggleEditShop} user={user} setUser={setUser} location={location} userShop={userShop} setUserShop={setUserShop} /></dialog>
      <dialog ref={productModalRef} onClose={toggleCreateProduct}><CreateProduct toggleCreateProduct={toggleCreateProduct} shopProducts={shopProducts} setShopProducts={setShopProducts} user={user} setUser={setUser} location={location} userShop={userShop} setUserShop={setUserShop} categories={categories} /></dialog>
    </div>
  )
}