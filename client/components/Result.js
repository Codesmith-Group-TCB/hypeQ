import React from 'react';
import useStore from '../store';

function Result() {
  const searchResult = useStore((state) => state.searchResult);
  const setList = useStore((state) => state.setList);
  const list = useStore((state) => state.list);

  function addMediaToDb(imdbID) {
    fetch(`http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=9ac2fb0d`)
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
    <div className='resultWrapper'>
      {searchResult.map(({ Title, Year, imdbID, Poster }) => (
        <div className='eachItem' class="column" key={imdbID}>
          <div class="box is-flex is-flex-direction-column is-justify-content-center has-text-centered">
          <div class="card-image has-text-centered">
          {/* <figure class="image is-64x64 is-inline-block"> */}
          <img className='resultImg' src={Poster} alt='movieposter' />
          {/* </figure> */}
          </div>
          <p class="has-text-weight-semibold">{Title}</p>
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
        </div>
      ))}
    </div>
  );
}

export default Result;
