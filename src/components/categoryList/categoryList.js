import { useState } from 'react'
import styles from './CategoryList.module.scss'

export default function CategoryList({ categories, activeCat, setActiveCat }) {

  const cats = categories.map(cat =>
    < li
      key={cat}
      className={cat === activeCat ? styles.active : ''}
      onClick={() => {
        setActiveCat(cat)
        hideHoverMenu()
      }}
    >
      {cat}
    </li >)

  return (
    < ul
      className={styles.CategoryList}
    >
      {cats}
    </ul >

  )
}