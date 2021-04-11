import React from 'react'

function SearchBar({ handleInput, search }) {
  return (
    <section className='searchbar-wrap'>
    <input type='text' 
    placeholder="Select a movie...." 
    className="searchbox" 
    onChange={handleInput}
    onKeyPress={search}
    />
    </section>
  )
}

export default SearchBar;
