import { useState } from "react";

export default function SearchBar({
  products,
  filteredItems, // used for debugging
  setfilteredItems
}) {
  const [searchTerm, setSearchTerm] = useState("");

  function searchResults(product) {
    return Object.values(product)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
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