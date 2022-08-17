import React from "react";
import './MainPage.scss';
import Header from "../Header/Header";
import Form from "../Form/Form";
import Button from "../Button/Button";
import { getUsers } from "../../API/Users";

export default class MainPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      usersList: [],
      nextPage: false,
      currentPage: 1,
    }

    this.usersRef = React.createRef();
    this.signInRef = React.createRef();
  }

  scrollToUsers() {
    this.usersRef.current.scrollIntoView();
  }

  scrollToSignIn() {
    this.signInRef.current.scrollIntoView();
  }

  downloadUsers(page = 1) {
    let response = getUsers(page);
    response.then(
      data => {
        return data.json();
      }
    ).then(
      dataJSON => {
        const nextPage = !!(dataJSON.page < dataJSON.total_pages);
        this.setState(oldState => ({
          usersList: [...oldState.usersList, ...dataJSON.users],
          currentPage: page,
          nextPage,
        }));
      }
    )
  }

  showMore() {
    let currentPage = this.state.currentPage;
    this.downloadUsers(++currentPage);
  }

  componentWillMount() {
    this.downloadUsers();
  }

  updateList() {
    this.setState({usersList: []});
    this.downloadUsers();
  }

  render() {
    return(
      <div className="main-page">
        <div className="flex-container">
          <Header
            scrollToUsers={this.scrollToUsers.bind(this)}
            scrollToSignIn={this.scrollToSignIn.bind(this)}
          />
          <div className="main-page__intro">
            <div className="intro__background">
              <h1>Test assignment for front-end developer</h1>
              <p>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</p>
              <Button onClickF={this.scrollToSignIn.bind(this)}>Sign up</Button>
            </div>
          </div>
          <div className="main-page__list">
            <div ref={this.usersRef} className="list__heading">
              Working with GET request
            </div>
            <div className="list__grid">
              {
                this.state.usersList.map((item) => {
                  return(
                    <div className="grid-item">
                    <div
                      className="grid-item__image"
                      style={{backgroundImage: `url(${item.photo})`}}
                    ></div>
                    <p className="grid-item__name long">{item.name}</p>
                    <p className="grid-item__position">{item.position}</p>
                    <p className="grid-item__email">{item.email}</p>
                    <p className="grid-item__phone">{item.phone.replace(/(\+\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/g, '$1 ($2) $3 $4 $5')}</p>
                  </div>
                  )
                })
              }
            </div>
            <Button type={this.state.nextPage ? '' : 'disabled'} onClickF={() => {this.showMore()}}>Show more</Button>
          </div>
          <div ref={this.signInRef} className="main-page__form">
            <Form updateList={this.updateList.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}