import * as itemsAPI from '../../utilities/items-api'
import { Link } from 'react-router-dom'
import ProductList from '../ProductList/ProductList'
import styles from './CategorySection.module.scss'

function CategorySection({ category, setActiveCat }) {
  // make an API call to the DB and query for all items that has the category === prop.category
  let allItems = [
    {
        "_id": "64f016dd23f32a31472821e0",
        "name": "Huawei P30",
        "price": 499,
        "reviews": [],
        "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
        "category": {
            "_id": "64f016d923f32a3147282196",
            "name": "smartphones",
            "sortOrder": 10,
            "__v": 0
        },
        "createdAt": "2023-08-31T04:28:13.224Z",
        "updatedAt": "2023-08-31T04:28:13.224Z",
        "__v": 0
    },
    {
        "_id": "64f016dc23f32a31472821d8",
        "name": "IPhone 9",
        "price": 549,
        "reviews": [],
        "description": "An apple mobile which is nothing like apple",
        "category": {
            "_id": "64f016d923f32a3147282196",
            "name": "smartphones",
            "sortOrder": 10,
            "__v": 0
        },
        "createdAt": "2023-08-31T04:28:12.798Z",
        "updatedAt": "2023-08-31T04:28:12.798Z",
        "__v": 0
    },
    {
        "_id": "64f016dc23f32a31472821da",
        "name": "IPhone X",
        "price": 899,
        "reviews": [],
        "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        "category": {
            "_id": "64f016d923f32a3147282196",
            "name": "smartphones",
            "sortOrder": 10,
            "__v": 0
        },
        "createdAt": "2023-08-31T04:28:12.893Z",
        "updatedAt": "2023-08-31T04:28:12.893Z",
        "__v": 0
    },
    {
        "_id": "64f016dd23f32a31472821de",
        "name": "OPPOF19",
        "price": 280,
        "reviews": [],
        "description": "OPPO F19 is officially announced on April 2021.",
        "category": {
            "_id": "64f016d923f32a3147282196",
            "name": "smartphones",
            "sortOrder": 10,
            "__v": 0
        },
        "createdAt": "2023-08-31T04:28:13.092Z",
        "updatedAt": "2023-08-31T04:28:13.092Z",
        "__v": 0
    },
    {
        "_id": "64f016dc23f32a31472821dc",
        "name": "Samsung Universe 9",
        "price": 1249,
        "reviews": [],
        "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
        "category": {
            "_id": "64f016d923f32a3147282196",
            "name": "smartphones",
            "sortOrder": 10,
            "__v": 0
        },
        "createdAt": "2023-08-31T04:28:12.995Z",
        "updatedAt": "2023-08-31T04:28:12.995Z",
        "__v": 0
    } 
]
//   async () => allItems = await itemsAPI.getAll() //! uncomment and delete allItems init value
  let filteredItems = allItems.filter( item => item.category.name === category)
  let firstFiveItems  = filteredItems.splice(0, 5)

  return (
    <div className={styles.categoryRow}>
        {category}<Link to='/shop' onClick={e => setActiveCat(category)} >➡</Link>
        <ProductList productItems={firstFiveItems}/> 
    </div>
  )
}
export default CategorySection