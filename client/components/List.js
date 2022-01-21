import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import useStore from '../store.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RiMovie2Line, RiMovie2Fill } from 'react-icons/ri';
import { BsCameraReelsFill, BsCameraReels } from 'react-icons/bs';
import { IoIosCheckmarkCircleOutline, IoIosCheckmarkCircle } from 'react-icons/io';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';


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
  const setWatchedList = useStore(state => state.setWatchedList)

  const handleDelete = (obj) => {
    fetch(`http://localhost:3000/api/list/delete/${obj.imdbid}`, {
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

  const handleSwitch = (obj) => {
    const body = {
      imdbid: obj.imdbid,
      title: obj.title,
      year: obj.year,
      rated: obj.rated,
      released: obj.released,
      runtime: obj.runtime,
      genre: obj.genre,
      plot: obj.plot,
      poster: obj.poster,
    };
    console.log(body)
    //delete from medialist
    fetch(`http://localhost:3000/api/list/delete/${obj.imdbid}`, {
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
    //add to watched
    fetch('http://localhost:3000/api/watched', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((dbres) => dbres.json())
      .then((dbdata) => {
        setWatchedList(dbdata);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            <div class="column is-flex is-justify-content-space-around is-one-quarter is-centered ml-3">
              <img class='listImg' src={obj.poster} alt='list_img' />
            </div>
            <div class="column is-auto is-centered">
              <div class="column is-one-quarter is-flex is-centered is-pulled-right">
                <div onClick={() => { handleSwitch(obj) }}><IoIosCheckmarkCircleOutline /></div>
                <div onClick={() => { handleDelete(obj) }}><AiFillDelete /></div>
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
