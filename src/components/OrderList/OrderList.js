import styles from './OrderListItem.module.scss'

export default function OrderListItem({ order, isSelected, handleSelectOrder }) {
  return (
    <div className={`${styles.OrderListItem} ${isSelected ? styles.selected : ''} `} onClick={() => handleSelectOrder(order)}>
      <div>
        <div>Order Id: <span className={styles.orderId}>{order.orderId}</span></div>
        <div className={styles.orderDate}>{new Date(order.updatedAt).toLocaleDateString()}</div>
      </div>
      <div className="align-rt">
        <div className={styles.orderTotal}>${order.orderTotal.toFixed(2)}</div>
        <div className={styles.orderOty}>{order.totalQty} item{order.totalQty > 1 ? 's' : ''}</div>
      </div>
    </div>
  )
}