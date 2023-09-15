import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import * as shopsAPI from '../../utilities/shops-api'
import styles from './ShopManagement.module.scss'
import ShopForm from '../../components/ShopForm/ShopForm'
import ProductForm from '../../components/ProductForm/ProductForm'
import ProductList from '../../components/ProductList/ProductList'
import EditProductForm from '../../components/EditProductForm/EditProductForm'
import shopIcon from '../../assets/images/shop-icon.svg'

export default function ShopManagement({
  user,
  setUser,
  userShop,
  setUserShop,
  categories
}) {
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [shopEditModalOpen, setShopEditModalOpen] = useState(false)
  const [productEditModalOpen, setProductEditModalOpen] = useState(false)
  const [shopProducts, setShopProducts] = useState([])
  const productModalRef = useRef()
  const shopEditModalRef = useRef()
  const productEditModalRef = useRef()
  let { shopId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function getUserShop() {
      const userShopInfo = await shopsAPI.getShop(shopId)
      setUserShop(userShopInfo)
    }
    getUserShop()
  }, [user])

  useEffect(() => {
    if (userShop && userShop?.products.length > 0 && shopProducts?.length === 0) {
      setShopProducts(userShop.products)
    }
  }, [userShop])

  useEffect(() => {
    productModalOpen
      ? productModalRef.current.showModal()
      : productModalRef.current.close()
  }, [productModalOpen])

  useEffect(() => {
    shopEditModalOpen
      ? shopEditModalRef.current.showModal()
      : shopEditModalRef.current.close()
  }, [shopEditModalOpen])

  useEffect(() => {
    productEditModalOpen
      ? productEditModalRef.current.showModal()
      : shopEditModalRef.current.close()
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
      <section className={styles.header}>
        {userShop && (
          <div className={styles.infoSection}>
            <img
              className={userShop.heroImage ? styles.circle : ''}
              src={userShop.heroImage ? userShop.heroImage : shopIcon}
            />
            <div className={styles.shopInfo}>
              <h1 className="title">{userShop.name}</h1>
              <p className={styles.description}>{userShop.description}</p>
            </div>
          </div>
        )}
        <div className={`${styles.links} flex-col`}>
          <button onClick={toggleEditShop}>Edit Shop Info</button>
          <button onClick={toggleCreateProduct}>Add A Product</button>
          <button onClick={toggleEditProductForm}>Edit an Item</button>
          <button onClick={deleteUserShop}>Delete Shop</button>
        </div>
      </section>
      <div className={styles.products}>
        <h2 className={styles.productsHeading}>Products</h2>
        {shopProducts.length > 0 ? (
          <ProductList
            productItems={shopProducts}
            user={user}
            setUser={setUser}
          />
        ) : null}
      </div>
      <dialog
        className={styles.dialog}
        ref={shopEditModalRef}
        onClose={toggleEditShop}
      >
        <ShopForm
          toggleEditShop={toggleEditShop}
          user={user}
          setUser={setUser}
          location={location}
          userShop={userShop}
          setUserShop={setUserShop}
        />
      </dialog>
      <dialog
        className={styles.dialog}
        ref={productModalRef}
        onClose={toggleCreateProduct}
      >
        <ProductForm
          toggleCreateProduct={toggleCreateProduct}
          shopProducts={shopProducts}
          setShopProducts={setShopProducts}
          user={user}
          setUser={setUser}
          location={location}
          userShop={userShop}
          setUserShop={setUserShop}
          categories={categories}
        />
      </dialog>
      {/* <dialog ref={productEditModalRef} onClose={toggleEditProductForm}><EditProductForm toggleCreateProduct={toggleCreateProduct} user={user} categories={categories} /></dialog> */}
    </div>
  )
}
