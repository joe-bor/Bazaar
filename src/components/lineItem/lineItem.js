import styles from './LineItem.module.scss'

export default function LineItem({ lineItem, isPaid, handleChangeQty }) {
  return (
    <div className={styles.LineItem}>
      <div className={styles.imgContainer}>
        <img src={lineItem.item.imageURL} alt={lineItem.item.name} className={styles.itemImage} />
      </div>
      <div className={styles.itemDetails}>
        <div className={styles.itemInfo}>
          <span className={styles.itemName}>{lineItem.item.name}</span>
          <span className={styles.itemPrice}>{`$${lineItem.item.price.toFixed(2)}`}</span>
        </div>
        <div className={styles.qty} style={{ justifyContent: isPaid && 'center' }}>
          <div>
            {!isPaid &&
              <button
                className={styles.qtyBtn}
                onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
              >-</button>
            }
            <span className={isPaid ? styles.paid : ''}>{`${isPaid ? 'qty: ' : ''}${lineItem.qty}`}</span>
            {!isPaid &&
              <button
                className={styles.qtyBtn}
                onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
              >+</button>
            }
          </div>
          <div className={styles.extPrice}>${lineItem.extPrice.toFixed(2)}</div>
        </div>
      </div>
    </div >
  )
}
