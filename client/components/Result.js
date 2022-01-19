import React from 'react';
import Card from './Card.js';
import useStore from '../store';

function Result() {
  const searchResult = useStore((state) => state.searchResult);

  return (
    <div>
      <div className='list-cont'>
        {searchResult.map(({ Title, Year, imdbID, Poster }) => (
          <div className='card_item'>
            <img src={Poster} alt='movieposter' />
            <div>{Title}</div>
            <div>{Year}</div>
            <div>{imdbID}</div>
            <button className='add_btn'>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Result;
