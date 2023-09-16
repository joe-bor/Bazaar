import { useState, useEffect } from 'react'
import OrderDetail from '../../components/OrderDetail/OrderDetail'
import styles from './Cart.module.scss'
import { useNavigate } from 'react-router-dom'

export default function Cart({ cart, setCart, cartTotals }) {
  const navigate = useNavigate()

  if (!cart) return null

  const orders = cart.map(order =>
    <OrderDetail
      order={order}
      setCart={setCart}
      key={order._id}
      shopName={order.shop.name}
    />
  )

  function handleGoToCheckout() {
    navigate('/checkout')
  }
  function handleGoToShop() {
    navigate('/shop')
  }


  return (
    <div className={styles.Cart}>
      <div className={`${styles.cartOrders} flex-ctr-ctr flex-col scroll-y`}>
        {orders}
      </div>
      <div className={styles.cartSummary}>
        <div>Payment Info</div>
        <div className={styles.fakePmtInfo}></div>
        {cart.length > 0 ?
          <>
            <div className={styles.price}>
              {/* <div className={styles.totalItemQty}>{`Qty: ${cartTotals?.totalItemQty}`}</div> */}
              <div className={styles.checkoutText}>
                <div className={styles.priceTotalText}>Total: </div>
                <div className={styles.totalPrice}>{`${cartTotals?.totalPrice}`}</div>
              </div>
            </div>
            <button onClick={handleGoToCheckout}>Checkout</button>
          </> :
          <>
            <div>Your Cart Is Empty</div>
            <button className={styles.goToShop} onClick={handleGoToShop}>Go To Shop</button>
          </>}
      </div>
    </div >
  )
}