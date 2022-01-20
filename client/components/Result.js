import React from 'react';
import useStore from '../store';

function Result() {
  const searchResult = useStore((state) => state.searchResult);
  const setList = useStore((state) => state.setList);
  const list = useStore((state) => state.list);

  function addMediaToDb(imdbID) {
    fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=9ac2fb0d`)
      .then((res) => res.json())
      .then((data) => {
        const body = {
          imdbid: data.imdbID,
          title: data.Title,
          year: data.Year,
          rated: data.Rated,
          released: data.Released,
          runtime: data.Runtime,
          genre: data.Genre,
          plot: data.Plot,
          poster: data.Poster,
        };
        fetch('http://localhost:3000/api/list', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
          .then((dbres) => dbres.json())
          .then((dbdata) => {
            setList(dbdata);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className='container'>
      {searchResult.map(({ Title, Year, imdbID, Poster }) => (
        <div className='card_item'>
          <img className='resultImg' src={Poster} alt='movieposter' />
          <div>{Title}</div>
          <div>{Year}</div>
          <button
            className='add_btn'
            onClick={() => {
              addMediaToDb(imdbID);
            }}
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
}

export default Result;
