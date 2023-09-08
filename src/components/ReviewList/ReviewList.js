import { useState, useEffect } from "react"
import styles from './ReviewList.module.scss'
import * as reviewsAPI from '../../utilities/reviews-api'

function ReviewList({
    itemId
}) {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        setReviews(reviewsAPI.getItemReviews(itemId))
    }, [])

    return (
        <div className={styles.ReviewList}>
            {reviews.length > 0 ?
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