import React, {useState, useEffect} from 'react';
import './Button.scss';

export default function Button(props) {
  return <div
      className="button"
      onClick={() => {
        props.onClickF();
      }}
    >
    {props.children}
   </div>
}