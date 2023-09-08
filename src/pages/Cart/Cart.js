import { useState, useEffect } from 'react'
import OrderDetail from '../../components/OrderDetail/OrderDetail'
import styles from './Cart.module.scss'
import { useNavigate } from 'react-router-dom'

export default function Cart({ cart, setCart }) {
  const navigate = useNavigate()

  if (!cart) return null
  const [cartTotals, setCartTotals] = useState({
    totalItemQty: 0,
    totalPrice: 0
  })

  const orders = cart.map(order =>
    <OrderDetail
      order={order}
      setCart={setCart}
      key={order._id}
      shopName={order.shop.name}
    />
  )

  useEffect(() => {
    let totals = { ...cartTotals }
    cart.forEach((order) => {
      totals.totalItemQty += order.totalQty
      totals.totalPrice += order.orderTotal
    })
    setCartTotals(totals)
  }, [cart])

  function handleGoToCheckout() {
    navigate('/checkout')
  }


  return (
    <div className={styles.Cart}>
      <div className={`${styles.cartOrders} flex-ctr-ctr flex-col scroll-y`}>
        {orders}
      </div>
      <div className={styles.cartSummary}>
        <div className={styles.totalItemQty}>{`Qty: ${cartTotals?.totalItemQty}`}</div>
        <div className={styles.totalPrice}>{`Total: ${cartTotals?.totalPrice}`}</div>
        <button onClick={handleGoToCheckout}>Go To Checkout</button>
      </div>
    </div >
  )
}