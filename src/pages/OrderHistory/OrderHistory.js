import styles from './OrderHistory.module.scss'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as ordersAPI from '../../utilities/orders-api'
import OrderList from '../../components/OrderList/OrderList'
import OrderDetail from '../../components/OrderDetail/OrderDetail'

export default function OrderHistory({ }) {
  /* ----- State ----- */
  const [orders, setOrders] = useState([])
  const [activeOrder, setActiveOrder] = useState(null)


  const location = useLocation()

  /* ----- Effects ----- */
  useEffect(() => {
    // load previous paid orders
    async function fetchOrderHistory() {
      const orders = await ordersAPI.getOrderHistory()
      console.log(orders)
      setOrders(orders)
      // if no orders, acriveOrder will be set to null
      setActiveOrder(orders[0] || null)
    }
    fetchOrderHistory()
  }, [])

  console.log(orders)
  /* ----- Event Handlers ----- */
  function handleSelectOrder(order) {
    setActiveOrder(order)
  }

  /* ----- Rendered UI ----- */
  return (
    <main className={styles.OrderHistory}>
      <aside className={styles.aside}>
        <OrderList
          orders={orders}
          activeOrder={activeOrder}
          handleSelectOrder={handleSelectOrder}
        />
      </aside>
      {console.log(activeOrder)}
      <OrderDetail
        order={activeOrder}
        shopName={activeOrder?.shop.name}
      />
    </main>
  )
}