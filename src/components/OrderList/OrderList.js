import OrderListItem from '../OrderListItem/OrderListItem'
import styles from './OrderList.module.scss'

export default function OrderList({ orders, activeOrder, handleSelectOrder }) {
  const orderItems = orders.map(order =>
    <OrderListItem
      order={order}
      isSelected={order === activeOrder}
      handleSelectOrder={handleSelectOrder}
      key={order._id}
    />
  )

  return (
    <main className={styles.OrderList}>
      {orderItems.length ?
        orderItems
        :
        <span className={styles.noOrders}>No Previous Orders</span>
      }
    </main>
  )
}