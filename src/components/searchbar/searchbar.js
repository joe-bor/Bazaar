import styles from '../searchbar/Searchbar.module.scss'
import searchIcon from '../../assets/images/search-icon.svg'

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function SearchBar({
  className,
  items,
  setFilteredItems
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // properties to not include in search result
  const excludeProps = ["imageUrl", "publicId", "price", "reviews"];

  function searchFilter(item) {
    return Object.keys(item).some((key) => {
      return excludeProps.includes(key)
        ? false
        : item[key] // value
          .toString() // convert to string
          .toLowerCase() // lowercase string
          .includes(searchTerm.toLowerCase().replace(/\s+/g, ''));
    });
  }

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const handleSubmit = (evt) => {
    // here is where the magic happens
    evt.preventDefault();
    navigate('/shop', { replace: true });
    let search = items.filter(searchFilter);
    setFilteredItems(search);
    console.log(evt.target.value)
  };

  return (
    <form 
    className={styles.searchForm}
    onSubmit={handleSubmit}>
      <input
        className={styles.input}
        onChange={handleChange}
        type="text"
        placeholder="Search for anything"
        value={searchTerm}
      ></input>
      <button
        className={styles.searchBtn}
        type="submit"
      >
        <img 
        className={styles.searchIcon}
        src={searchIcon} 
        alt="search" />
      </button>
    </form>
  );
}

