import styles from './Cart.module.scss'

export default function Cart({ cart, setCart }) {

  if (!cart) return null


  const lineItems = cart.lineItems.map(item =>
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