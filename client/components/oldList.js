import React, { useEffect, useState } from 'react';
import Card from '../components/Card.js';
import useStore from '../store.js';
import list from '../components/styles/list.css';
// import AddMedia from "./AddMedia"

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
      .then(res => res.json())
      .then(data => {
        setList(data)
      })
      .catch(err => {
        console.log('error: ', err);
      })
  }, []);

  // const components = allMedia.map(obj => {
  //   // line 8: every card requires a unique key, which can be assigned to the media_id since those keys are always unique
  //   return (
  //     <div key={obj.media_id}>
  //       <Card media_id={obj.media_id} title={obj.title} category={obj.category} duration={obj.duration} priority={obj.priority} url={obj.url} user_id={obj.user_id}/>
  //     </div>
  //   );
  // });

  return (
   
   <div className='container'>
      <div>{list.map(obj =>
        <div key={obj.imdbid} className='box is-flex is-flex-direction-row is-justify-content-space-around is-align-items-center'>
          <div>
            <img src={obj.poster}></img>
          </div>

          {/* <div className='textContainer'> */}
          <ul>{obj.title}</ul>
          <ul>{obj.year}</ul>
          {/* </div> */}
        </div>
      )}
      </div>
    </div>

    
  );
}

export default List;
