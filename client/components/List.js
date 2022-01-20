import React, { useEffect, useCallback } from 'react';
import useStore from '../store.js';
import list from '../components/styles/list.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// helper function
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function MediaItem({ obj, index }) {
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
          <div>{obj.title}</div>
          <div>{obj.year}</div>
          <button>Delete</button>
        </div>
      )}
    </Draggable>
  );
}

// equivalent to what is being rendered in our return for ListItems
const MediaList = React.memo(function MediaList({ list }) {
  return list.map((obj, index) => (
    // <div className='eachItem'>
    <MediaItem obj={obj} index={index} key={obj.imdbid} />
    // </div>
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
