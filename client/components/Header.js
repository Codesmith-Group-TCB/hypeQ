import React from 'react';
import HypeHeader from './images/HypeHeader.png';

function Header() {
  return (
    <div className='header-div'>
      <img src={HypeHeader} alt='headerlogo' />
    </div>
  );
}

export default Header;
