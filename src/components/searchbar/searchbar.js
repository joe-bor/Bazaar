import { useState } from "react";

export default function SearchBar({
  products,
  filteredItems, // used for debugging
  setfilteredItems
}) {
  const [searchTerm, setSearchTerm] = useState("");

  // properties to not include in search result
  const excludeProps = ["imageUrl", "publicId", "price", "reviews"];

  function searchResults(product) {
    return Object.keys(product).some((key) => {
      return excludeProps.includes(key)
        ? false
        : product[key] // value
            .toString() // convert to string
            .toLowerCase() // lowercase string
            .includes(searchTerm.toLowerCase());
    });

    // where would I place link to to shop page?
  }

  const handleChange = (evt) => {
    setSearchTerm(evt.target.value);
  };

  const handleSubmit = (evt) => {
    // here is where the magic happens
    evt.preventDefault();
    //setfilteredItems(search(products, searchTerm));
    let search = products.filter(searchResults);
    setfilteredItems(search);
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