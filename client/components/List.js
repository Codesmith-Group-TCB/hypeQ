import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import useStore from '../store.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RiMovie2Line, RiMovie2Fill } from 'react-icons/ri';
import { BsCameraReelsFill, BsCameraReels } from 'react-icons/bs';
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
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function MediaItem({ obj, index }) {
  const [rating, setRating] = useState(0);
  const setList = useStore((state) => state.setList);

  const handleRating = (rate) => {
    // console.log(rate);
    setRating(rate);
  };

  const handleDelete = (imdbid) => {
    fetch(`http://localhost:3000/api/list/delete/${imdbid}`, {
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
          {/* <Rating
            onClick={handleRating}
            ratingValue={rating}
            fillColorArray={fillColorArray}
            emptyIcon={<RiMovie2Line size={18} color='black' />}
            fullIcon={<RiMovie2Fill size={18} />}
          /> */}
          <p>{obj.title}</p>
          <p>{obj.year}</p>
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
const MediaList = React.memo(function MediaList({ list }) {
  return list.map((obj, index) => (
    <MediaItem obj={obj} index={index} key={obj.imdbid} />
  ));
});

function List() {
  const list = useStore((state) => state.list);
  const setList = useStore((state) => state.setList);

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

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newList = reorder(
      list,
      result.source.index,
      result.destination.index
    );

    setList(newList);
  }

  // useEffect for GET api

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='list'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <MediaList list={list} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;
