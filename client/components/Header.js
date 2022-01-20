import React from 'react';
import HypeHeader1 from './images/HypeHeader1.png';

function Header() {
  return (
    <div className='header-div'>
      <img className='headerImg' src={HypeHeader1} alt='headerlogo' />
    </div>
  );
}

export default Header;
