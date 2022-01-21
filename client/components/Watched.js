import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import useStore from '../store.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RiMovie2Line, RiMovie2Fill } from 'react-icons/ri';
import { IoIosCheckmarkCircleOutline, IoIosCheckmarkCircle } from 'react-icons/io';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';

const fillColorArray = [
  '#f17a45',
  '#f17a45',
  '#f19745',
  '#f19745',
  '#f1a545',
  '#f1a545',
  '#f1b345',
  '#f1b345',
  '#f1d045',
  '#f1d045',
];

// helper function
const reorder = (watched, startIndex, endIndex) => {
  const result = Array.from(watched);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function WatchedItem({ obj, index }) {
  const [rating, setRating] = useState(obj.rank);
  const setWatchedList = useStore((state) => state.setWatchedList);

  const handleDelete = (imdbid) => {
    fetch(`http://localhost:3000/api/watched/delete/${imdbid}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((dbres) => dbres.json())
      .then((dbdata) => {
        setWatchedList(dbdata);
      })
      .catch((err) => console.log(err));
  };

  const handleRating = (rate, obj) => {
    const body = {
      rank: rate,
      imdbid: obj.imdbid
    }
    fetch(`http://localhost:3000/api/watched/rank`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => setRating(data))
      .catch(err => console.log(err))
  };


  return (
    <Draggable draggableId={obj.imdbid} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='eachItem'
        >
          <div class="columns is-vcentered is-3">
            <div class="column is-narrow is-flex is-justify-content-space-around is-one-quarter is-centered ml-3">
              <img class='listImg' src={obj.poster} alt='list_img' />
            </div>
            <div class="column is-auto is-centered">
              <div class="column is-one-half is-flex is-centered is-pulled-right">
                <Rating class="is-center-pulled-left"
                  onClick={(e) => handleRating(e, obj)}
                  ratingValue={rating}
                  fillColorArray={fillColorArray}
                  emptyIcon={<RiMovie2Line size={18} color='black' />}
                  fullIcon={<RiMovie2Fill size={18} />}
                />
                <div onClick={() => { handleDelete(obj.imdbid) }}> <AiFillDelete /></div>
              </div>
              <div class="column is-auto is-centered">
                <p class="has-text-weight-semibold">{obj.title}</p>
                <p>{obj.year}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

// equivalent to what is being rendered in our return for ListItems
const WatchedList = React.memo(function WatchedList({ watched }) {
  return watched.map((obj, index) => (
    <WatchedItem obj={obj} index={index} key={obj.imdbid} />
  ));
});

function Watched() {
  const watched = useStore((state) => state.watched);
  const setWatchedList = useStore((state) => state.setWatchedList);

  useEffect(() => {
    fetch('http://localhost:3000/api/watched', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWatchedList(data);

      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }, []);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newWatched = reorder(
      watched,
      result.source.index,
      result.destination.index
    );

    setWatchedList(newWatched);
  }

  // useEffect for GET api

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='watched'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <WatchedList watched={watched} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Watched;
