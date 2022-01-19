import React, { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Result from './components/Result.js';
import SearchBar from './components/SearchBar.js';
import List from './components/List';

function App() {
  return (
    <div className='container'>
      <Header />
      <div className='SearchContainer'>
        <SearchBar />
      </div>
      <div className='MainContainer'>
        <Result />
        <List />
      </div>
    </div>
  );
}

export default App;
