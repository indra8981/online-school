import React,{ Component, useState,useEffect} from 'react';
import axios from 'axios';
import {Cookies} from 'react-cookie';


export default class CreateClassRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectName : ''
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  myChangeHandler(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const cookies = new Cookies();
    axios.post("/classrooms/create-classroom", this.state)
    .then(res => {
      console.log(res.data);
      this.props.history.push('/dashboard');
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <p>Subject name:</p>
      <input
        type='text'
        name='subjectName'
        onChange={this.myChangeHandler}
      />
      <p></p>
      <input type="submit" value="Submit" />
      </form>

      </div>
    )
  }
  
}
