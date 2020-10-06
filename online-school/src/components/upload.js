import React,{ Component, useState,useEffect} from 'react';
import axios from 'axios';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formdt:new FormData()
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  myChangeHandler(event) {
    const target = event.target;
    const value = target.files[0];
    const name = target.name;
    let prev=this.state.formdt;
    prev.append(`${name}`,value);
    this.setState({
      [name]: prev
    });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    fetch("http://localhost:8080/assignment/", {
      method: 'POST',
      body: this.state.assignmentImage
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <p>Select a file</p>
      <input
        type='file'
        name='assignmentImage'
        onChange={this.myChangeHandler}
      />
      <input type="submit" value="Submit" />
      </form>

      </div>
    )
  }
}
