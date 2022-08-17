import React from "react";
import './Header.scss';
import Button from "../Button/Button";

export default class Header extends React.Component {
  render() {
    return(
      <header className="header">
        <div className="header__logo"></div>
        <nav className="header__nav">
          <Button onClickF={this.props.scrollToUsers}>Users</Button>
          <Button onClickF={this.props.scrollToSignIn}>Sign up</Button>
        </nav>
      </header>
    )
  }
}