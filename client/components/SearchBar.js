import React, { useState } from 'react';
import useStore from '../store';

function SearchBar() {
  const searchInput = useStore((state) => state.searchInput);
  const searchResult = useStore((state) => state.searchResult);
  const setSearchInput = useStore((state) => state.setSearchInput);
  const setSearchResult = useStore((state) => state.setSearchResult);

  function getFromAPI(search) {
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=9ac2fb0d`)
      .then((res) => res.json())
      .then((data) => data.Search)
      .then((result) => {
        console.log(result);
        setSearchResult(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAnswerChange = (event) => {
    if (event.key === 'Enter') {
      getFromAPI(searchInput);
    }
  };

  return (
    <div className='container'>
      <input
        type='text'
        className='input mt-5 is-primary is-small'
        placeholder='Enter title...'
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={(event) => handleAnswerChange(event)}
      />
    </div>
  );
}

export default SearchBar;
