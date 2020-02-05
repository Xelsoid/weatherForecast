import React from 'react';
import './index.css';

export default ({customClassName, callback, type, text}) => {
  return (
   <button
     className={`btn ${customClassName}`}
     type={type}
     onClick={callback}
   >
     {text}
   </button>
  )
};



