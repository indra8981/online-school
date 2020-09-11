import React,{ Component, useState,useEffect} from 'react';
import axios from 'axios';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      password : '',
      userType : 1,
      name : '',
      phone : '',
      school : '',
      roll : ''
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
    console.log(this.state);
    axios.post("http://localhost:8080/users/add", this.state)
    .then(res => {
      console.log(res.data);
      this.props.history.push('/login');
    })
    .catch(err => console.log(err));
  }
  
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      <p>Enter your email:</p>
      <input
        type='email'
        name='email'
        onChange={this.myChangeHandler}
      />
      <p>Enter your password:</p>
      <input
        type='text'
        name='password'
        onChange={this.myChangeHandler}
      />
      <p>Select Teacher or Student:</p>
      <select name="userType" onChange={this.myChangeHandler}>
        <option value={1}>Teacher</option>
        <option value={2}>Student</option>
      </select>
      <p>Enter your name:</p>
      <input
        type='text'
        name='name'
        onChange={this.myChangeHandler}
      />
      <p>Enter your phone:</p>
      <input
        type='number'
        name='phone'
        onChange={this.myChangeHandler}
      />
      <p>Enter your School:</p>
      <input
        type='text'
        name='school'
        onChange={this.myChangeHandler}
      />
      {
        this.state.userType == 2 && (
          <div>
          <p>Enter your roll:</p>
          <input
            type='number'
            name='roll'
            onChange={this.myChangeHandler}
          />
          </div>
        )
      }
      <p></p>
      <input type="submit" value="Submit" />
      </form>

      </div>
    )
  }
}
