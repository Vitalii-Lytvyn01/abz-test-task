import React from "react";
import './Header.scss';
import Button from "../Button/Button";

function clickFunction() {
  
}

export default class Header extends React.Component {
  render() {
    return(
      <header className="header">
        <div className="header__logo"></div>
        <nav className="header__nav">
          <Button onClickF={clickFunction}>Users</Button>
          <Button onClickF={clickFunction}>Sign up</Button>
        </nav>
      </header>
    )
  }
}