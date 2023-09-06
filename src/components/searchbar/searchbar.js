import { useState } from 'react';

export default function SearchBar({onSearch}){
const [searchTerm,setSearchTerm] = useState('')

function handleChange(evt){
    setSearchTerm(evt.target.value)
}

function handleSubmit(evt){
    evt.preventDefault();
    onSearch(searchTerm)
     setSearchTerm('')
}

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Search for anything'value={searchTerm}
                onChange={handleChange}></input>
                <button type="submit">Search</button>
            </form>
        </div>
    )
    
}