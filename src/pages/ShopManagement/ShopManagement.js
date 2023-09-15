import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import * as shopsAPI from '../../utilities/shops-api'
import styles from './ShopManagement.module.scss'
import CreateShop from "../../components/CreateShop/CreateShop";
import CreateProduct from "../../components/CreateProduct/CreateProduct";
import ProductList from '../../components/ProductList/ProductList';
import EditProductForm from '../../components/EditProductForm/EditProductForm'
import EditShopForm from '../../components/EditShopForm/EditShopForm'

export default function ShopManagement({ user, setUser, userShop, setUserShop, categories }) {
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [shopEditModalOpen, setShopEditModalOpen] = useState(false)
  const [productEditModalOpen, setProductEditModalOpen] = useState(false)
  const [shopProducts, setShopProducts] = useState([])
  const productModalRef = useRef()
  const shopEditModalRef = useRef()
  const productEditModalRef = useRef()
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
  console.log(userShop)

  useEffect(() => {
    productModalOpen ? productModalRef.current.showModal() : productModalRef.current.close()
  }, [productModalOpen])

  useEffect(() => {
    shopEditModalOpen ? shopEditModalRef.current.showModal() : shopEditModalRef.current.close()
  }, [shopEditModalOpen])

  useEffect(() => {
    productEditModalOpen ? productEditModalRef.current.showModal() : shopEditModalRef.current.close()
  }, [productEditModalOpen])

  function toggleCreateProduct() {
    setProductModalOpen(!productModalOpen)
  }

  function toggleEditShop() {
    setShopEditModalOpen(!shopEditModalOpen)
  }

  function toggleEditProductForm() {
    setProductEditModalOpen(!productEditModalOpen)
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
        <button onClick={toggleEditProductForm}>Edit an Item</button>
        <button onClick={deleteUserShop}>Delete Shop</button>
      </div>
      <div>
        <h2>Products</h2>
        {shopProducts.length > 0 ?  <ProductList productItems={shopProducts} user={user} setUser={setUser} setSelectedProduct={setSelectedProduct} /> : null}
      </div>
      <dialog ref={shopEditModalRef} onClose={toggleEditShop}><EditShopForm toggleEditShop={toggleEditShop} user={user} setUser={setUser} location={location} userShop={userShop} setUserShop={setUserShop} /></dialog>
      <dialog ref={productModalRef} onClose={toggleCreateProduct}><CreateProduct toggleCreateProduct={toggleCreateProduct} shopProducts={shopProducts} setShopProducts={setShopProducts} user={user} setUser={setUser} location={location} userShop={userShop} setUserShop={setUserShop} categories={categories} /></dialog>
      <dialog ref={productEditModalRef} onClose={toggleEditProductForm}><EditProductForm toggleCreateProduct={toggleCreateProduct} user={user} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} categories={categories} /></dialog>
    </div>
  )
}