import React from 'react';
import './Button.scss';
import classNames from 'classnames';

export default function Button(props) {
  return <div
      className={classNames('button yellow',{disabled: props.type === 'disabled'})}
      onClick={() => {
        props.onClickF();
      }}
    >
    {props.children}
   </div>
}