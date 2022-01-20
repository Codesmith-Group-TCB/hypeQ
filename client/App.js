import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Result from './components/Result.js';
import SearchBar from './components/SearchBar.js';
import List from './components/List';
import MainPageCenter from './components/MainPageCenter';
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
          <h1>Watched</h1>
        </section>
        <section class="column">
          <h1>Welcome!</h1>
          <Result />
        </section>
        <section class="column is-narrow">
          <h1>List</h1>
          <List />
        </section>
      </article>

    </div>

  );
}

export default App;
