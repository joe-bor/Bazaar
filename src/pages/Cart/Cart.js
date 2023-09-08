import OrderDetail from '../../components/OrderDetail/OrderDetail'
import styles from './Cart.module.scss'

export default function Cart({ cart, setCart }) {
  if (!cart) return null

  const orders = cart.map(order =>
    <OrderDetail
      order={order}
      setCart={setCart}
      key={order._id}
      shopName={order.shop.name}
    />
  )


  return (
    <div className={styles.Cart}>
      <div className={`${styles.cartOrders} flex-ctr-ctr flex-col scroll-y`}>
        {orders}
      </div>
      <div className={styles.cartSummary}>
        <button>Go To Checkout</button>
      </div>
    </div >
  )
}