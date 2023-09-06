import { useState, useEffect } from "react"
import styles from './ReviewList.module.scss'

function ReviewList({
    item
}) {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        setReviews(fetch(`/api/reviews/${item._id}`).then(response => response.json()))
    }, [reviews])
    
    return (
        <div className={styles.ReviewList}> 
            { reviews.length > 0 ? 
                <>
                {reviews.map(review => 
                <ul className={styles.Review}>
                    <li className={styles.reviewer}>{review.reviewer}</li>
                    <li className={styles.starRating}>{review.starRating}</li>
                    <li className={styles.review}>{review.review}</li>
                </ul>)}
                </>
                : 
                <p className={styles.empty}>There are no reviews for this product at this time.</p>
            }
        </div>
    )
}

export default ReviewList