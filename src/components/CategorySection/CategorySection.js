import * as itemsAPI from '../../utilities/items-api'
import { Link } from 'react-router-dom'
import ProductList from '../ProductList/ProductList'
import styles from './CategorySection.module.scss'
import { useEffect, useState } from 'react'

export default function CategorySection({ items, category, setActiveCat, favItems, setFavItems }) {
    // make an API call to the DB and query for all items that has the category === prop.category

    const [firstFiveItems, setFirstFiveItems] = useState([])


    useEffect(() => {
        if (items && Array.isArray(items)) {
            const copy = [...items]
            setFirstFiveItems(category === 'Show All' ? copy.slice(-5) : copy.filter(item => item.category.name === category).slice(0, 5))
        }
    }, [items])

    return (
        <div className={styles.categoryRow}>
            {category}<Link to='/shop' onClick={e => setActiveCat(category)} >➡</Link>
            <ProductList productItems={firstFiveItems} favItems={favItems} setFavItems={setFavItems} />
        </div>
    )
}