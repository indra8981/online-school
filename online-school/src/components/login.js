import React, { Component } from 'react';
import axios from 'axios';


export default class LogIn extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: ''
    }
  }

  onChangeEmail(e) {
    this.setState({
      email : e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password : e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const user = {
      email : this.state.email,
      password : this.state.password
    }

    console.log(user);
    axios.post('http://localhost:8080/users/loginbyemail', user)
      .then(response => {
        console.log(response);
        if(response.data.passwordMatch)
          window.location = '/dashboard';
        else
          alert('Please enter correct email and password');
      });

  }

  render() {
    return (
      <div>
        <h3>Login here</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Email: </label>
          <input  type="text"
            required
            className="form-control"
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
        </div>
        <div className="form-group"> 
          <label>Password: </label>
          <input  type="text"
            required
            className="form-control"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
      </div>
    )
  }
}