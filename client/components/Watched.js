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
  const [rating, setRating] = useState(0);
  const setList = useStore((state) => state.setList);
  const setWatchedList = useStore((state) => state.setWatchedList);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSwitchToWatched = (imdbid) => {
    // add to WatchedList
    const addToWatchedList = fetch('http://localhost:3000/api/watchedlist', {
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
    
    // remove from MediaList
    const removedFromList = fetch(`http://localhost:3000/___${imdbid}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((dbres) => dbres.json())
      .then((dbdata) => {
        setList(dbdata);
      })
      .catch((err) => console.log(err));

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
          <img className='listImg' src={obj.poster} alt='list_img' />
          <Rating
            onClick={handleRating}
            ratingValue={rating}
            fillColorArray={fillColorArray}
            emptyIcon={<RiMovie2Line size={18} color='black' />}
            fullIcon={<RiMovie2Fill size={18} />}
          />
          <p>{obj.title}</p>
          <p>{obj.year}</p>
          <button
            onClick={() => {
              handleSwitchToWatched(obj.imdbid);
            }}
          >
            < IoIosCheckmarkCircleOutline/>
          </button>
          <button
            onClick={() => {
              handleDelete(obj.imdbid);
            }}
          >
            <AiFillDelete />
          </button>
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
  const setList = useStore((state) => state.setList);
  const setWatchedList = useStore((state) => state.setWatchedList);

  useEffect(() => {
    fetch('http://localhost:3000/api/watchedlist', {
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

    const newList = reorder(
      watched,
      result.source.index,
      result.destination.index
    );

    setList(newList);
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
