import styles from './LineItem.module.scss'
import { useLocation } from 'react-router-dom'
import * as ordersAPI from '../../utilities/orders-api'

export default function LineItem({ lineItem, isPaid, setCart }) {
  const location = useLocation()

  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty)
    setCart(updatedCart)
  }

  return (
    <>
      <div className={styles.LineItem}>

        <div className={styles.imgContainer}>
          <img src={lineItem.item.images[0]} alt={lineItem.item.name} className={styles.itemImage} />
        </div>

        <div className={styles.itemDetails}>
          <div className={styles.itemInfo}>
            <div className={styles.itemName}>{lineItem.item.name}</div>
            <div className={styles.itemDescription}>{lineItem.item.description}</div>
          </div>
        </div>

        <div className={styles.qty} style={{ justifyContent: isPaid && 'center' }}>
          <div className={styles.qtyContainer}>

            <div className={styles.btnQty}>Qty</div>
            <div className={styles.adjustBtn}>
              {(!isPaid && location.pathname !== '/checkout') &&
                <button
                  className={styles.qtyBtn}
                  onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
                >-</button>
              }
              <div className={isPaid ? styles.paid : ''}>{`${isPaid ? 'qty: ' : ''}${lineItem.qty}`}</div>
              {(!isPaid && location.pathname !== '/checkout') &&
                <button
                  className={styles.qtyBtn}
                  onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
                >+</button>
              }
            </div>
          </div>

          <div className={styles.extPrice}>
            <div className={styles.extText}>Price</div>
            <div>${lineItem.extPrice.toFixed(2)}</div>
          </div>

        </div>
      </div >

    </>
  )
}
