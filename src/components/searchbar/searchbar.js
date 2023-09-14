import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function SearchBar({
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Search for anything"
          value={searchTerm}
        ></input>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

