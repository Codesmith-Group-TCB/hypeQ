import React, { useEffect, useState } from 'react';
import useStore from '../store.js';
import list from '../components/styles/list.css';

function List() {
  const list = useStore((state) => state.list);
  const setList = useStore((state) => state.setList);

  // useEffect for GET api
  useEffect(() => {
    fetch('http://localhost:3000/api/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }, []);
  return (
    <div className='container'>
      <div>
        {list.map((obj) => (
          <div
            key={obj.imdbid}
            className='box is-flex is-flex-direction-row is-justify-content-space-around is-align-items-center'
          >
            <div>
              <img src={obj.poster}></img>
            </div>
            <ul>{obj.title}</ul>
            <ul>{obj.year}</ul>
            <button>up</button>
            <button>down</button>
            <button>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
