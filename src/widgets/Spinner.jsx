import React from 'react';
import spinner from '../assets/spinner5.gif';

const Spinner = ({ w }) => {
  return (
    <div className="w-full">
      <img 
        src={spinner}
        alt="Loading..."
        style={{ width: `${w}px`, margin: '0px auto', display: 'block' }}
      />
    </div>
  );
}

export default Spinner
