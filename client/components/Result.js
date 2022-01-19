import React from 'react';
import Card from './Card.js';
import useStore from '../store';

function Result() {
  const searchResult = useStore((state) => state.searchResult);

  function addMediaToDb(props) {
    fetch('http://localhost:3000/api/list', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    })
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

  return (
    <div>
      <div className='list-cont'>
        {searchResult.map(({ Title, Year, imdbID, Poster }) => (
          <div className='card_item'>
            <img src={Poster} alt='movieposter' />
            <div>{Title}</div>
            <div>{Year}</div>
            <button className='add_btn' onClick={() => {addMediaToDb({})}}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Result;
