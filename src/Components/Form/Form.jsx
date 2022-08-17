import React from "react";
import './Form.scss';
import Button from "../Button/Button";
import { getPositions, getToken, postUser } from "../../API/Users";
import classNames from "classnames";

export default class Form extends React.Component {

  constructor(props) {
    super(props);

    this.fileInputRef = React.createRef();
  }

  state = {
    positionsList: [],
    name: '',
    email: '',
    phone: '',
    positionId: '',
    photo: {
      file: '',
    },
    regSuccess: false,
    error: '',
  }

  onSubmit() {
    const {name, phone, email, positionId, photo} = this.state;
    const formData = new FormData();
    const emailRegex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);

    switch(false) {
      case /\+380(\d{9})/g.test(phone):
        this.setState({error: 'phone'});
        return;
      case name.length<60||name>2:
        this.setState({error: 'name'});
        return;
      case emailRegex.test(email):
        this.setState({error: 'email'});
        return;
      default: 
        this.setState({error: ''});
    }

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('position_id', positionId);
    formData.append('photo', photo.file);
  
    const response = getToken();
    response.then(
      data => {return data.json()}
    ).then(
      dataJSON => {
        console.log(dataJSON.token);
        const postResponse = postUser(dataJSON.token, formData);
        postResponse.then(
          data => {
            return data.json();
          }
        ).then(
          dataJSON => {
            this.setState({regSuccess: true});
            this.props.updateList();
          }
        ).catch(alert);
      }
    ).catch(alert);
  }

  downloadPositions() {
    const response = getPositions();
    response.then(
      data => {
        return data.json();
      }
    ).then(
      dataJSON => {
        this.setState({positionsList: dataJSON.positions})
      }
    ).catch(alert);
  }

  fileUpload(e) {
    if (e.target.files[0].size/	1000000 > 5) {
      alert('Image size must not exceed 5mb.');
      return;
    }

    let img = new Image()
    img.src = window.URL.createObjectURL(e.target.files[0])
    img.onload = () => {
      if (img.width < 70 || img.height < 70) {
        alert('Image resolution must be at least 70x70 px.');
      } else {
        this.setState({photo: {file: e.target.files[0]}});
      }
    }
  }

  componentWillMount() {
    this.downloadPositions();
  }

  isFormValid() {
    const {name, phone, email, positionId, photo} = this.state;

    return !!name && !!phone && !!email && !!positionId && !!photo.file;
  }

  render() {
    return(
      <div className="form">
        {
          this.state.regSuccess
          ? <>
              <div className="form__heading">
                User successfully registered
              </div>
              <div className="success-image"></div>
            </>
          :<>
          <form 
            action=""
            className="registration-form"
            onSubmit={() => this.onSubmit()}
          >
              <div className="form__heading">
                Working with POST request
              </div>
            <div className="input-container">
              <input
                className={classNames("name-input text-input", {'input-error': this.state.error === "name"})}
                type="text"
                placeholder="Your name"
                value={this.state.name}
                onChange={(e) => this.setState({name: e.target.value})}
                required
              />
            </div>
            <div className="input-container">
              <input
                className={classNames("email-input text-input", {'input-error': this.state.error === "email"})}
                type="text"
                placeholder="Email"
                value={this.state.email}
                onChange={(e) => this.setState({email: e.target.value})}
                required
              />
            </div>
            <div className="input-container last-container">
              <input
                className={classNames("phone-input text-input", {'input-error': this.state.error === "phone"})}
                type="text"
                placeholder="Phone"
                value={this.state.phone}
                onChange={(e) => this.setState({phone: e.target.value})}
                required
              />
              <div className="helper-text">+38 (XXX) XXX - XX - XX</div>
            </div>
            <div
              className="radio-container"
              onChange={(e) => this.setState({positionId: e.target.value})}
            >
              <div className="radio__header">Select your position</div>
              {
                this.state.positionsList.map((item) => {
                  return <label className="container">{item.name}
                            <input type="radio" name="position" value={item.id}></input>
                            <span className="checkmark"></span>
                          </label>
                })
              }
            </div>
            <div className="file-container">
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="file-input"
                ref={this.fileInputRef}
                onChange={(e) => this.fileUpload(e)}
              />
              <div
                className="file-button"
                onClick={() => {this.fileInputRef.current.click()}}
              >
                Upload
              </div>
              <div className="file-name">
                {
                  !!this.state.photo.file
                  ? this.state.photo.file.name
                  : "Upload your photo"
                }
              </div>
            </div>
            <Button type={this.isFormValid() ? '' : 'disabled'} onClickF={this.onSubmit.bind(this)}>Sign up</Button>
          </form>
        </>
        }
      </div>
    )
  }
}