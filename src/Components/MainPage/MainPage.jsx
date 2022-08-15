import React from "react";
import './MainPage.scss';
import Header from "../Header/Header";
import Button from "../Button/Button";

export default class MainPage extends React.Component {
  render() {
    return(
      <div className="main-page">
        <div className="flex-container">
          <Header/>
          <div className="main-page__intro">
            <h1>Test assignment for front-end developer</h1>
            <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
            <Button onClickF={() => {window.open('https://abz.agency', "_blank", 'noopener,noreferrer');}}>Sign up</Button>
          </div>
        </div>
      </div>
    );
  }
}