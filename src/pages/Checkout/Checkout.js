import styles from './Checkout.module.scss'
import OrderDetail from '../../components/OrderDetail/OrderDetail'
import * as ordersAPI from '../../utilities/orders-api'
import { useNavigate } from 'react-router-dom'

export default function Checkout({ cart, setCart, cartTotals }) {
  const navigate = useNavigate()

  const orders = cart.map(order =>
    <OrderDetail
      order={order}
      setCart={setCart}
      key={order._id}
      shopName={order.shop.name}
    />
  )

  async function handleCheckout() {
    await ordersAPI.checkout()
    setCart([])
  }

  function handleOrderHistBtn() {
    navigate('/orderhistory')
  }

  return (
    <div className={styles.Checkout}>
      <div className={styles.userInfo}><h1>🟥 User Info Goes Here 🟥</h1></div>
      <div className={styles.orderSummary}>
        <div>Order Summary</div>
        {cart.length > 0 ?
          <>
            <div className={`${styles.cartOrders} flex-ctr-ctr flex-col scroll-y`}>
              {orders}
            </div>
            <div className={styles.cartSummary}>
              <div className={styles.totalItemQty}>{`Qty: ${cartTotals?.totalItemQty}`}</div>
              <div className={styles.totalPrice}>{`Total: ${cartTotals?.totalPrice}`}</div>
              <button onClick={handleCheckout}>Checkout</button>
            </div>
          </> :
          <>
            <div>Order Placed</div>
            <button onClick={handleOrderHistBtn}>View Order History</button>
          </>
        }

      </div>
    </div>
  )
}