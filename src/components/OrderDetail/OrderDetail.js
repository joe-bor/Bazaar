import styles from './OrderDetail.module.scss'
import LineItem from '../LineItem/LineItem'

export default function OrderDetail({ setCart, order, shopName }) {
  if (!order) return null

  const lineItems = order.lineItems.map(item =>
    <LineItem
      lineItem={item}
      isPaid={order.isPaid}
      key={item._id}
      setCart={setCart}
    />
  )

  return (
    <div className={styles.OrderDetail}>
      <div className={styles.shopName}>{shopName}</div>
      <div className='random'>
        {lineItems}
      </div>
      {/* <div className={styles.priceAdjustment}>
        <div className={styles.totalQty}>{`Qty: ${order.totalQty}`}</div>
        <div className={styles.totalPrice}>{`Total: $${order.orderTotal}`}</div>
      </div> */}
    </div >
  )
}