import styles from './OrderDetail.module.scss'
import LineItem from '../LineItem/LineItem'

export default function OrderDetail({ order, handleChangeQty, location }) {
  if (!order) return null

  const lineItems = order.lineItems.map(item =>
    <LineItem
      lineItem={item}
      isPaid={order.isPaid}
      handleChangeQty={handleChangeQty}
      key={item._id}
    />
  )

  return (
    <div className={styles.OrderDetail}>
      <div className='flex-ctr-ctr flex-col scroll-y'>
        {lineItems}
      </div>
    </div >
  )
}