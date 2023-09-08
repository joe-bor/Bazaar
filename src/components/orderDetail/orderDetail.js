import styles from './OrderDetail.module.scss'
import LineItem from '../LineItem/LineItem'

export default function OrderDetail({ setCart, order, shopName, location }) {
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
      <div>{shopName}</div>
      <div className='flex-ctr-ctr flex-col scroll-y'>
        {lineItems}
      </div>
      <div className={styles.totalQty}>{`Qty: ${order.totalQty}`}</div>
      <div className={styles.totalPrice}>{`Total: ${order.orderTotal}`}</div>
    </div >
  )
}