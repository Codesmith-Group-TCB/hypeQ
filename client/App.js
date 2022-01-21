import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Result from './components/Result.js';
import SearchBar from './components/SearchBar.js';
import List from './components/List';
import Watched from './components/Watched'
import './index.scss'


function App() {
  return (
    <div>
      <Header />
      <div className='SearchContainer'>
        <SearchBar />
      </div>

      <article class="columns mt-3 mx-2">
        <section class="column is-narrow">
          <p class="title is-5">Watched</p>
          <Watched/>
        </section>
        <section class="column is-centered">
          <Result />
        </section>
        <section class="column is-narrow">
        <p class="title is-5">To-Watch List</p>
          <List />
        </section>
      </article>

    </div>

  );
}

export default App;
