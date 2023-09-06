import { useState } from "react"
import styles from './ReviewList.module.scss'

function ReviewList({
    item
}) {
    const reviews = fetch(`https://localhost:8000/routes/api/reviews/${item._id}`)
    .then(response => response.json())
    
    return (
        <div className={styles.ReviewList}>
            {reviews.map(review => 
            <ul className={styles.Review}>
                <li className={styles.reviewer}>{review.reviewer}</li>
                <li className={styles.starRating}>{review.starRating}</li>
                <li className={styles.review}>{review.review}</li>
            </ul>)}
        </div>
    )
}

export default ReviewList